<template>
  <v-data-table
    v-if="clients.length"
    :headers="headers"
    :items="clients"
    item-key="recnum"
    :items-per-page="perPage"
    class="table"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <div class="d-flex ga-2">
        <v-btn color="blue" small @click="openEditModal(item)">
          <svg :width="24" :height="24" fill="#FFFFFF" viewBox="0 0 24 24">
            <path :d="updateIcon" />
          </svg>
        </v-btn>

        <v-btn color="red" small @click="openDeleteConfirmationModal(item)">
          <svg :width="24" :height="24" fill="#FFFFFF" viewBox="0 0 24 24">
            <path :d="deleteIcon" />
          </svg>
        </v-btn>
      </div>
    </template>
  </v-data-table>

  <v-pagination
    v-if="clients.length"
    :length="totalPages"
    :total-visible="5"
    :model-value="currentPage"
    @update:model-value="onPageChange"
  ></v-pagination>

  <div v-if="!clients.length" class="pt-4 d-flex justify-center">
    <v-alert
      text="Nenhum cliente cadastrado"
      type="info"
      variant="tonal"
      class="text-center"
    ></v-alert>
  </div>
</template>

<script lang="ts">
import { Client } from "@/types/client";
import { mdiDelete, mdiPencil } from "@mdi/js";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ClientTable",
  props: {
    clients: {
      type: Array as () => Client[],
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
  },
  emits: ["page-change", "edit-client", "delete-client"],
  setup(props, { emit }) {
    const updateIcon = mdiPencil;
    const deleteIcon = mdiDelete;

    const headers = [
      { title: "ID", key: "recnum" },
      { title: "Empresa", key: "empresa" },
      { title: "Código", key: "codigo" },
      { title: "Razão Social", key: "razao_social" },
      { title: "Tipo", key: "tipo" },
      { title: "Documento", key: "cpf_cnpj" },
      { title: "Ações", key: "actions" },
    ];

    const onPageChange = (page: number) => {
      emit("page-change", page);
    };

    const openEditModal = (client: Client) => {
      emit("edit-client", client);
    };

    const openDeleteConfirmationModal = (client: Client) => {
      emit("delete-client", client);
    };

    return {
      headers,
      deleteIcon,
      updateIcon,
      onPageChange,
      openDeleteConfirmationModal,
      openEditModal,
    };
  },
});
</script>

<style scoped>
.table >>> thead {
  background-color: #42b983 !important;
  color: white !important;
}
</style>
