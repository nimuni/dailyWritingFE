import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Intro",
    component: () => import("@/views/Intro.vue")
  },
  {
    path: "/DailyWriting",
    name: "DailyWriting",
    component: () => import("@/views/DailyWriting.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) {
// });

// router.afterEach((to, from) => { 
// })

export default router;
