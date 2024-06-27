<template>
  <v-card-title class="text-center">Unlock your potential!</v-card-title>
  <v-card-subtitle class="text-center mb-5">
    Success starts with self-discipline
  </v-card-subtitle>

  <div class="text-center mb-5">
    <v-avatar color="teal" size="100">
      <v-icon icon="mdi-login-variant" size="50"></v-icon>
    </v-avatar>
  </div>
  <v-form class="ma-5" ref="form">
    <v-label style="font-size: 12px" class="mb-4">Username</v-label>
    <v-text-field
      v-model="formData.username"
      placeholder="Username"
      variant="outlined"
      density="comfortable"
      :rules="[(v) => !!v || 'Username is required']"
    >
      <template v-slot:prepend-inner>
        <v-icon icon="mdi-account-plus" color="teal" />
      </template>
    </v-text-field>

    <v-label style="font-size: 12px" class="mb-4">Password</v-label>
    <v-text-field
      v-model="formData.password"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      :type="visible ? 'text' : 'password'"
      placeholder="Password"
      variant="outlined"
      density="comfortable"
      :rules="[(v) => !!v || 'Password is required']"
      @click:append-inner="visible = !visible"
    >
      <template v-slot:prepend-inner>
        <v-icon icon="mdi-lock" color="teal" />
      </template>
    </v-text-field>
    <v-btn
      class="bg-teal mt-6 rounded-lg"
      :ripple="false"
      size="large"
      @click="login"
      block
    >
      Login
    </v-btn>
    <v-card-text class="text-center">
      Don't have an account?
      <span
        class="text-teal pointer"
        @click="$router.push({ name: 'register' })"
      >
        Register
      </span>
    </v-card-text>
    <v-snackbar v-model="snackbar" :timeout="5000">
      {{ text }}
    </v-snackbar>
  </v-form>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      visible: false,
      text: "",
      snackbar: false,
      formData: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        try {
          const response = await axios.post(
            "https://profit-app-3hk4.onrender.com/api/users/login",
            this.formData
          );
          const now = new Date().getTime();
          localStorage.setItem("access", response.data.token);
          localStorage.setItem("setupTime", now.toString());
          localStorage.setItem("user", JSON.stringify(response.data.user));

          this.text = response.data.message;
          this.snackbar = true;
          this.$router.push({ name: "get-plan" }).then(() => {
            location.reload();
          });
        } catch (error) {
          this.text = error?.response?.data?.message || error?.message;
          this.snackbar = true;
        }
      }
    },
  },
};
</script>
<style scoped></style>
