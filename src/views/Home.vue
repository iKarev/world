<template>
  <div class="home">
    <Map />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Map from "@/components/Map/index.vue"; // @ is an alias to /src

@Component({
  components: {
    Map
  }
})
export default class Home extends Vue {}
</script>
