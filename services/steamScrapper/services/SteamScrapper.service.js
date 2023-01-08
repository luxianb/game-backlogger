const {
  getSchemaForGame,
  fetchSteamGameInfo,
  fetchApplicationIds,
} = require("../utils/apis");
const {
  getGameBackground,
  getGameBoxart,
  getGameCapsuleMedium,
  getGameCapsuleSmall,
  getGameHeader,
  getGameHeroBanner,
  getGameHeroCapsule,
  getGameLogo,
  getGamePortrait,
} = require("../utils/steam");
const db = require("../lib/knex");
const { testUrl } = require("../utils/tools");
const dayjs = require("dayjs");

const Status = () => db("status");
const Games = () => db("games");
const Images = () => db("images");
const Achievements = () => db("achievements");

function getScrapeIdParams(last_appid, last_completed_date, max_results) {
  const params = {};
  if (last_appid) params["last_appid"] = last_appid;
  if (last_completed_date) params["if_modified_since"] = last_completed_date;
  if (max_results) params["max_results"] = max_results;
  return params;
}

class ScrapperService {
  constructor() {
    this.retry = 0;
  }

  async initProcessStatus() {
    await Status().insert({
      type: "game",
      last_appid: null,
      last_completed_date: null,
    });
  }

  async getProcessStatus() {
    return await Status().where({ type: "game" }).first();
  }

  async initScrape() {
    const max_retry = process.env.MAX_RETRY ?? 10;

    try {
      const max_results = process.env.MAX_SCRAPE ?? 10000;
      let processStatus = await this.getProcessStatus();

      if (!processStatus) {
        await this.initProcessStatus();
        processStatus = this.getProcessStatus();
      }
      const { last_appid, last_completed_date } = processStatus;
      const params = getScrapeIdParams(
        last_appid,
        last_completed_date,
        max_results
      );

      const applications = await fetchApplicationIds(params);

      for (const app of applications) {
        await this.scrapeGame(app.appid);
        await Status()
          .where({ type: "game" })
          .update({ last_appid: app.appid });
      }
      if (applications?.length < max_results) {
        await Status()
          .where({ type: "game" })
          .update({ last_completed_date: dayjs.unix() });
        return;
      }
      if (this.retry > 0) this.retry = 0;
      return await this.initScrape();
    } catch (err) {
      console.error(err);

      if (this.retry > max_retry) return;
      this.retry += 1;
      await this.initScrape();
    }
  }

  async scrapeGame(appid) {
    await Promise.all([
      this.fetchGameInfo(appid),
      this.fetchGameAchievements(appid),
      this.fetchImageUrls(appid),
    ]);

    console.log(`App entry added ${appid}`);
  }

  async fetchImageUrls(appid) {
    const entryExists = await Images().where({ appid }).select("id").first();

    const images = {
      header: await testUrl(getGameHeader(appid)),
      logo: await testUrl(getGameLogo(appid)),
      library_hero: await testUrl(getGameHeroBanner(appid)),
      library_600x900: await testUrl(getGameBoxart(appid)),
      page_bg_generated_v6b: await testUrl(getGameBackground(appid)),
      hero_capsule: await testUrl(getGameHeroCapsule(appid)),
      portrait: await testUrl(getGamePortrait(appid)),
      capsule_616x353: await testUrl(getGameCapsuleMedium(appid)),
      capsule_231x87: await testUrl(getGameCapsuleSmall(appid)),
    };
    images.appid = appid;
    if (entryExists) {
      await Images().where({ appid }).update(images);
    } else {
      await Images().insert(images);
    }
  }

  async fetchGameAchievements(appid) {
    const schema = await getSchemaForGame(appid);

    const entryExists = await Achievements()
      .where({ appid })
      .select("id")
      .first();

    if (entryExists) {
      await Achievements().where({ appid }).delete();
    }

    const achievements = schema?.availableGameStats?.achievements?.map(
      (achievement, index) => ({ appid, pos: index, ...achievement })
    );
    if (achievements || achievements?.length) {
      if (achievements.length > 100) {
        for (const achievement of achievements) {
          await Achievements().insert(achievement);
        }
      } else {
        await Achievements().insert(achievements);
      }
    }
  }
  async fetchGameInfo(appid) {
    const info = await fetchSteamGameInfo(appid);

    const entryExists = await Games().where({ appid }).select("id").first();

    const payload = {
      appid,
      name: info?.name,
      required_age: info?.required_age,
      is_free: info?.is_free,
      dlc: JSON.stringify(info?.dlc),
      controller_support: info?.controller_support,
      detailed_description: info?.detailed_description,
      about_the_game: info?.about_the_game,
      short_description: info?.short_description,
      supported_languages: info?.supported_languages,
      reviews: info?.reviews,
      website: info?.website,
      pc_requirements:
        info?.pc_requirements && JSON.stringify(info?.pc_requirements),
      mac_requirements:
        info?.mac_requirements && JSON.stringify(info?.mac_requirements),
      linux_requirements:
        info?.linux_requirements && JSON.stringify(info?.linux_requirements),
      legal_notice: info?.legal_notice,
      developers: JSON.stringify(info?.developers),
      publishers: JSON.stringify(info?.publishers),
      price_overview: JSON.stringify(info?.price_overview),
      packages: JSON.stringify(info?.packages),
      package_groups: JSON.stringify(info?.package_groups),
      platforms: JSON.stringify(info?.platforms),
      categories: JSON.stringify(info?.categories),
      genres: JSON.stringify(info?.genres),
      screenshots: JSON.stringify(info?.screenshots),
      movies: JSON.stringify(info?.movies),
      recommendations: JSON.stringify(info?.recommendations),
      release_date: JSON.stringify(info?.release_date),
      support_info: JSON.stringify(info?.support_info),
      content_descriptors: JSON.stringify(info?.content_descriptors),
    };
    // console.log("🚀  ScrapperService  payload", payload);

    if (entryExists) {
      await Games().where({ appid }).update(payload);
    } else {
      await Games().insert(payload);
    }
  }
}

module.exports = new ScrapperService();
