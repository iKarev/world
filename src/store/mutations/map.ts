import { State } from "@/interfaces/State";
import { Tile } from "@/interfaces/Map";

export default {
  setActiveTile(state: State, tile: Tile) {
    state.activeTile = tile;
  },
  resetActiveTile(state: State) {
    state.activeTile = undefined;
  }
};
