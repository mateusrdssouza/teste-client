import { createVuetify } from "vuetify";
import {
  VAlert,
  VApp,
  VAppBar,
  VBtn,
  VCard,
  VCardItem,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDataTable,
  VMain,
  VPagination,
  VRow,
  VToolbarTitle,
} from "vuetify/components";
import "vuetify/styles";

const vuetify = createVuetify({
  components: {
    VAlert,
    VApp,
    VAppBar,
    VBtn,
    VCard,
    VCardItem,
    VCardText,
    VCardTitle,
    VCol,
    VContainer,
    VDataTable,
    VMain,
    VPagination,
    VRow,
    VToolbarTitle,
  },
  theme: {
    defaultTheme: "light",
  },
});

export default vuetify;
