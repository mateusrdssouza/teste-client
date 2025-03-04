<template>
  <div>
    <h1>Bem-vindo à API</h1>
    <p><router-link to="/companies">CRUD Empresas</router-link></p>
    <p><router-link to="/clients">CRUD Clientes</router-link></p>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView",
};
</script>
