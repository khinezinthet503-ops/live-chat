<template>
  <div>
    <h2>Sign Up</h2>

    <form @submit.prevent="signUp">
      <input type="text" placeholder="User Name" v-model="userName" />
      <input type="text" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button>Sign Up</button>
    </form>
  </div>
</template>

<script>
import useSingUp from "@/composable/useSignUp";
import { auth } from "@/firebase/config";

import { ref } from "vue";

export default {
  setup(props, context) {
    let userName = ref("");
    let email = ref("");
    let password = ref("");

    let { error, createAccount } = useSingUp();
    let signUp = async () => {
      let res = await createAccount(
        auth,
        email.value,
        password.value,
        userName.value,
      );
      if (res) {
        context.emit("enterChatroom");
      } else {
        console.log(error.value);
      }
    };
    return { userName, email, password, signUp, error };
  },
};
</script>

<style></style>
