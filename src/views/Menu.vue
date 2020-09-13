<template>
    <q-drawer bordered show-if-above content-class="bg-grey-2">
      <q-banner class="bg-grey-2">
        <template v-slot:avatar>
          <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" height="40px">
        </template>
        <div class="text-h6">Penguin Possess</div>
      </q-banner>
      <div>
          <q-btn-group spread flat>
            <q-btn class="text-center" size="lg" icon="home" to="/" />
            <q-btn class="text-center" size="lg" icon="search" to="/" />
            <q-btn class="text-center" size="lg" icon="exit_to_app" @click="logout" />
          </q-btn-group>
      </div>
      <q-list separator>
          <q-item>
            <h5>{{ $getTexts('account') }}</h5>
          </q-item>
          <q-expansion-item 
              icon="storage"
              :label="$getTexts('userItems').main"
              group="account">
              <q-list separator>
                <q-item to="/category/mine" clickable v-ripple>
                  <q-item-section>{{ $getTexts('userItems').list }}</q-item-section>
                </q-item>
                <q-item to="/create/item" clickable v-ripple>
                  <q-item-section>{{ $getTexts('userItems').createOne }}</q-item-section>
                </q-item>
                <q-item to="/create/collection" clickable v-ripple>
                  <q-item-section>{{ $getTexts('userItems').createMulti }}</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="favorite" />
            </q-item-section>
            <q-item-section>{{ $getTexts('desiredItems') }}</q-item-section>
          </q-item>
          <q-item to="/borrow/borrower" clickable>
            <q-item-section avatar>
              <q-icon name="pan_tool" />
            </q-item-section>
            <q-item-section>{{ $getTexts('borrow') }}</q-item-section>
          </q-item>
          <q-expansion-item 
              icon="work"
              :label="$getTexts('lent').main"
              group="account">
              <q-list separator>
                <q-item to="/borrow/lender" clickable v-ripple>
                  <q-item-section>{{ $getTexts('lent').running }}</q-item-section>
                </q-item>
                <q-item to="/borrow/oldLent" clickable v-ripple>
                  <q-item-section>{{ $getTexts('lent').histo }}</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="verified_user" />
            </q-item-section>
            <q-item-section>{{ $getTexts('admin') }}</q-item-section>
          </q-item>
      </q-list>
      <h5>{{ $getTexts('allItems') }}</h5>
      <q-list separator>
        <q-item clickable to="/search">
            <q-item-section avatar>
              <q-icon name="location_searching" />
            </q-item-section>
            <q-item-section>{{ $getTexts('searchItems') }}</q-item-section>
          </q-item>
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
import { mapActions } from 'vuex'

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
  },
  methods: {
    ...mapActions([
        'setToken',
        'setMe'
    ]),
    logout: function() {
      this.$api.url('user/logout').send();
      this.setToken(null);
      this.setMe(null);
    }
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
