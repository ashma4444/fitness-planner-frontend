<template>
  <v-card-title class="text-center">Rate</v-card-title>
  <v-card-subtitle class="text-center mb-5">
    Success starts with self-discipline
  </v-card-subtitle>

  <div class="bg-grey-lighten-3 ma-5 rounded-xl pa-2">
    <v-card-text class="text-justify pb-0">
      <strong class="mr-1">Name:</strong> Ashma Maharjan ...
    </v-card-text>
    <v-card-text class="text-justify pb-0">
      <strong class="mr-1">Age:</strong> 23
    </v-card-text>
    <v-card-text class="text-justify pb-0">
      <strong class="mr-1">Height:</strong> 5
    </v-card-text>

    <v-card-text class="d-flex align-center">
      <strong class="mr-1">Rate:</strong>
      <v-rating
        v-model="rating"
        class="mx-2"
        density="compact"
        color="yellow-darken-3"
      ></v-rating>
    </v-card-text>

    <v-btn
      class="bg-teal mt-6 rounded-lg"
      :ripple="false"
      size="large"
      @click="rate"
      block
    >
      Rate
    </v-btn>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rating: 2.5,
      allRec: [],
    };
  },
  async created() {
    await this.getAllRec();
    console.log("hmm");
  },
  methods: {
    async getAllRec() {
      try {
        const response = await axios.get(
          "https://profit-app-3hk4.onrender.com/api/users/get-all-recommendations"
        );
        console.log(response.data);
        this.allRec = response.data;
        console.log(this.allRec);
      } catch (error) {
        console.log(error);
        // this.text = error?.response?.data?.message || error?.message;
        // this.snackbar = true;
      }
    },
    async rate() {
      console.log("hii");
      // try {
      //   const response = await axios.put(
      //     "https://profit-app-3hk4.onrender.com/api/recommend-exercises/rate",
      //     {}
      //   );
      // } catch (error) {
      //   // this.text = error?.response?.data?.message || error?.message;
      //   // this.snackbar = true;
      // }
    },
  },
};
</script>
<style scoped></style>
