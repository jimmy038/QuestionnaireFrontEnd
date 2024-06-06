import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue"; //←←第一種匯入方式,有兩種匯入方式

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView, //←若使用第一種匯入方式,在component需要輸入上所需變數名稱
    },
    // {
    //   path: "/VtextAndVmodel",
    //   name: "VtextAndVmodel",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/VtextAndVmodel.vue"), //←第二種匯入方式,有兩種匯入方式,匯入VtextAndVmodel
    // },
    // {
    //   path: "/Vfor",
    //   name: "Vfor",
    //   component: () => import("../views/Vfor.vue"), //←第二種匯入方式,有兩種匯入方式,匯入Vfor
    // },
    // {
    //   path: "/Von",
    //   name: "Von",
    //   component: () => import("../views/Von.vue"), //匯入Von
    // },
    {
      path: "/Questionnaire", //問卷首頁
      name: "Questionnaire",
      component: () => import("../views/Questionnaire.vue"),
    },
    {
      path: "/answer", //前台作答頁面
      name: "answer",
      component: () => import("../views/Answer.vue"),
    },
    {
      path: "/Confirm", //前台確認頁
      name: "Confirm",
      component: () => import("../views/Confirm.vue"),
    },
    {
      path: "/Statistics", //問卷統計
      name: "Statistics",
      component: () => import("../views/Statistics.vue"),
    },
    {
      path: "/Backstage", //問卷後台
      name: "Backstage",
      component: () => import("../views/Backstage.vue"),
    },
    {
      path: "/Manage", //原新增頁面
      name: "Manage",
      component: () => import("../views/Manage.vue"),
    },
    {
      path: "/topic", //原新增頁面
      name: "topic",
      component: () => import("../views/topic.vue"),
    },
    {
      path: "/Create", //新增問卷
      name: "Create",
      component: () => import("../views/Create.vue"),
    },
  ],
});

export default router;
