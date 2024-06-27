<template>
  <v-app>
    <AppBar @side-nav-rail="secondDrawer = !secondDrawer" />

    <v-navigation-drawer
      v-model="secondDrawer"
      :class="$vuetify.display.smAndDown ? 'd-block ' : 'd-none'"
      floating
    >
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// components
import AppBar from "@/layouts/default/AppBar";

export default {
  components: { AppBar },
  data() {
    return {
      secondDrawer: false,
    };
  },
  created() {},
  methods: {},
  computed: {},
};
</script>

<style scoped>
.v-main {
  --v-layout-left: 0 !important;
}
</style>
