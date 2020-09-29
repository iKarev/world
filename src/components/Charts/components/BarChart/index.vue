<template>
  <div>
    <v-layout>
      <v-flex xs4>
        <form action="#" @submit.prevent="getIssues">
          <v-text-field
            label="owner/repo Name"
            v-model="repository"
          ></v-text-field>
        </form>
      </v-flex>
    </v-layout>
    <div class="alert alert-danger" v-show="errored">An error occured</div>
    <world-bar-chart-svg :issues="issues" />
  </div>
</template>

<script>
import * as moment from "moment";
import * as axios from "axios";
import { Vue } from "vue-property-decorator";
import Chart from "./chart.vue";

export default Vue.extend({
  components: {
    "world-bar-chart-svg": Chart
  },
  data() {
    return {
      issues: [],
      repository: "",
      startDate: null,
      loading: false,
      errored: false
    };
  },
  methods: {
    getDateRange() {
      const startDate = moment().subtract(10, "days");
      const endDate = moment();
      const dates = [];

      while (startDate.isSameOrBefore(endDate)) {
        dates.push({
          day: startDate.format("MMM Do YY"),
          issues: 0
        });
        startDate.add(1, "days");
      }
      return dates;
    },

    getIssues() {
      this.errored = false;
      this.loading = true;
      this.startDate = moment()
        .subtract(10, "days")
        .format("YYYY-MM-DD");

      axios
        .get(
          `https://api.github.com/search/issues?q=repo:${this.repository}+is:issue+is:open+created:>=${this.startDate}`,
          { params: { perPage: 100 } }
        )
        .then(response => {
          const payload = this.getDateRange();

          response.data.items.forEach(item => {
            const key = moment(item.created_at).format("MMM Do YY");
            const obj = payload.filter(o => o.day === key)[0];
            obj.issues += 1;
          });

          this.issues = payload.map((item, index) => ({ ...item, index }));
        })
        .catch(error => {
          console.error(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  }
});
</script>

<style lang="sass">
.bar
  fill: #319bbe
</style>
