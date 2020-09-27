import forEach from "lodash/forEach";
import filter from "lodash/filter";

import { Tile, Line } from "@/interfaces/Map";

const findRelativeTiles = (allLines: Line[], changedTile: Tile): Tile[] => {
  const lines = filter(
    allLines,
    (line: Line) => Math.abs(line.index - changedTile.lineIndex) < 2
  );
  const relativeTiles: Tile[] = [];

  forEach(lines, ({ tiles }) =>
    forEach(tiles, (tile: Tile) => {
      const lineDiff = tile.lineIndex - changedTile.lineIndex;
      const diff = tile.index - changedTile.index;
      const relation = tile.lineIndex % 2;
      switch (lineDiff) {
        case 0:
          if (Math.abs(diff) === 1) relativeTiles.push(tile);
          break;
        case 1:
        case -1:
          if ((relation > 0 ? diff === 1 : diff === -1) || diff === 0)
            relativeTiles.push(tile);
          break;
      }
    })
  );

  return relativeTiles;
};

export default findRelativeTiles;
