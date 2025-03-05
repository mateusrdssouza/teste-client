<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Confirmar Exclusão</span>
      </v-card-title>
      <v-card-text>
        Você tem certeza que deseja excluir este cliente?<br />
        Essa operação não poderá ser desfeita
      </v-card-text>
      <v-card-actions>
        <v-btn color="grey" @click="closeDialog">Cancelar</v-btn>
        <v-btn color="red" @click="confirmDelete">Excluir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ClientDelete",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    clientId: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:modelValue", "delete-client"],
  setup(props, { emit }) {
    const dialog = computed({
      get() {
        return props.modelValue;
      },
      set(value: boolean) {
        emit("update:modelValue", value);
      },
    });

    const closeDialog = () => {
      dialog.value = false;
    };

    const confirmDelete = () => {
      emit("delete-client", props.clientId);
      closeDialog();
    };

    return {
      dialog,
      closeDialog,
      confirmDelete,
    };
  },
});
</script>
