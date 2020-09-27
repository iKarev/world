<template>
  <div class="vuetify">
    <Vuetify />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Vuetify from "@/components/Vuetify.vue"; // @ is an alias to /src

@Component({
  components: {
    Vuetify
  }
})
export default class About extends Vue {}
</script>
