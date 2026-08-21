<template>
  <form action="">
    <textarea
      placeholder="text message and hit enter message"
      v-model="message"
      @keypress.enter="handerSubmit"
    ></textarea>
  </form>
</template>

<script>
import getUser from "@/composable/getUser";
import useCollection from "@/composable/useCollection";
import { serverTimestamp } from "firebase/firestore";
import { ref } from "vue";

export default {
  setup() {
    let message = ref("");
    let { user } = getUser();
    let { error, addDoc } = useCollection("message");
    let handerSubmit = async () => {
      let chat = {
        message: message.value,
        name: user.value.displayName,
        created_at: serverTimestamp(),
      };
      await addDoc(chat);
      message.value = "";
    };

    return { message, handerSubmit };
  },
};
</script>

<style>
form {
  margin: 10px;
}
textarea {
  padding: 10px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  outline: none;
  border: 0;
  margin-bottom: 10px;
}
</style>
