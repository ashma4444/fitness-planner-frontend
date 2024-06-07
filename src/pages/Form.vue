<template>
  <div>
    <v-stepper v-model="e1" elevation="0">
      <template v-slot:default="{ prev, next }">
        <v-stepper-header>
          <template v-for="n in steps" :key="`${n}-step`">
            <v-stepper-item :complete="e1 > n" :value="n" color="teal">
            </v-stepper-item>

            <v-divider v-if="n !== steps" :key="n"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-window>
          <v-stepper-window-item :value="1">
            <v-card elevation="0">1 hii</v-card>
          </v-stepper-window-item>

          <v-stepper-window-item :value="2">
            <v-card elevation="0">2</v-card>
          </v-stepper-window-item>
        </v-stepper-window>

        <div class="pa-6 custom-position d-flex justify-space-between w-100">
          <v-btn
            @click="prev"
            icon="mdi-chevron-left"
            class="bg-teal"
            :disabled="e1 === 1"
            :ripple="false"
          >
          </v-btn>
          <v-btn
            @click="next"
            v-if="e1 !== steps"
            icon="mdi-chevron-right"
            class="bg-teal"
            :ripple="false"
          >
          </v-btn>
          <v-btn
            @click=""
            v-else
            icon="mdi-check"
            class="bg-teal"
            :ripple="false"
          >
          </v-btn>
        </div>
      </template>
    </v-stepper>
  </div>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
      steps: 3,
    };
  },
  computed: {
    disabled() {
      return this.e1 === 1
        ? "prev"
        : this.e1 === this.steps
        ? "next"
        : undefined;
    },
  },
  methods: {},
};
</script>
<style scoped>
.custom-position {
  position: absolute;
  bottom: 0;
}
</style>
