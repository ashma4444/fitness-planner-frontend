<template>
  <div>
    <v-carousel
      height="60vh"
      hide-delimiter-background
      :show-arrows="false"
      cycle
    >
      <v-carousel-item v-for="slide in slides" :src="slide.src" cover>
        <div
          class="d-flex fill-height justify-center align-center carousel-container"
        >
          <div class="text-white pa-3">
            <h1 class="text-uppercase text-center" style="font-size: 55px">
              Workout With Me
            </h1>
            <p class="text-center small-text mb-6">
              Choose from hundreds of workouts and healthy recipes for a whole
              body.
            </p>
            <div class="text-center">
              <v-btn
                class="bg-teal mr-4"
                :ripple="false"
                @click="$router.push({ name: 'get-plan' })"
              >
                Get Plan
              </v-btn>

              <v-btn
                :ripple="false"
                variant="outlined"
                color="teal"
                @click="$router.push({ name: 'calculate' })"
              >
                <span class="text-white"> Calculate BMI </span>
              </v-btn>
            </div>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>

    <div class="my-14 mx-8">
      <h2 class="text-center text-grey-darken-4 heading-text mb-2">
        Choose
        <span class="text-tealPrimary">Program </span>
      </h2>
      <p class="xsmall-text text-center text-grey-darken-1">
        Discover the perfect program for you, choose your path to fitness
        success
      </p>

      <div class="mt-10" v-for="program in programs">
        <v-card class="elevation-0 d-flex align-center">
          <div
            class="bg-tealPrimary rounded-lg pa-4"
            style="width: fit-content"
          >
            <v-icon size="45" color="white"> {{ program.icon }} </v-icon>
          </div>
          <div>
            <v-card-title class="text-grey-darken-4 pb-0 pt-0">
              {{ program.title }}
            </v-card-title>
            <v-card-subtitle class="xsmall-text">
              Discover the perfect program
            </v-card-subtitle>
          </div>
        </v-card>
      </div>
    </div>

    <div
      class="my-14 px-8 py-16"
      style="
        background: url('/images/bg.jpg');
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
      "
    >
      <h2
        class="text-center text-white mb-2"
        style="font-size: 38px; font-weight: 600"
      >
        Don't
        <span class="text-tealPrimary">Think </span>, Begin
        <span class="text-tealPrimary">Today</span>!
      </h2>
      <p class="xsmall-text text-center text-grey-lighten-3">
        Discover the perfect program for you, choose your path to fitness
        success
      </p>

      <div class="text-center mt-8">
        <v-btn
          class="bg-teal mr-4"
          :ripple="false"
          @click="$router.push({ name: 'get-plan' })"
        >
          Get Plan
        </v-btn>

        <v-btn
          :ripple="false"
          variant="outlined"
          color="teal"
          @click="$router.push({ name: 'calculate' })"
        >
          <span class="text-white"> Calculate BMI </span>
        </v-btn>
      </div>
      <!-- <div class="mt-10"></div> -->
    </div>

    <div class="my-14 mx-8">
      <h2 class="text-center text-grey-darken-4 heading-text mb-2">
        Expert
        <span class="text-tealPrimary">Trainers</span>
      </h2>
      <p class="xsmall-text text-center text-grey-darken-1">
        Discover the perfect program for you, choose your path to fitness
        success
      </p>

      <div class="mt-10" v-for="trainer in trainers">
        <v-card class="mx-auto" max-width="344">
          <v-img height="200px" :src="trainer.src" cover></v-img>

          <v-card-title> {{ trainer.name }} </v-card-title>

          <v-card-subtitle> {{ trainer.role }}</v-card-subtitle>

          <v-card-actions>
            <v-btn color="tealPrimary" text="Explore"></v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :icon="trainer.show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="trainer.show = !trainer.show"
            ></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="trainer.show">
              <v-divider></v-divider>

              <v-card-text class="text-grey-darken-3">
                I'm a thing. But, like most politicians, he promised more than
                he could deliver. You won't have time for sleeping, soldier, not
                with all the bed making you'll be doing. Then we'll go with that
                data file! Hey, you add a one and two zeros to that or we walk!
                You're going to do his laundry? I've got to find a way to
                escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </div>
    </div>

    <v-footer class="bg-teal text-center d-flex flex-column py-10 px-4">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          class="mx-4"
          variant="text"
        ></v-btn>
      </div>

      <div class="py-2">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum.
      </div>

      <div>{{ new Date().getFullYear() }} — <strong>ProFit</strong></div>
    </v-footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slides: [
        {
          src: "/images/fitness.jpg",
        },
        {
          src: "/images/fitness2.jpg",
        },
        {
          src: "/images/fitness3.jpg",
        },
      ],
      programs: [
        {
          icon: "mdi-google-fit",
          title: "Basic Fitness",
        },
        {
          icon: "mdi-dumbbell",
          title: "New Gym Training",
        },
        {
          icon: "mdi-yoga",
          title: "Yoga Training",
        },
        {
          icon: "mdi-weight-lifter",
          title: "Body Building ",
        },
      ],
      // show: false,
      trainers: [
        {
          src: "/images/wall1.jpg",
          name: "Bret D. Bowers",
          role: "Strength Trainer",
          show: false,
        },
        {
          src: "/images/wall2.jpg",
          name: "Hector T. Daigl",
          role: "Muscle Trainer",
          show: false,
        },
        {
          src: "/images/wall3.jpg",
          name: "Paul D. Newman",
          role: "Power Trainer",
          show: false,
        },
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
};
</script>
<style scoped>
.carousel-container {
  background: #12121294;
}
</style>
