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
import axios from 'axios';

export default {
  name: "App",

  components: {
    Menu
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
    axios.get('http://localhost/dev/arctica/public/index.php/getCategories')
      .then(this.updateCategories);
  }
};
</script>

<style>

</style>
