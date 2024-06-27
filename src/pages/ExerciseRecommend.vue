<template>
  <div class="mx-5">
    <div>
      <v-card-title class="text-center">Get your Exercise Plan</v-card-title>
      <v-card-subtitle class="text-center mb-10">
        Success starts with self-discipline
      </v-card-subtitle>
    </div>

    <div class="text-center mb-8">
      <v-avatar color="blue-darken-1" size="100" class="mb-6">
        <v-icon icon="mdi-weight-lifter" size="60"></v-icon>
      </v-avatar>
      <v-autocomplete
        v-model="exerciseType"
        :items="exerciseTypes"
        label="Select the exercise type"
        variant="outlined"
        density="comfortable"
      ></v-autocomplete>
    </div>

    <div class="text-center mb-8">
      <v-avatar color="light-green-darken-2" size="100" class="mb-6">
        <v-icon icon="mdi-human" size="60"></v-icon>
      </v-avatar>
      <v-autocomplete
        v-model="bodyPart"
        :items="bodyParts"
        label="Select the body part"
        variant="outlined"
        density="comfortable"
      ></v-autocomplete>
    </div>

    <div class="text-center">
      <v-avatar color="cyan-darken-2" size="100" class="mb-6">
        <v-icon icon="mdi-human-male-height" size="60"></v-icon>
      </v-avatar>
      <v-autocomplete
        v-model="level"
        :items="levels"
        label="Select the exercise level"
        variant="outlined"
        density="comfortable"
      ></v-autocomplete>
    </div>

    <v-btn
      class="bg-teal rounded-lg mt-8 mb-8"
      :disabled="isFetching ? true : false"
      @click="getExercisePlan"
      block
    >
      Get Best Exercise
    </v-btn>
  </div>
  <v-dialog v-model="dialog">
    <v-card class="pa-5">
      <v-card-title class="text-center text-teal card-text">
        Exercises
        <span style="font-size: 10px">(Recommended)</span>
      </v-card-title>

      <div
        v-for="exercise in exercisePlan"
        class="bg-grey-lighten-3 mb-5 rounded-xl pb-4"
      >
        <v-card-text class="text-decoration-underline mb-2">
          {{ exercise.Title }}
        </v-card-text>
        <div v-for="video in exercise.youtube_links" class="mx-4">
          <iframe
            width="100%"
            height="150"
            :src="`https://www.youtube.com/embed/${video}`"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <v-rating
          v-model="exercise.Rating"
          class="ma-2"
          density="compact"
          color="yellow-darken-3"
          readonly
        ></v-rating>

        <v-card-text class="pb-0">
          <strong class="mr-1">Body Part: </strong> {{ exercise.BodyPart }}
        </v-card-text>

        <v-card-text class="pb-0">
          <strong class="mr-1">Type: </strong> {{ exercise.Type }}
        </v-card-text>
        <v-card-text class="pb-0">
          <strong class="mr-1">Level: </strong> {{ exercise.Level }}
        </v-card-text>
        <v-card-text class="pb-0">
          <strong class="mr-1">Equipment: </strong> {{ exercise.Equipment }}
        </v-card-text>
        <v-card-text class="pb-0 text-justify">
          <strong class="mr-1">Description:</strong>
          <div class="mt-2">{{ exercise.Desc }}</div>
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
      exerciseTypes: [
        "Strength",
        "Plyometrics",
        "Cardio",
        "Stretching",
        "Powerlifting",
        "Strongman",
        "Olympic Weightlifting",
      ],
      exerciseType: "",
      bodyParts: [
        "Abdominals",
        "Adductors",
        "Abductors",
        "Biceps",
        "Calves",
        "Chest",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Lats",
        "Lower Back",
        "Middle Back",
        "Traps",
        "Neck",
        "Quadriceps",
        "Shoulders",
        "Triceps",
      ],
      bodyPart: "Abdominals",
      levels: ["Intermediate", "Beginner", "Expert"],
      level: "Intermediate",
      snackbar: false,
      text: "",
      dialog: false,
      exercisePlan: [],
      isFetching: false,
      userId: 0,
    };
  },
  created() {
    if (this.$route.params.data === "normal") {
      this.exerciseType = "Powerlifting";
    } else if (this.$route.params.data === "obesity") {
      this.exerciseType = "Cardio";
    } else if (this.$route.params.data === "underweight") {
      this.exerciseType = "Strength";
    } else if (this.$route.params.data === "overweight") {
      this.exerciseType = "Plyometrics";
    }
    const user = JSON.parse(localStorage.getItem("user"));

    this.userId = user.id;
  },
  methods: {
    async getExercisePlan() {
      this.isFetching = true;
      try {
        const response = await axios.post(
          `https://profit-app-3hk4.onrender.com/api/recommend-exercises/${this.userId}`,
          {
            type: this.exerciseType,
            bodyPart: this.bodyPart,
            level: this.level,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        this.isFetching = false;
        this.dialog = true;
        this.exercisePlan = response.data;
      } catch (error) {
        this.text = error?.response?.data?.message || error?.message;
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped></style>
