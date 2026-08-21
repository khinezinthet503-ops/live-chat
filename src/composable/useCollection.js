import { db } from "@/firebase/config";
import { ref } from "vue";
import { collection, addDoc as addDocToFirestore } from "firebase/firestore";

let useCollection = (collectionName) => {
  let error = ref("");
  let addDoc = async (doc) => {
    try {
      const colRef = collection(db, collectionName);
      const res = await addDocToFirestore(colRef, doc);
      return res;
    } catch (err) {
      console.log(err.message);
      error.value = "could not sent the messages";
    }
  };
  return { error, addDoc };
};
export default useCollection;
