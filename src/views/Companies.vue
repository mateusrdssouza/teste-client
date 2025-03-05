<template>
  <div>
    <h1>Empresas</h1>

    <div class="pt-4">
      <CompanyTable
        :companies="companies"
        :current-page="currentPage"
        :total-pages="totalPages"
        :per-page="perPage"
        @page-change="onPageChange"
        @edit-company="openEditModal"
        @delete-company="openDeleteConfirmationModal"
      />
    </div>

    <div class="d-flex justify-center align-center pt-6">
      <v-btn size="x-large" variant="flat" color="#42b983" @click="openModal">
        Cadastrar empresa
      </v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            isEditMode ? "Editar Empresa" : "Cadastrar Empresa"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="formIsValid">
            <v-text-field
              v-model="newCompany.codigo"
              label="Código"
              required
              type="number"
              :min="1"
              :max="9999"
              step="1"
            ></v-text-field>

            <v-text-field
              v-model="newCompany.empresa"
              label="Empresa"
              required
              type="number"
              :min="1"
              :max="9999"
              step="1"
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
          <v-btn color="grey" @click="closeModal">Cancelar</v-btn>
          <v-btn
            color="success"
            :disabled="!formIsValid"
            @click="isEditMode ? updateCompany() : registerCompany()"
          >
            {{ isEditMode ? "Atualizar" : "Cadastrar" }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <CompanyDelete
      v-model="deleteConfirmationDialog"
      :company-id="deleteCompanyId"
      @delete-company="deleteCompany"
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
import CompanyDelete from "@/components/company/CompanyDelete.vue";
import CompanyTable from "@/components/company/CompanyTable.vue";
import { Company } from "@/types/company";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "CompaniesView",
  components: {
    CompanyTable,
    CompanyDelete,
  },
  setup() {
    const companies = ref<Company[]>([]);
    const deleteCompanyId = ref<number | null>(null);
    const deleteConfirmationDialog = ref(false);

    const dialog = ref(false);
    const formIsValid = ref(false);
    const isEditMode = ref(false);
    const newCompany = ref({
      recnum: 0,
      codigo: 0,
      empresa: 0,
      sigla: "",
      razao_social: "",
    });

    const currentPage = ref(1);
    const totalPages = ref(1);
    const perPage = ref(10);

    const fetchCompanies = async (page: number) => {
      try {
        const response = await api.get("/companies", {
          params: { page: page, per_page: perPage.value },
        });

        companies.value = response.data.data;
        totalPages.value = response.data.last_page;
        currentPage.value = page;
      } catch (error) {
        snackbar.value = {
          visible: true,
          color: "red",
          message: "Erro ao buscar empresas",
        };
      }
    };

    const onPageChange = (page: number) => {
      currentPage.value = page;
      fetchCompanies(page);
    };

    const openModal = () => {
      isEditMode.value = false;
      newCompany.value = {
        recnum: 0,
        codigo: 0,
        empresa: 0,
        sigla: "",
        razao_social: "",
      };
      dialog.value = true;
    };

    const openEditModal = (company: Company) => {
      isEditMode.value = true;
      newCompany.value = { ...company };
      dialog.value = true;
    };

    const closeModal = () => {
      dialog.value = false;
    };

    const openDeleteConfirmationModal = (company: Company) => {
      deleteCompanyId.value = company.recnum;
      deleteConfirmationDialog.value = true;
    };

    const closeDeleteConfirmationModal = () => {
      deleteCompanyId.value = null;
      deleteConfirmationDialog.value = false;
    };

    const registerCompany = async () => {
      if (formIsValid.value) {
        try {
          const companyData = {
            ...newCompany.value,
            codigo: Number(newCompany.value.codigo),
            empresa: Number(newCompany.value.empresa),
          };

          await api.post("/companies", companyData);
          fetchCompanies(currentPage.value);
          closeModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Empresa cadastrada com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao cadastrar empresa",
          };
        }
      }
    };

    const updateCompany = async () => {
      if (formIsValid.value) {
        try {
          const companyData = {
            ...newCompany.value,
            codigo: Number(newCompany.value.codigo),
            empresa: Number(newCompany.value.empresa),
          };

          await api.put(`/companies/${newCompany.value.recnum}`, companyData);
          fetchCompanies(currentPage.value);
          closeModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Empresa atualizada com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao atualizar empresa",
          };
        }
      }
    };

    const deleteCompany = async () => {
      if (deleteCompanyId.value) {
        try {
          await api.delete(`/companies/${deleteCompanyId.value}`);
          fetchCompanies(currentPage.value);
          closeDeleteConfirmationModal();

          snackbar.value = {
            visible: true,
            color: "green",
            message: "Empresa excluída com sucesso",
          };
        } catch (error) {
          snackbar.value = {
            visible: true,
            color: "red",
            message:
              error instanceof AxiosError
                ? error.response?.data?.message
                : "Erro ao excluir empresa",
          };
        }
      }
    };

    onMounted(() => {
      fetchCompanies(currentPage.value);
    });

    const snackbar = ref({ visible: false, color: "", message: "" });

    return {
      companies,
      currentPage,
      totalPages,
      perPage,
      fetchCompanies,
      onPageChange,
      dialog,
      formIsValid,
      newCompany,
      openModal,
      openEditModal,
      closeModal,
      registerCompany,
      updateCompany,
      snackbar,
      isEditMode,
      deleteCompany,
      closeDeleteConfirmationModal,
      deleteConfirmationDialog,
      openDeleteConfirmationModal,
      deleteCompanyId,
    };
  },
});
</script>
