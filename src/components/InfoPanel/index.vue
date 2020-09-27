<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :permanent="true"
    :src="bg"
    absolute
    dark
  >
    <v-list dense nav class="py-0" v-if="activeTile">
      <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item-avatar>
          <img :src="activeTile.params.nation.img" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{
            activeTile.params.nation.name
          }}</v-list-item-title>
          <v-list-item-subtitle>Subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item v-for="prop in info" :key="prop.name" link>
        <v-list-item-icon>
          <!-- <v-icon>{{ item.icon }}</v-icon> -->
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            >{{ prop.title }}:
            {{ activeTile.params.nation[prop.name] }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import { Tile, Line, Nation } from "@/interfaces/Map";
import {
  setRelativeTiles,
  setMigrationResult,
  resetLines
} from "@/components/Map/helpers/migration";
import getRandomNation from "@/components/Map/helpers/getRandomNation";

export default Vue.extend({
  name: "InfoPanel",
  data: () => ({
    drawer: true,
    color: "primary",
    miniVariant: false,
    expandOnHover: false,
    info: [
      { title: "Население", name: "qty" },
      { title: "Воинственность", name: "bellicosity" }
    ]
  }),
  computed: {
    activeTile() {
      return this.$store.getters.activeTile;
    },
    bg() {
      return "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
    }
  }
});
</script>

<style lang="sass" scoped></style>
