import map from "lodash/map";
import forEach from "lodash/forEach";

import { Tile, Line, Nation } from "@/interfaces/Map";
import findRelativeTiles from "./findRelativeTiles";
import { getFallenNation } from "./getRandomNation";

const getNation = (tile: Tile): Nation => tile.params.nation;
const getStength = (nation: Nation): number => nation.bellicosity * nation.qty;
const getBellicosity = (tile: Tile): number => tile.params.nation.bellicosity;

export const resetLines = (lines: Line[]): Line[] =>
  map(lines, line => ({
    ...line,
    tiles: map(line.tiles, (tile: Tile) => ({
      ...tile,
      relative: false,
      active: false
    }))
  }));

export const setRelativeTiles = (
  allLines: Line[],
  changedTile: Tile
): Line[] => {
  const newLines = resetLines(allLines);
  const nationToMigrate = getNation(changedTile);
  forEach(findRelativeTiles(allLines, changedTile), (tile: Tile) => {
    const nation = getNation(tile);
    if (
      nationToMigrate.bellicosity - nation.bellicosity > 1 &&
      nationToMigrate.name !== nation.name
    )
      newLines[tile.lineIndex].tiles[tile.index].relative = true;
  });
  newLines[changedTile.lineIndex].tiles[changedTile.index].active = true;
  return newLines;
};
export const setMigrationResult = (
  allLines: Line[],
  activeTile: Tile,
  changedTile: Tile
) => {
  const newLines = resetLines(allLines);
  const relativeTiles = findRelativeTiles(allLines, changedTile).sort(
    (a, b) => getBellicosity(a) - getBellicosity(b)
  );
  const activeNation = activeTile.params.nation;
  activeNation.qty -= 1;
  if (getStength(activeNation) > getStength(changedTile.params.nation)) {
    let people = changedTile.params.nation.qty;
    changedTile.params.nation = {
      name: activeNation.name,
      bellicosity: Math.ceil(
        (activeNation.bellicosity + changedTile.params.nation.bellicosity) / 2
      ),
      qty: (people = people / 2) + 1,
      color: activeNation.color,
      img: activeNation.img
    };

    forEach(relativeTiles, (tile: Tile) => {
      if (people) {
        const nation = newLines[tile.lineIndex].tiles[tile.index].params.nation;
        nation.qty = nation.qty + Math.floor((people = Math.floor(people / 2)));
      } else return;
    });
  } else if (!activeNation.qty) {
    activeTile.params.nation = getFallenNation();
  }
};
