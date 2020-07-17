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
    updateCategories(data) {
      this.$store.dispatch('setCategories', data); 
    }
  },
  data() {
    return {
    };
  },
  created() {
    this.$api.url('category/all')
      .success(this.updateCategories)
      .send();
  }
};
</script>

<style>

</style>
