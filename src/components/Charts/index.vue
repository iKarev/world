<template>
  <v-card elevation="4" class="mt20">
    <v-toolbar dark flat color="blue">
      <v-toolbar-title>Графики и анимации</v-toolbar-title>
      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="yellow"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item.component">
            {{ item.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-card-text>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <world-bar-chart />
        </v-tab-item>
        <v-tab-item>
          <world-hexagonal />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import * as moment from "moment";
import * as axios from "axios";
import { Vue } from "vue-property-decorator";
import BarChart from "./components/BarChart/index.vue";
import Hexagonal from "./components/Hexagonal/index.vue";

const BAR_CHART_COMPONENT = "world-bar-chart";
const HEXAGONAL_COMPONENT = "world-hexagonal";

export default Vue.extend({
  components: {
    [BAR_CHART_COMPONENT]: BarChart,
    [HEXAGONAL_COMPONENT]: Hexagonal
  },
  data() {
    return {
      tab: null,
      items: [
        { title: "Вопросы", component: BAR_CHART_COMPONENT },
        { title: "Ответы", component: HEXAGONAL_COMPONENT }
      ],
      BAR_CHART_COMPONENT,
      HEXAGONAL_COMPONENT
    };
  }
});
</script>

<style lang="sass">
.mt20
  margin-top: 20px
</style>
