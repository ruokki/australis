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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters([
      'getAPI'
    ])
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
