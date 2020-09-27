import { Line, Tile } from "@/interfaces/Map";
import getRandomNation from "./getRandomNation";

const setLines = (): Line[] =>
  new Array(9).fill({}).map(
    (arr: Line[], lineIndex: number): Line => ({
      index: lineIndex,
      tiles: new Array(lineIndex % 2 ? 11 : 10).fill({}).map(
        (arr: Tile[], tileIndex: number): Tile => ({
          index: tileIndex,
          active: false,
          relative: false,
          lineIndex,
          params: {
            nation: getRandomNation()
          }
        })
      )
    })
  );

export default setLines;
