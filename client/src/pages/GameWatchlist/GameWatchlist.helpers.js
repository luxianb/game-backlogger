export function getListFilterFunction(filter) {
  return (game) => {
    if (!filter) return true;

    return game.name.toLowerCase().includes(filter.toLowerCase());
  };
}

export function getListSortingFunction(sorting) {
  switch (sorting) {
    case "most_played":
      return (a, b) => b.playtime_forever - a.playtime_forever;
    case "least_played":
      return (a, b) => a.playtime_forever - b.playtime_forever;
    case "name":
      return (a, b) => {
        const _a = a.sort_as ?? a.name;
        const _b = b.sort_as ?? b.name;
        if (_a.toLowerCase() > _b.toLowerCase()) return 1;
        if (_a.toLowerCase() < _b.toLowerCase()) return -1;
        return 0;
      };
    case "position":
    default:
      return (a, b) => {
        if (a.pos > b.pos) return 1;
        if (a.pos < b.pos) return -1;
        if (a.pos < b.pos) return 0;
      };
  }
}
