import { createVuetify } from "vuetify";
import {
  VApp,
  VAppBar,
  VCard,
  VCardItem,
  VCardText,
  VCardTitle,
  VCol,
  VContainer,
  VMain,
  VRow,
  VToolbarTitle,
} from "vuetify/components";
import "vuetify/styles";

const vuetify = createVuetify({
  components: {
    VApp,
    VAppBar,
    VCard,
    VCardItem,
    VCardText,
    VCardTitle,
    VCol,
    VContainer,
    VMain,
    VRow,
    VToolbarTitle,
  },
  theme: {
    defaultTheme: "light",
  },
});

export default vuetify;
