<template>
  <div class="h-100 d-flex flex-column justify-space-between">
    <div>
      <v-card-title class="text-center">BMI Calculator</v-card-title>
      <v-card-subtitle class="text-center mb-10">
        Success starts with self-discipline
      </v-card-subtitle>

      <div class="d-flex justify-space-between my-6 mx-10">
        <v-card
          style="width: 45%"
          class="py-6 text-center rounded-lg pointer"
          :class="selected === 'male' ? 'bg-teal' : 'custom-border'"
          :variant="selected === 'male' ? 'tonal' : 'outlined'"
          :color="selected === 'male' ? 'white' : 'teal'"
          @click="selected = 'male'"
        >
          <v-icon size="50">mdi-gender-male</v-icon>
          <v-card-text class="pb-0 card-text"> Male </v-card-text>
        </v-card>
        <v-card
          style="width: 45%"
          class="py-6 text-center rounded-lg pointer"
          :class="selected === 'female' ? 'bg-teal' : 'custom-border'"
          :variant="selected === 'female' ? 'tonal' : 'outlined'"
          :color="selected === 'female' ? 'white' : 'teal'"
          @click="selected = 'female'"
        >
          <v-icon size="50">mdi-gender-female</v-icon>
          <v-card-text class="pb-0 card-text"> Female </v-card-text>
        </v-card>
      </div>
    </div>

    <div class="px-5 pt-3 bg-grey-lighten-3">
      <v-card-text class="text-uppercase text-center pb-0">Height</v-card-text>

      <v-card-title class="heading-text text-center pb-5">
        {{ height }} cm
      </v-card-title>
      <v-slider
        v-model="height"
        color="teal"
        :step="1"
        max="218"
        min="40"
        track-color="grey"
      ></v-slider>
    </div>

    <div>
      <div class="d-flex justify-space-between my-6 mx-10">
        <v-card style="width: 45%" class="py-6 text-center rounded-lg pointer">
          <v-card-text class="pt-0 card-text text-teal pb-0">
            Weight
          </v-card-text>

          <v-card-title
            style="font-size: 35px"
            class="text-center font-weight-regular"
          >
            {{ weight }}
          </v-card-title>

          <v-card-actions class="d-flex justify-space-between mx-3 pb-0">
            <v-btn
              icon=""
              class="bg-teal"
              size="28"
              :ripple="false"
              @click="decrement('weight')"
            >
              <v-icon size="18">mdi-minus</v-icon>
            </v-btn>
            <v-btn
              icon=""
              class="bg-teal"
              size="28"
              :ripple="false"
              @click="increment('weight')"
            >
              <v-icon size="18">mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <v-card style="width: 45%" class="py-6 text-center rounded-lg pointer">
          <v-card-text class="pt-0 card-text text-teal pb-0"> Age </v-card-text>
          <v-card-title
            style="font-size: 35px"
            class="text-center font-weight-regular"
          >
            {{ age }}
          </v-card-title>

          <v-card-actions class="d-flex justify-space-between mx-3 pb-0">
            <v-btn
              icon=""
              class="bg-teal"
              size="28"
              :ripple="false"
              @click="decrement('age')"
            >
              <v-icon size="18">mdi-minus</v-icon>
            </v-btn>
            <v-btn
              icon=""
              class="bg-teal"
              size="28"
              :ripple="false"
              @click="increment('age')"
            >
              <v-icon size="18">mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>

    <v-btn class="bg-btnDark rounded-0" size="x-large" @click="calculateBmi">
      Calculate
    </v-btn>
  </div>

  <v-dialog v-model="dialog">
    <v-card class="rounded-xl pa-5">
      <v-card-text class="text-center text-teal pb-0"
        >Your calculated BMI:
      </v-card-text>
      <v-card-title class="text-center py-0" style="font-size: 40px">
        {{ bmi }}
      </v-card-title>
      <v-card-text class="text-center text-capitalize">
        You are {{ analysis }}
      </v-card-text>

      <v-btn class="bg-teal" :ripple="false" @click="goToExercisePlan">
        Get Exercise Plan
      </v-btn>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      selected: "male",
      height: 180,
      weight: 50,
      age: 20,
      bmi: 0,
      dialog: false,
      analysis: "",
    };
  },
  methods: {
    increment(incrementCase) {
      switch (incrementCase) {
        case "weight":
          this.weight++;
          break;
        case "age":
          this.age++;
          break;
        default:
      }
    },

    decrement(decrementCase) {
      switch (decrementCase) {
        case "weight":
          this.weight--;
          break;
        case "age":
          this.age--;
          break;
        default:
      }
    },

    calculateBmi() {
      // _bmi = (weight / pow(height / 100, 2));
      this.bmi = this.weight / Math.pow(this.height / 100, 2);
      this.bmi = this.bmi.toFixed(3);
      // Math.round()
      this.dialog = true;
      if (this.bmi < 18.5) {
        this.analysis = "underweight";
      } else if (this.bmi > 18.5 && this.bmi < 24.9) {
        this.analysis = "normal";
      } else if (this.bmi > 25 && this.bmi < 29.9) {
        this.analysis = "overweight";
      } else {
        this.analysis = "obesity";
      }
    },
    goToExercisePlan() {
      this.$router.push({ path: `/get-exercise-plan/${this.analysis}` });
    },
  },
};
</script>
<style scoped>
.custom-border {
  border: 2px solid !important;
}
</style>
