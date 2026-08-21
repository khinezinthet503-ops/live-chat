import { ref } from "vue";
import { signInWithEmailAndPassword } from "firebase/auth";

const errorMessages = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
};

let error = ref("");
let signIn = async (auth, email, password) => {
  try {
    let res = await signInWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Can't Login account");
    }
    return res;
  } catch (err) {
    error.value = errorMessages[err.code];

    console.log(error.value);
    return null;
  }
};
let useLogin = () => {
  return { error, signIn };
};
export default useLogin;
