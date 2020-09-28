<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex align-center">
        <div id="nav">
          <router-link to="/">
            <v-btn text>HOME</v-btn>
          </router-link>
          <router-link to="/about">
            <v-btn text>ABOUT</v-btn>
          </router-link>
          <router-link to="/charts">
            <v-btn text>CHARTS</v-btn>
          </router-link>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-layout row class="home">
        <v-flex xs2>
          <InfoPanel />
        </v-flex>
        <v-flex xs10>
          <v-container>
            <router-view />
          </v-container>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import InfoPanel from "@/components/InfoPanel/index.vue";

export default Vue.extend({
  name: "App",
  components: {
    InfoPanel
  }
});
</script>

<style lang="sass" scoped>
.home
  height: 100%
</style>
