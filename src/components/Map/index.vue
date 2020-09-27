<template>
  <v-container class="container">
    <v-row
      class="text-center"
      v-for="line in lines"
      :key="line.index"
      justify="center"
    >
      <v-col class="tile" v-for="tile in line.tiles" :key="tile.index">
        <world-tile :tile="tile" :line="line" :selectTile="selectTile" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Tile, Line, Nation } from "@/interfaces/Map";
import {
  setRelativeTiles,
  setMigrationResult,
  resetLines
} from "@/components/Map/helpers/migration";
import setLines from "./helpers/setLines";
import MapTile from "./components/Tile/index.vue";

export default Vue.extend({
  name: "Home",
  components: {
    "world-tile": MapTile
  },
  data: () => ({
    lines: setLines()
  }),
  computed: {
    activeTile(): Tile {
      return this.$store.getters.activeTile;
    }
  },
  methods: {
    handleSelectedTileReset(e: MouseEvent) {
      e.preventDefault();
      this.resetLines(this.activeTile);
      document.removeEventListener("contextmenu", this.handleSelectedTileReset);
    },
    resetLines(tile: Tile) {
      this.lines = resetLines(this.lines);
      this.$store.dispatch("resetActiveTile", tile);
    },
    selectTile(tile: Tile, line: Line) {
      if (!this.activeTile || !tile.relative) {
        this.lines = setRelativeTiles(this.lines, tile);
        this.$store.dispatch("saveActiveTile", tile);
        document.addEventListener("contextmenu", this.handleSelectedTileReset);
      } else {
        setMigrationResult(this.lines, this.activeTile, tile);
        this.resetLines(tile);
      }
    }
  }
});
</script>

<style lang="sass" scoped>
.container
  width: 1300px
.tile
  max-width: 100px
  height: 85px
  margin: 2px
  padding: 0
</style>
