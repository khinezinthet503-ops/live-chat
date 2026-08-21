<template>
  <div class="chat-window" ref="msgBox">
    <div class="messages" v-for="message in formattedMeg" :key="message.id">
      <div class="single">
        <span class="created-at">{{ message.created_at }}</span>
        <div class="chat-message">
          <span class="name">{{ message.name }}</span>
          <span class="message">{{ message.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { computed, onUpdated, ref } from "vue";
import { formatDistanceToNow } from "date-fns";

export default {
  setup() {
    let messages = ref([]);
    let msgBox = ref(null);
    onUpdated(() => {
      msgBox.value.scrollTop = msgBox.value.scrollHeight;
    });
    let formattedMeg = computed(() => {
      return messages.value.map((msg) => {
        let formattedTime = formatDistanceToNow(msg.created_at.toDate());
        return { ...msg, created_at: formattedTime };
      });
    });
    let colRef = collection(db, "message");
    let q = query(colRef, orderBy("created_at"));
    onSnapshot(q, (snap) => {
      let result = [];
      snap.docs.forEach((doc) => {
        let document = { ...doc.data(), id: doc.id };
        doc.data().created_at && result.push(document);
      });
      messages.value = result;
    });
    return { messages, formattedMeg, msgBox };
  },
};
</script>

<style>
.chat-window {
  padding: 30px 20px;
  background-color: #ededed;
  max-height: 500px;
  overflow-y: auto;
}
.single {
  margin: 18px 10px;
}
.created-at {
  display: block;
  color: #999;
  /* margin-bottom: 10px; */
  font-size: 13px;
}
.name {
  font-weight: 500;
  margin-right: 10px;
}
.message {
  background-color: rgb(35, 140, 232);
  color: white;
  padding: 2px 5px;
  max-height: 400px;
  border-radius: 5px;
  max-width: 200px;
}
.chat-message {
  display: flex;
  align-items: center;
}
</style>
