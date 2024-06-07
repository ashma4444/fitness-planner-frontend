<template>
  <v-app-bar flat class="pl-3 pr-6">
    <template v-slot:prepend v-if="$vuetify.display.smAndDown">
      <v-app-bar-nav-icon @click="$emit('SideNavRail')"></v-app-bar-nav-icon>
    </template>

    <div>
      <v-card-title
        class="card-text-large font-weight-bold pointer"
        @click="$router.push({ name: 'home' })"
      >
        <span style="color: #03c0c1">Pro</span>Fit
      </v-card-title>
      <v-list :class="$vuetify.display.smAndDown ? 'd-none' : 'd-flex'">
      </v-list>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  emits: ["SideNavRail"],
  data() {
    return {
      drawer: null,
    };
  },
  created() {},
  methods: {},
  computed: {},
};
</script>

<style scoped></style>
