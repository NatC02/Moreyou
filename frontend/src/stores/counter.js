import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "toast",
  state: () => ({
    ms: 0,
    message: "",
    classes: "",
    isVisible: false,
  }),

  actions: {
    showToast(ms, message, classes) {
      this.ms = parseInt(ms);
      this.message = message;
      this.classes = classes;
      this.isVisible = true;

      setTimeout(() => {
        this.classes += "-translate-y-28";
      }, 10);
    },
  },
});