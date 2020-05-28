<template>
  <q-layout view="lHh Lpr lFf">
    <Menu />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from './views/Menu.vue';

export default {
  name: "App",

  components: {
    Menu
  },

  data() {
    return {
    };
  }
};
</script>

<style>

</style>
