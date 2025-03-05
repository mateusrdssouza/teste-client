import Clients from "@/views/Clients.vue";
import Companies from "@/views/Companies.vue";
import Home from "@/views/Home.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Início",
    component: Home,
  },
  {
    path: "/companies",
    name: "Empresas",
    component: Companies,
  },
  {
    path: "/clients",
    name: "Clientes",
    component: Clients,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
