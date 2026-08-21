<template>
  <nav v-if="user">
    <div class="user-info">
      <p>Hi {{ user.displayName }}</p>
      <p class="email">logged in as {{ user.email }}</p>
    </div>
    <button @click="logOut">log out</button>
  </nav>
</template>

<script>
import Welcome from "../views/Welcome";
import LogIn from "./LogIn";
import { auth } from "@/firebase/config";
import useLogOut from "@/composable/useLogOut";
import getUser from "@/composable/getUser";

export default {
  components: {
    Welcome,
    LogIn,
  },
  setup() {
    let { error, logOutUser } = useLogOut();
    let logOut = async () => {
      await logOutUser(auth);
    };
    let { user } = getUser();
    return { logOut, user, error };
  },
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  border-bottom: #bdc3c7 1px solid;
}
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
nav p {
  margin: 0;
  font-weight: 600;
  font-size: 15px;
}

.email {
  font-size: 12px;
  color: #bdc3c7;
}
nav button {
  align-self: center;
  margin: 0;
}
</style>
