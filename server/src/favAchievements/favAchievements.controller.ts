import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavAchievementsService } from './favAchievements.service';
import { FavAchievement } from './favAchievements.interface';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('favAchievements')
export class FavAchievementsController {
  constructor(
    private readonly favAchievementsService: FavAchievementsService,
  ) {}

  // @Get()
  // getAllFavAchievements(): Promise<FavAchievement[]> {
  //   return this.favAchievementsService.findAll();
  // }
  @UseGuards(JwtAuthGuard)
  @Get()
  getUserFavAchievements(@Req() req: Request): Promise<FavAchievement[]> {
    const id = req.user['id'];
    return this.favAchievementsService.findByUser(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/list')
  getUserFavAchievementLists(@Req() req: Request): Promise<FavAchievement[]> {
    const id = req.user['id'];
    return this.favAchievementsService.findAllUserAchievementGamelist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:appid')
  getUserFavAchievementsByGame(
    @Req() req: Request,
    @Param('appid') appid: number,
  ): Promise<FavAchievement[]> {
    const id = req.user['id'];
    return this.favAchievementsService.findByUserByGame(id, appid);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async toggleFavAchievement(
    @Req() req: Request,
    @Body() data: FavAchievement,
  ): Promise<FavAchievement | { success: boolean } | void> {
    data.user_id = req.user['id'];
    const { user_id, appid, apiname } = data;

    const favourited = await this.favAchievementsService.find(
      user_id,
      appid,
      apiname,
    );
    if (!favourited) {
      return this.favAchievementsService.addFavAchievements(data);
    } else {
      return this.favAchievementsService.removeFavAchievements(
        favourited?.id,
        user_id,
        appid,
      );
    }
    return;
  }
}
