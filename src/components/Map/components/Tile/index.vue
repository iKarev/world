<template>
  <div>
    <div class="hexagon hexagon2">
      <div class="hexagon-in1">
        <div
          class="hexagon-in2"
          v-on:click="selectTile(tile, line)"
          v-bind:style="{ backgroundColor: tile.params.nation.color }"
          :class="{ active: tile.active, relative: tile.relative }"
        ></div>
      </div>
    </div>
    <div class="nation" v-if="tile.params.nation">
      <p class="param">
        <b>{{ tile.params.nation.name }}</b>
      </p>
      <p class="param">Quantity: {{ tile.params.nation.qty }}</p>
      <p class="param">Militancy: {{ tile.params.nation.bellicosity }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Tile, Line } from "@/interfaces/Map";

export default Vue.extend({
  name: "Home",
  props: {
    tile: Object as PropType<Tile>,
    line: Object as PropType<Line>,
    selectTile: Function
  }
});
</script>

<style lang="sass" scoped>
@keyframes shadow
  from
    opacity: .8
  25%
    opacity: .7
  50%
    opacity: .6
  75%
    opacity: .5
  to
    opacity: .4

.nation
  transform: translate3d(-10px, -130px, 0)
  display: block
  pointer-events: none
.param
  margin: 0 0 0 20px
  font-size: 12px
  text-align: left

.hexagon
  overflow: hidden
  visibility: hidden
  -webkit-transform: rotate(120deg)
     -moz-transform: rotate(120deg)
      -ms-transform: rotate(120deg)
       -o-transform: rotate(120deg)
          transform: rotate(120deg)

.hexagon-in1
  overflow: hidden
  width: 100%
  height: 100%
  -webkit-transform: rotate(-60deg)
     -moz-transform: rotate(-60deg)
      -ms-transform: rotate(-60deg)
       -o-transform: rotate(-60deg)
          transform: rotate(-60deg)


.hexagon-in2
  width: 100%
  height: 100%
  background-repeat: no-repeat
  background-position: 50%
  visibility: visible
  -webkit-transform: rotate(-60deg)
     -moz-transform: rotate(-60deg)
      -ms-transform: rotate(-60deg)
       -o-transform: rotate(-60deg)
          transform: rotate(-60deg)
  &.active
    background-color: #f00
    animation: shadow 1s infinite alternate linear
  &.relative
    background-color: #0f0 !important
    cursor: pointer
    animation: shadow 1s infinite alternate linear
    &:hover
      background-color: #f0f !important


.hexagon2
  transition: 1s
  width: 100px
  height: 200px
</style>
