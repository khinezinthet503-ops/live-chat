import { signOut } from "firebase/auth";
import { ref } from "vue";

let error = ref("");
let logOutUser = async (auth) => {
  try {
    await signOut(auth);
    console.log("user logged out ");
  } catch (err) {
    error.value = err.Message;
  }
};
let useLogOut = () => {
  return {
    error,
    logOutUser,
  };
};
export default useLogOut;
