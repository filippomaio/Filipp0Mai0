<template>
  <v-layout row justify-center>
    <v-dialog
      v-model="loading"
      persistent
      fullscreen
      content-class="loading-dialog"
    >
      <v-container fill-height>
        <v-layout row justify-center align-center>
          <img v-bind:src="require('../assets/pokeball.gif')">
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "loading",
  props: { loading: Boolean }
};
</script>

<style>
.loading-dialog {
  background-color: #191919;
  opacity: 0.5;
}
td.img-table {
  cursor: pointer;
  user-select: none;
}
</style>