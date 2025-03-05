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

    const fetchCompanies = async (page: number) => {
      try {
        const response = await api.get("/companies", {
          params: { page: page, per_page: perPage.value },
        });

        companies.value = response.data.data;
        totalPages.value = response.data.last_page;
        totalRecords.value = response.data.total;
        currentPage.value = page;
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
      }
    };

    const onPageChange = (page: number) => {
      fetchCompanies(page);
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
