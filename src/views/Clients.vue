<template>
  <div>
    <h1>Clientes</h1>

    <div class="pt-4">
      <ClientTable
        :clients="clients"
        :current-page="currentPage"
        :total-pages="totalPages"
        :per-page="perPage"
        @page-change="onPageChange"
        @edit-client="openEditModal"
        @delete-client="openDeleteConfirmationModal"
      />
    </div>

    <div class="d-flex justify-center align-center pt-6">
      <v-btn size="x-large" variant="flat" color="#42b983" @click="openModal">
        Cadastrar cliente
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isEditMode ? "Editar Cliente" : "Cadastrar Cliente"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formIsValid">
            <v-text-field
              v-model="newClient.empresa"
              label="Código da Empresa"
              required
              type="number"
              :min="1"
              :max="9999"
              step="1"
            ></v-text-field>

            <v-text-field
              v-model="newClient.codigo"
              label="Código do Cliente"
              required
              type="number"
              :min="1"
              :max="99999999999999"
              step="1"
            ></v-text-field>

            <v-text-field
              v-model="newClient.razao_social"
              label="Razão Social"
              required
            ></v-text-field>

            <v-text-field
              v-model="newClient.tipo"
              label="Tipo"
              required
            ></v-text-field>

            <v-text-field
              v-model="newClient.cpf_cnpj"
              label="CPF / CNPJ"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="closeModal">Cancelar</v-btn>
          <v-btn
            color="success"
            :disabled="!formIsValid"
            @click="isEditMode ? updateClient() : registerClient()"
          >
            {{ isEditMode ? "Atualizar" : "Cadastrar" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ClientDelete
      v-model="deleteConfirmationDialog"
      :client-id="deleteClientId"
      @delete-client="deleteClient"
    />

    <v-snackbar
      v-model="snackbar.visible"
      :timeout="3000"
      :color="snackbar.color"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import ClientDelete from "@/components/client/ClientDelete.vue";
import ClientTable from "@/components/client/ClientTable.vue";
import { Client } from "@/types/client";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "ClientsView",
  components: {
    ClientTable,
    ClientDelete,
  },
  setup() {
    const clients = ref<Client[]>([]);
    const deleteClientId = ref<number>(0);
    const deleteConfirmationDialog = ref(false);

    const dialog = ref(false);
    const formIsValid = ref(false);
    const isEditMode = ref(false);
    const newClient = ref({
      recnum: 0,
      empresa: 0,
      codigo: 0,
      razao_social: "",
      tipo: "",
      cpf_cnpj: "",
    });

    const currentPage = ref(1);
    const totalPages = ref(1);
    const perPage = ref(10);

    const fetchClients = async (page: number) => {
      try {
        const response = await api.get("/clients", {
          params: { page: page, per_page: perPage.value },
        });

        clients.value = response.data.data;
        totalPages.value = response.data.last_page;
        currentPage.value = page;
      } catch (error) {
        snackbar.value = {
          visible: true,
          color: "red",
          message: "Erro ao buscar clientes",
        };
      }
    };

    const onPageChange = (page: number) => {
      currentPage.value = page;
      fetchClients(page);
    };

    const openModal = () => {
      isEditMode.value = false;
      newClient.value = {
        recnum: 0,
        empresa: 0,
        codigo: 0,
        razao_social: "",
        tipo: "",
        cpf_cnpj: "",
      };
      dialog.value = true;
    };

    const openEditModal = (client: Client) => {
      isEditMode.value = true;
      newClient.value = { ...client };
      dialog.value = true;
    };

    const closeModal = () => {
      dialog.value = false;
    };

    const openDeleteConfirmationModal = (client: Client) => {
      deleteClientId.value = client.recnum;
      deleteConfirmationDialog.value = true;
    };

    const closeDeleteConfirmationModal = () => {
      deleteClientId.value = 0;
      deleteConfirmationDialog.value = false;
    };

    const registerClient = async () => {
      if (formIsValid.value) {
        try {
          const clientData = {
            ...newClient.value,
            codigo: Number(newClient.value.codigo),
            empresa: Number(newClient.value.empresa),
          };

          await api.post("/clients", clientData);
          fetchClients(currentPage.value);
          closeModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Cliente cadastrado com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao cadastrar cliente",
          };
        }
      }
    };

    const updateClient = async () => {
      if (formIsValid.value) {
        try {
          const clientData = {
            ...newClient.value,
            codigo: Number(newClient.value.codigo),
            empresa: Number(newClient.value.empresa),
          };

          await api.put(`/clients/${newClient.value.recnum}`, clientData);
          fetchClients(currentPage.value);
          closeModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Cliente atualizado com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao atualizar cliente",
          };
        }
      }
    };

    const deleteClient = async () => {
      if (deleteClientId.value) {
        try {
          await api.delete(`/clients/${deleteClientId.value}`);
          fetchClients(currentPage.value);
          closeDeleteConfirmationModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Cliente excluído com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao excluir cliente",
          };
        }
      }
    };

    onMounted(() => {
      fetchClients(currentPage.value);
    });

    const snackbar = ref({ visible: false, color: "", message: "" });

    return {
      clients,
      currentPage,
      deleteClientId,
      deleteConfirmationDialog,
      dialog,
      formIsValid,
      isEditMode,
      newClient,
      perPage,
      snackbar,
      totalPages,
      closeModal,
      deleteClient,
      onPageChange,
      openDeleteConfirmationModal,
      openEditModal,
      openModal,
      registerClient,
      updateClient,
    };
  },
});
</script>
