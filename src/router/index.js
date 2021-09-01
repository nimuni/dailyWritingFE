import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';
const dayjs = require("dayjs");
const timezone = require('dayjs/plugin/timezone')
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc)
dayjs.extend(timezone)

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  let expireTime = dayjs(store.state.expire).tz("Asia/Seoul")
  let nowTime = dayjs().tz("Asia/Seoul")
  console.log()
  if (expireTime > nowTime) {
    return next();
  } else {
    console.log("router requireAuth else")
    return from();
  }
};

const routes = [
  {
    path: "/",
    name: "Intro",
    component: () => import("@/views/Intro.vue")
  },
  {
    path: "/DailyWritingCreate",
    name: "DailyWritingCreate",
    beforeEnter: requireAuth,
    component: () => import("@/views/DailyWritingCreate.vue")
  },
  {
    path: "/DailyWritingRead",
    name: "DailyWritingRead",
    beforeEnter: requireAuth,
    component: () => import("@/views/DailyWritingRead.vue")
  },
  {
    path: "/DailyWritingList",
    name: "DailyWritingList",
    beforeEnter: requireAuth,
    component: () => import("@/views/DailyWritingList.vue")
  },
  {
    path: "/SubjectList",
    name: "SubjectList",
    beforeEnter: requireAuth,
    component: () => import("@/views/SubjectList.vue")
  },
  {
    path: "/SubjectCreate",
    name: "SubjectCreate",
    beforeEnter: requireAuth,
    component: () => import("@/views/SubjectCreate.vue")
  },
  {
    path: "/SubjectRead",
    name: "SubjectRead",
    beforeEnter: requireAuth,
    component: () => import("@/views/SubjectRead.vue")
  },
  {
    path: "/Register",
    name: "Register",
    component: () => import("@/views/Register.vue")
  },
  {
    path: "/Inquiry",
    name: "Inquiry",
    component: () => import("@/views/Inquiry.vue")
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/MyPage",
    name: "MyPage",
    beforeEnter: requireAuth,
    component: () => import("@/views/MyPage.vue")
  },
  {
    path: "/Code",
    name: "Code",
    beforeEnter: requireAuth,
    component: () => import("@/views/Code.vue")
  },
  {
    path: '*',
    name:'404', 
    component: () => import("@/views/NotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// NavigationDuplicated 처리
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }

  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      // resolve err
      return err
    }
    // rethrow error
    return Promise.reject(err)
  })
}

// router.afterEach((to, from) => { 
// })

export default router;
