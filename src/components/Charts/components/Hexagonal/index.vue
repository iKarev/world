<template>
  <div>
    <world-hexagonal-chart-svg :tiles="tiles" />
  </div>
</template>

<script>
import * as moment from "moment";
import * as axios from "axios";
import { Vue } from "vue-property-decorator";
import Chart from "./chart.vue";

export default Vue.extend({
  components: {
    "world-hexagonal-chart-svg": Chart
  },
  data() {
    return {
      tiles: [{ index: 0 }]
    };
  },
  methods: {}
});
</script>
