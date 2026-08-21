import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { ref } from "vue";
const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/missing-password": "Please enter a password.",
};

let error = ref("");

let createAccount = async (auth, email, password, userName) => {
  try {
    let res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("could not create a account");
    }
    await updateProfile(res.user, { displayName: userName });
    return res;
  } catch (err) {
    error.value = errorMessages[err.code];

    return null;
  }
};

let useSingUp = () => {
  return { error, createAccount };
};
export default useSingUp;
