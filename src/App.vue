<template>
  <q-layout view="lHh Lpr lFf">
    <Menu />
    <Connect />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Menu from './views/Menu.vue';
import Connect from './views/Connect.vue';

export default {
  name: "App",

  components: {
    Menu,
    Connect
  },
  methods: {
    updateCategories(response) {
      this.$store.dispatch('setCategories', response.data); 
    }
  },
  data() {
    return {
    };
  },
  created() {
    this.$api.get('/category/all')
      .then(this.updateCategories);
  }
};
</script>

<style>

</style>
