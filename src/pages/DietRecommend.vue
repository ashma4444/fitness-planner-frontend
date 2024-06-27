<template>
  <div class="ma-5">
    <v-card-title class="text-center">Get your Diet Plan</v-card-title>
    <v-card-subtitle class="text-center mb-10">
      Success starts with self-discipline
    </v-card-subtitle>

    <span class="text-red d-block mb-3" style="font-size: 12px">
      Note: Your details cannot be updated from here!
      <span
        class="pointer text-primary d-block"
        @click="$router.push({ name: 'update' })"
      >
        Click here to Update profile
      </span>
    </span>

    <v-label style="font-size: 12px" class="mb-4">Select your gender</v-label>
    <v-radio-group :readonly="true" v-model="formData.gender" inline>
      <v-radio label="Male" value="male"></v-radio>
      <v-radio label="Female" value="female"></v-radio>
    </v-radio-group>

    <v-label style="font-size: 12px">Select your age</v-label>
    <v-text-field
      variant="plain"
      :readonly="true"
      width="30%"
      v-model="formData.age"
      suffix="years old"
    ></v-text-field>
    <v-slider
      v-model="formData.age"
      :readonly="true"
      color="teal"
      :step="1"
      max="70"
      min="13"
      track-color="grey"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-minus"
          size="small"
          variant="text"
          @click="decrement('age')"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          icon="mdi-plus"
          size="small"
          variant="text"
          @click="increment('age')"
        ></v-btn>
      </template>
    </v-slider>

    <v-label style="font-size: 12px">Select your weight</v-label>
    <v-text-field
      :readonly="true"
      variant="plain"
      width="20%"
      v-model="formData.weight"
      suffix="kg"
    ></v-text-field>
    <v-slider
      :readonly="true"
      v-model="formData.weight"
      color="teal"
      :step="1"
      max="150"
      min="40"
      track-color="grey"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-minus"
          size="small"
          variant="text"
          @click="decrement('weight')"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          icon="mdi-plus"
          size="small"
          variant="text"
          @click="increment('weight')"
        ></v-btn>
      </template>
    </v-slider>

    <v-label style="font-size: 12px">Select your height</v-label>
    <v-text-field
      :readonly="true"
      variant="plain"
      width="25%"
      v-model="formData.height"
      suffix="cm"
    ></v-text-field>

    <v-slider
      :readonly="true"
      v-model="formData.height"
      color="teal"
      :step="1"
      max="210"
      min="120"
      track-color="grey"
    >
      <template v-slot:prepend>
        <v-btn
          icon="mdi-minus"
          size="small"
          variant="text"
          @click="decrement('height')"
        ></v-btn>
      </template>

      <template v-slot:append>
        <v-btn
          icon="mdi-plus"
          size="small"
          variant="text"
          @click="increment('height')"
        ></v-btn>
      </template>
    </v-slider>

    <v-label style="font-size: 12px" class="mb-4">
      Select the activity level
    </v-label>
    <v-autocomplete
      :readonly="true"
      v-model="formData.activityLevel"
      :items="items"
      variant="outlined"
      density="comfortable"
    ></v-autocomplete>

    <v-btn class="bg-teal rounded-lg mt-5" @click="getDietPlan" block>
      Get Best Diet
    </v-btn>
  </div>
  <v-dialog v-model="dialog">
    <v-card class="pa-5">
      <v-card-title class="text-center text-teal card-text">
        Daily Nutrition
        <span style="font-size: 10px">(Recommended)</span>
      </v-card-title>
      <div
        class="d-flex justify-space-between align-center bg-grey-lighten-3 pa-4 rounded-xl"
      >
        <v-card-text class="pa-0">
          <strong class="mr-1">Calories:</strong>
          {{ dietPlan.recommendedDailyNutrition.calories.toFixed(3) }}
        </v-card-text>
        <v-card-text class="pa-0">
          <strong class="mr-1">Fat:</strong>
          {{ dietPlan.recommendedDailyNutrition.fat.toFixed(3) }}
        </v-card-text>
        <v-card-text class="pa-0">
          <strong class="mr-1">Protein:</strong>
          {{ dietPlan.recommendedDailyNutrition.protein.toFixed(3) }}
        </v-card-text>
      </div>

      <v-card-title class="text-center text-teal card-text mt-2">
        Possible Recipes
      </v-card-title>
      <div
        v-for="recipe in dietPlan.possibleRecipes"
        class="bg-grey-lighten-3 mb-5 rounded-xl pb-4"
      >
        <v-card-text class="pb-0 text-decoration-underline">
          {{ recipe.title }}
        </v-card-text>
        <v-rating
          v-model="recipe.rating"
          class="ma-2"
          density="compact"
          color="yellow-darken-3"
          readonly
        ></v-rating>
        <v-card-text class="pb-0">
          <strong class="mr-1">Calories:</strong> {{ recipe.calories }}
        </v-card-text>
        <v-card-text class="pb-0">
          <strong class="mr-1">Protein:</strong> {{ recipe.protein }}
        </v-card-text>
        <v-card-text class="pb-0">
          <strong class="mr-1">Sodium:</strong> {{ recipe.sodium }}
        </v-card-text>
        <v-card-text class="pb-0">
          <strong class="mr-1">Categories:</strong>
          <span v-for="item in recipe.categories"> {{ item }}, </span>
        </v-card-text>
        <v-card-text class="pb-0 text-justify">
          <strong class="mr-1">Description:</strong> {{ recipe.desc }}
        </v-card-text>
        <v-card-text class="pb-0 text-justify">
          <strong class="mr-1">Directions:</strong>
          <div v-for="item in recipe.directions" class="mt-2">
            <v-icon size="5">mdi-circle</v-icon>
            {{ item }}
          </div>
        </v-card-text>
        <v-card-text class="pb-0 text-justify">
          <strong class="mr-1">Ingredients:</strong>
          <div v-for="item in recipe.ingredients" class="mt-2">
            <v-icon size="5">mdi-circle</v-icon>
            {{ item }}
          </div>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" :timeout="5000">
    {{ text }}
  </v-snackbar>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        age: 0,
        weight: 0,
        height: 0,
        gender: "",
        activityLevel: "",
      },
      items: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active",
        "Super active",
      ],
      userId: 0,
      dialog: false,
      dietPlan: {},
      snackbar: false,
      text: "",
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.formData.age = user.age;
    this.formData.weight = user.weight;
    this.formData.height = user.height;
    this.formData.gender = user.gender;
    this.formData.activityLevel = user.activityLevel;
    this.userId = user.id;
  },
  methods: {
    async getDietPlan() {
      try {
        const response = await axios.get(
          `https://profit-app-3hk4.onrender.com/api/recommend-diet/${this.userId}`
        );
        this.dietPlan = response.data;
        this.dialog = true;
      } catch (error) {
        this.text = error?.response?.data?.message || error?.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped></style>
