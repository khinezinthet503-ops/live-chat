import { createRouter, createWebHistory } from "vue-router";
import Welcome from "@/views/Welcome.vue";
import Chatroom from "@/views/Chatroom.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/config";

const routes = [
  {
    path: "/",
    name: "welcome",
    component: Welcome,
    meta: { requiresGuest: true }, //"only people who are not logged in should see this page"
  },
  {
    path: "/chatroom",
    name: "chatroom",
    component: Chatroom,
    meta: { requiresAuth: true }, //only people who are logged in should see this page"
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        reject(error);
      },
    );
  });
}

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresGuest = to.matched.some((record) => record.meta.requiresGuest);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    next({ name: "welcome" });
  } else if (requiresGuest && user) {
    next({ name: "chatroom" });
  } else {
    next();
  }
});

export default router;
