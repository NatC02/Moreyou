import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", () => {
  const ms = 0;
  const message = "";
  const classes = "";
  const isVisible = "false";

  setTimeout(() => {
    this.classes += "-translate-y-28";
  }, 10);

  setTimeout(() => {
    this.classes = this.classes.replace("-translate-y-28", "");
  }, this.ms - 500);

  setTimeout(() => {
    this.isVisible = false;
  }, this.ms);
});