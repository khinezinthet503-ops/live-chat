<template>
  <div class="welcome container">
    <div v-if="showLoginForm">
      <LogIn @enterChatroom="enterChatroom"></LogIn>
      <p>
        not a member?<span @click="showLoginForm = !showLoginForm"
          >create a account</span
        >
      </p>
    </div>
    <div v-else>
      <SignUp @enterChatroom="enterChatroom"></SignUp>
      <p>
        already have a account.<span @click="showLoginForm = !showLoginForm"
          >Login a account</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import { useRouter } from "vue-router";
export default {
  components: {
    LogIn,
    SignUp,
  },
  setup() {
    let router = useRouter();
    let showLoginForm = ref(true);
    let enterChatroom = () => {
      router.push({ name: "chatroom" });
    };

    return {
      showLoginForm,
      enterChatroom,
    };
  },
};
</script>

<style>
.welcome {
  text-align: center;
  padding: 20px 0px;
}
.welcome form {
  width: 300px;
  margin: 20px auto;
}
.welcome input {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(234, 234, 181);
  margin-top: 30px;
}
.welcome span {
  font-weight: bold;
  text-decoration: underline;
  margin-left: 7px;
}
</style>
