<template>
  <div class="h-100">
    <v-card-title class="text-center">Update Profile!</v-card-title>
    <v-card-subtitle class="text-center mb-5">
      Success starts with self-discipline
    </v-card-subtitle>

    <div class="text-center">
      <v-avatar color="teal" size="100">
        <v-icon icon="mdi-account-circle" size="80"></v-icon>
      </v-avatar>
    </div>

    <v-form class="ma-5" ref="form">
      <v-label style="font-size: 12px" class="mb-4">First Name</v-label>
      <v-text-field
        v-model="formData.firstName"
        placeholder="First Name"
        variant="outlined"
        density="comfortable"
        :rules="[(v) => !!v || 'First Name is required']"
      >
        <template v-slot:prepend-inner>
          <v-icon icon="mdi-account-edit" color="teal" />
        </template>
      </v-text-field>

      <v-label style="font-size: 12px" class="mb-4">Last Name</v-label>
      <v-text-field
        v-model="formData.lastName"
        placeholder="Last Name"
        variant="outlined"
        density="comfortable"
        :rules="[(v) => !!v || 'Last Name is required']"
      >
        <template v-slot:prepend-inner>
          <v-icon icon="mdi-account-edit" color="teal" />
        </template>
      </v-text-field>

      <v-label style="font-size: 12px" class="mb-4">Select your gender</v-label>
      <v-radio-group v-model="formData.gender" inline>
        <v-radio label="Male" value="male"></v-radio>
        <v-radio label="Female" value="female"></v-radio>
      </v-radio-group>

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
        variant="plain"
        width="20%"
        v-model="formData.weight"
        suffix="kg"
      ></v-text-field>
      <v-slider
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
        variant="plain"
        width="25%"
        v-model="formData.height"
        suffix="cm"
      ></v-text-field>

      <v-slider
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

      <v-label style="font-size: 12px" class="mb-4"
        >Select the activity level</v-label
      >
      <v-autocomplete
        v-model="formData.activityLevel"
        :items="items"
        variant="outlined"
        density="comfortable"
      ></v-autocomplete>

      <v-label style="font-size: 12px" class="mb-4">Are you Trainer?</v-label>
      <v-radio-group v-model="formData.isTrainer" inline>
        <v-radio label="Yes" :value="true"></v-radio>
        <v-radio label="No" :value="false"></v-radio>
      </v-radio-group>

      <v-btn
        class="bg-teal mt-6 w-100 rounded-lg"
        :ripple="false"
        size="large"
        @click="updateUser"
      >
        Update
      </v-btn>
    </v-form>
  </div>
  <v-snackbar v-model="snackbar" :timeout="5000">
    {{ text }}
  </v-snackbar>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      visible: false,
      text: "",
      snackbar: false,
      items: [
        "Sedentary",
        "Lightly active",
        "Moderately active",
        "Very active",
        "Super active",
      ],
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        isTrainer: true,
        password: "",
        age: 0,
        weight: 0,
        height: 0,
        gender: "male",
        activityLevel: "Sedentary",
      },
      userId: 0,
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.formData.firstName = user.firstName;
    this.formData.lastName = user.lastName;
    this.formData.username = user.username;
    this.formData.age = user.age;
    this.formData.weight = user.weight;
    this.formData.height = user.height;
    this.formData.gender = user.gender;
    this.formData.activityLevel = user.activityLevel;
    this.userId = user.id;
  },
  methods: {
    decrement(val) {
      switch (val) {
        case "age":
          this.formData.age--;
          break;
        case "weight":
          this.formData.weight--;
          break;
        case "height":
          this.formData.height--;
          break;
        default:
          break;
      }
    },
    increment(val) {
      switch (val) {
        case "age":
          this.formData.age++;
          break;
        case "weight":
          this.formData.weight++;
          break;
        case "height":
          this.formData.height++;
          break;
        default:
          break;
      }
    },
    async updateUser() {
      const { valid } = await this.$refs.form.validate();
      this.formData.height = parseFloat(this.formData.height);
      this.formData.weight = parseFloat(this.formData.weight);

      if (valid) {
        try {
          const response = await axios.put(
            `https://profit-app-3hk4.onrender.com/api/users/update/${this.userId}`,
            this.formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          this.text = response.data.message;
          this.snackbar = true;
          localStorage.setItem("user", JSON.stringify(response.data.user));
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
