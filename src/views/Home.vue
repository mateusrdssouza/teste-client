<template>
  <v-row class="d-flex justify-center ga-8 pt-8">
    <router-link to="/companies" class="link">
      <v-card>
        <v-card-item>
          <v-col class="d-flex flex-column align-center ga-1 pt-2">
            <svg :width="80" :height="80" fill="#A9A9A9" viewBox="0 0 24 24">
              <path :d="companyIcon" />
            </svg>

            <v-card-title class="title">Empresas</v-card-title>
          </v-col>
        </v-card-item>

        <v-card-text
          >Clique aqui para gerenciar as empresas do sistema</v-card-text
        >
      </v-card>
    </router-link>

    <router-link to="/clients" class="link">
      <v-card>
        <v-card-item>
          <v-col class="d-flex flex-column align-center ga-1 pt-2">
            <svg :width="80" :height="80" fill="#A9A9A9" viewBox="0 0 24 24">
              <path :d="clientIcon" />
            </svg>

            <v-card-title class="title">Clientes</v-card-title>
          </v-col>
        </v-card-item>

        <v-card-text
          >Clique aqui para gerenciar os clientes do sistema</v-card-text
        >
      </v-card>
    </router-link>
  </v-row>
</template>

<script lang="ts">
import { mdiAccountGroup, mdiDomain } from "@mdi/js";

export default {
  name: "HomeView",
  setup() {
    const companyIcon = mdiDomain;
    const clientIcon = mdiAccountGroup;

    return {
      companyIcon,
      clientIcon,
    };
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #42b983;
}
</style>
