<template>
  <div>
    <h2>Log in</h2>
    <form @submit.prevent="logIn">
      <input type="text" placeholder="email" v-model="email" />
      <input type="password" placeholder="password" v-model="password" />
      <div v-if="error" class="error">{{ error }}</div>
      <button>Log in</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth } from "@/firebase/config";
import useLogin from "@/composable/useLogin";
export default {
  setup(props, context) {
    let email = ref("");
    let password = ref("");

    let { error, signIn } = useLogin();
    let logIn = async () => {
      let res = await signIn(auth, email.value, password.value);
      if (res) {
        context.emit("enterChatroom");
      }
    };
    return { email, password, logIn, error };
  },
};
</script>

<style></style>
