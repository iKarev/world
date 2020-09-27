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
      <v-container class="home">
        <v-layout row>
          <v-flex xs1>
            <InfoPanel />
          </v-flex>
          <v-flex xs11>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
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
