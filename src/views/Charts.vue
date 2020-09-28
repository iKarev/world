<template>
  <div class="home">
    <Charts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Charts from "@/components/Charts/index.vue";

@Component({
  components: {
    Charts
  }
})
export default class Home extends Vue {}
</script>
