<template>
    <q-drawer bordered show-if-above content-class="bg-grey-2">
      <div class="row justify-center">
        <img id="logo" src="../assets/logo.png" />
      </div>
      <div>
          <q-btn-group spread flat>
            <q-btn class="col text-center" size="lg" icon="home" to="/" />
            <q-btn class="col text-center" size="lg" icon="search" to="/" />
            <q-btn class="col text-center" size="lg" icon="exit_to_app" to="/" />
          </q-btn-group>
      </div>
      <q-list separator>
          <q-item>
            <h5>Mon compte</h5>
          </q-item>
          <q-expansion-item 
              icon="storage"
              label="Ma réserve"
              group="account">
              <q-list separator>
                <q-item to="/category/mine" clickable v-ripple>
                  <q-item-section>Mes items</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Créer un item</q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>Créer une collection</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="favorite" />
            </q-item-section>
            <q-item-section>Ma wishlist</q-item-section>
          </q-item>
          <q-item to="/borrow/borrower" clickable>
            <q-item-section avatar>
              <q-icon name="pan_tool" />
            </q-item-section>
            <q-item-section>Mes emprunts</q-item-section>
          </q-item>
          <q-expansion-item 
              icon="work"
              label="Prêts"
              group="account">
              <q-list separator>
                <q-item to="/borrow/lender" clickable v-ripple>
                  <q-item-section>Prêts en cours</q-item-section>
                </q-item>
                <q-item to="/borrow/oldLent" clickable v-ripple>
                  <q-item-section>Historique des prêts</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>
            <q-item-section>Administration</q-item-section>
          </q-item>
      </q-list>
      <h5>Médiathèque</h5>
      <q-list separator>
          <q-expansion-item 
              v-for="main in categories" 
              :key="main.category_id"
              :icon="main.category_icon"
              :label="main.category_name"
              group="account">
              <q-list separator>
                <q-item v-for="child in main.children" :key="child.category_id" :to="'/category/' + main.category_id + '/' + child.category_id" clickable v-ripple>
                  <q-item-section>{{ child.category_name }}</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
      </q-list>
    </q-drawer>
</template>

<script>
export default {
  name: "Menu",
  computed: {
    categories() {
      return this.$store.getters.getAllCategories;
    }
  },
  data() {
    return {
      
    };
  }
};
</script>

<style>
h5 {
  margin: 10px;
}

#logo {
  width: 50%;
  margin: 10px;
}
</style>
