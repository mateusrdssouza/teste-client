<template>
  <div>
    <h1>Empresas</h1>

    <div v-if="companies.length" class="pt-4">
      <v-data-table
        :headers="headers"
        :items="companies"
        item-key="recnum"
        :items-per-page="perPage"
        class="table"
      >
      </v-data-table>

      <v-pagination
        v-model:model-value="currentPage"
        :length="totalPages"
        @update:model-value="onPageChange"
        :total-visible="5"
      ></v-pagination>
    </div>

    <div v-if="!companies.length" class="pt-4 d-flex justify-center">
      <v-alert
        text="Nenhuma empresa cadastrada"
        type="info"
        variant="tonal"
        class="text-center"
      ></v-alert>
    </div>

    <div class="d-flex justify-center align-center pt-6">
      <v-btn size="x-large" variant="flat" color="#42b983" @click="openModal">
        Cadastrar empresa
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Cadastrar Empresa</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formIsValid">
            <v-text-field
              v-model="newCompany.codigo"
              label="Código"
              required
            ></v-text-field>
            <v-text-field
              v-model="newCompany.empresa"
              label="Empresa"
              required
            ></v-text-field>
            <v-text-field
              v-model="newCompany.sigla"
              label="Sigla"
              required
            ></v-text-field>
            <v-text-field
              v-model="newCompany.razao_social"
              label="Razão Social"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeModal" color="grey">Cancelar</v-btn>
          <v-btn
            @click="registerCompany"
            :disabled="!formIsValid"
            color="success"
            >Cadastrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.visible" :timeout="3000" color="red" top>
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { Company } from "@/types/company";
import api from "@/utils/axios";
import { onMounted, ref } from "vue";

export default {
  name: "CompaniesView",
  setup() {
    const companies = ref<Company[]>([]);

    const dialog = ref(false);
    const formIsValid = ref(false);
    const newCompany = ref({
      codigo: "",
      empresa: "",
      sigla: "",
      razao_social: "",
    });

    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalRecords = ref(0);
    const perPage = ref(10);

    const headers = [
      { title: "ID", key: "recnum" },
      { title: "Código", key: "codigo" },
      { title: "Empresa", key: "empresa" },
      { title: "Sigla", key: "sigla" },
      { title: "Razão Social", key: "razao_social" },
    ];

    const snackbar = ref({
      visible: false,
      message: "",
    });

    const fetchCompanies = async (page: number) => {
      try {
        const response = await api.get("/companies", {
          params: { page: page, per_page: perPage.value },
        });

        companies.value = response.data.data;
        totalPages.value = response.data.last_page;
        totalRecords.value = response.data.total;
        currentPage.value = page;
      } catch (error: any) {
        snackbar.value = {
          visible: true,
          message: "Erro ao buscar empresas",
        };
      }
    };

    const onPageChange = (page: number) => {
      fetchCompanies(page);
    };

    const openModal = () => {
      dialog.value = true;
    };

    const closeModal = () => {
      dialog.value = false;
    };

    const registerCompany = async () => {
      if (formIsValid.value) {
        try {
          await api.post("/companies", newCompany.value);
          fetchCompanies(currentPage.value);
          closeModal();

          newCompany.value = {
            codigo: "",
            empresa: "",
            sigla: "",
            razao_social: "",
          };
        } catch (error: any) {
          snackbar.value = {
            visible: true,
            message:
              error.response?.data?.message || "Erro ao cadastrar empresa",
          };
        }
      }
    };

    onMounted(() => {
      fetchCompanies(currentPage.value);
    });

    return {
      companies,
      currentPage,
      totalPages,
      totalRecords,
      perPage,
      headers,
      fetchCompanies,
      onPageChange,
      dialog,
      formIsValid,
      newCompany,
      openModal,
      closeModal,
      registerCompany,
      snackbar,
    };
  },
};
</script>

<style scoped>
.table >>> thead {
  background-color: #42b983 !important;
  color: white !important;
}
</style>
