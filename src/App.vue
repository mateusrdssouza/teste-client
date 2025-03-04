<template>
  <v-app>
    <v-app-bar app>
      <v-row class="w-100 align-center d-flex ga-4 pl-4">
        <v-col>
          <router-link to="/" class="link"
            ><v-toolbar-title>Início</v-toolbar-title></router-link
          >
        </v-col>

        <v-col class="d-flex align-center">
          <span>|</span>
        </v-col>

        <v-col class="d-flex ga-4">
          <router-link to="/companies" class="link">Empresas</router-link>
          <router-link to="/clients" class="link">Clientes</router-link>
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

export default defineComponent({
  name: "App",
});
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}
</style>
