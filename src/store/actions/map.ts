import { Tile } from "@/interfaces/Map";

export default {
  saveActiveTile({ commit }: any, tile: Tile) {
    localStorage.setItem("activeTile", JSON.stringify(tile));
    commit("setActiveTile", tile);
  },
  resetActiveTile({ commit }: any, tile: Tile) {
    localStorage.removeItem("activeTile");
    commit("resetActiveTile");
  }
};
