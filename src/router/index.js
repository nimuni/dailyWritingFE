import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index';

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  if (store.state.accessToken !== '') {
    return next();
  }
};

const routes = [
  {
    path: "/",
    name: "Intro",
    component: () => import("@/views/Intro.vue")
  },
  {
    path: "/DailyWriting",
    name: "DailyWriting",
    beforeEnter: requireAuth,
    component: () => import("@/views/DailyWriting.vue")
  },
  {
    path: "/Subject",
    name: "Subject",
    beforeEnter: requireAuth,
    component: () => import("@/views/Subject.vue")
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
