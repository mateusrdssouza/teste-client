import { createVuetify } from "vuetify";
import {
  VAlert,
  VApp,
  VAppBar,
  VBtn,
  VCard,
  VCardActions,
  VCardItem,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VDataTable,
  VDialog,
  VForm,
  VMain,
  VPagination,
  VRow,
  VSnackbar,
  VTextField,
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
    VCardActions,
    VCardItem,
    VCardText,
    VCardTitle,
    VCol,
    VContainer,
    VDataTable,
    VDialog,
    VForm,
    VMain,
    VPagination,
    VRow,
    VSnackbar,
    VTextField,
    VToolbarTitle,
  },
  theme: {
    defaultTheme: "light",
  },
});

export default vuetify;
