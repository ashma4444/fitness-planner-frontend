<template>
  <div class="overflow-x-hidden">
    <v-card-title class="text-center mb-4">Choose Your Plan</v-card-title>

    <v-card class="rounded-0">
      <v-img
        src="/images/fitness.jpg"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        cover
      >
        <v-card-title class="text-white" v-text="title"></v-card-title>
      </v-img>
    </v-card>
    <v-row class="mt-8">
      <v-col cols="12" v-for="card in cards" v-if="!isTrainer">
        <v-card
          class="mx-5 mb-3"
          rel="noopener"
          :subtitle="card.subtitle"
          @click="changeRoute(card.id)"
          :ripple="false"
        >
          <template v-slot:prepend>
            <v-btn class="ma-2" :color="card.color" :icon="card.icon"></v-btn>
          </template>
          <template v-slot:title>
            <v-card-title> {{ card.title }} </v-card-title>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="isTrainer">
        <v-card
          class="mx-5 mb-3"
          rel="noopener"
          subtitle="Rate the diet"
          @click="$router.push({ name: 'rate' })"
          :ripple="false"
        >
          <template v-slot:prepend>
            <v-btn
              class="ma-2"
              color="purple-darken-4"
              icon="mdi-account-check"
            ></v-btn>
          </template>
          <template v-slot:title>
            <v-card-title> Rate Diet </v-card-title>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" v-if="isTrainer">
        <v-card
          class="mx-5 mb-3"
          rel="noopener"
          subtitle="Rate the exercise"
          @click="$router.push({ name: 'rate' })"
          :ripple="false"
        >
          <template v-slot:prepend>
            <v-btn
              class="ma-2"
              color="pink-darken-4"
              icon="mdi-account-check"
            ></v-btn>
          </template>
          <template v-slot:title>
            <v-card-title> Rate Exercise </v-card-title>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
// components
import CommonCard from "@/components/CommonCard";

export default {
  components: { CommonCard },
  data() {
    return {
      title: "Get stronger every day.",
      cards: [
        {
          id: 1,
          title: "Calculate BMI",
          subtitle: "Check out the bmi calculator",
          icon: "mdi-google-fit",
          color: "blue-darken-1",
        },
        {
          id: 2,
          title: "Get diet plan",
          subtitle: "Check out the diet planner",
          icon: "mdi-food-apple",
          color: "light-green-darken-2",
        },
        {
          id: 3,
          title: "Get exercise plan",
          subtitle: "Check out the exercise planner",
          icon: "mdi-weight-lifter",
          color: "cyan-darken-2",
        },
      ],
      isTrainer: false,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.isTrainer = user.isTrainer;
  },
  methods: {
    changeRoute(id) {
      switch (id) {
        case 1:
          this.$router.push({ name: "calculate" });
          break;
        case 2:
          this.$router.push({ name: "get-diet-plan" });
          break;
        case 3:
          this.$router.push({ path: "/get-exercise-plan/normal" });
          break;
        default:
      }
    },
  },
};
</script>
<style scoped></style>
