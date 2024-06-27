<template>
  <v-app-bar flat class="pl-3 pr-6">
    <template v-slot:prepend v-if="$vuetify.display.smAndDown">
      <v-app-bar-nav-icon @click="$emit('SideNavRail')"></v-app-bar-nav-icon>
    </template>

    <div>
      <v-card-title
        v-if="!isLoggedin"
        class="card-text-large font-weight-bold pointer"
        @click="$router.push({ name: 'home' })"
      >
        <span style="color: #03c0c1">Pro</span>Fit
      </v-card-title>

      <v-menu v-else>
        <template v-slot:activator="{ props }">
          <v-btn color="grey" v-bind="props" :ripple="false" icon="mdi-account">
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            class="px-10"
            @click="$router.push({ name: 'get-plan' })"
          >
            <v-list-item-title class="card-text pointer">
              Get Plans
            </v-list-item-title>
          </v-list-item>
          <v-list-item class="px-10" @click="logout">
            <v-list-item-title class="card-text pointer">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
      isLoggedin: false,
    };
  },
  created() {
    if (localStorage.getItem("access")) {
      this.isLoggedin = true;
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "home" }).then(() => {
        location.reload();
      });
    },
  },
  computed: {},
};
</script>

<style scoped></style>
