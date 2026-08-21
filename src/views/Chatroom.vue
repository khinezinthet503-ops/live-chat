<template>
  <div class="container">
    <NavBar></NavBar>
    <ChatWindow></ChatWindow>
    <NewChatForm></NewChatForm>
  </div>
</template>

<script>
import ChatWindow from "../components/ChatWindow";
import NewChatForm from "../components/NewChatForm";
import NavBar from "../components/NavBar";
import { watch } from "vue";
import getUser from "@/composable/getUser";
import { useRouter } from "vue-router";
export default {
  components: {
    ChatWindow,
    NewChatForm,
    NavBar,
  },
  setup() {
    let router = useRouter();
    let { user } = getUser();
    watch(user, () => {
      if (!user.value) {
        router.push("/");
      }
    });
    // return {};
  },
};
</script>

<style></style>
