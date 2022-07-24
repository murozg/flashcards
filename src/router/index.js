import { createRouter, createWebHistory } from "vue-router";
import MyClasses from "../views/MyClasses";
import MyDecks from "../views/MyDecks";
import MyCards from "../views/MyCards";
import LetsGo from "../views/LetsGo";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Classes",
      component: MyClasses,
      meta: {
        transitionName: "slide-right",
      },
    },
    {
      path: "/class/:id",
      name: "Decks",
      component: MyDecks,
      props: true,
      meta: {
        transitionName: "slide-right",
      },
    },
    {
      path: "/class/:x/deck/:id",
      name: "Cards",
      component: MyCards,
      props: true,
      meta: {
        transitionName: "slide-right",
      },
    },
    {
      path: "/class/:x/deck/:id/letsgo/",
      name: "LetsGo",
      component: LetsGo,
      props: true,
      meta: {
        transitionName: "slide-left",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
});
router.beforeEach((to, from) => {
  const toDepth = to.path.split("/").length;
  const fromDepth = from.path.split("/").length;
  from.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
});
export default router;
