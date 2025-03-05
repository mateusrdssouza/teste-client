<template>
  <v-app>
    <v-app-bar app>
      <v-row class="w-100 align-center d-flex ga-4 pl-6">
        <router-link to="/" class="link">
          <v-toolbar-title :class="{ 'font-weight-bold': isActiveRoute('/') }"
            >Início</v-toolbar-title
          >
        </router-link>

        <span>|</span>

        <v-col class="d-flex ga-4">
          <router-link
            to="/companies"
            :class="{ 'font-weight-bold': isActiveRoute('/companies') }"
            class="link"
          >
            Empresas
          </router-link>
          <router-link
            to="/clients"
            :class="{ 'font-weight-bold': isActiveRoute('/clients') }"
            class="link"
          >
            Clientes
          </router-link>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container class="pa-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "App",
  setup() {
    const route = useRoute();

    const isActiveRoute = (path: string) => {
      return route.path === path;
    };

    return { isActiveRoute };
  },
});
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}

.font-weight-bold {
  font-weight: bold;
  color: #42b983;
}
</style>
