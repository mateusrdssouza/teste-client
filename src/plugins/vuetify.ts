import { createVuetify } from "vuetify";
import {
  VApp,
  VAppBar,
  VCard,
  VCardItem,
  VCardText,
  VCardTitle,
  VContainer,
  VMain,
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
    VContainer,
    VMain,
    VToolbarTitle,
  },
  theme: {
    defaultTheme: "light",
  },
});

export default vuetify;
