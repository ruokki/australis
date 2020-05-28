<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer bordered show-if-above content-class="bg-grey-2">
      <div class="row justify-center">
          <img id="logo" src="./assets/logo.png" />
        </div>
        <div class="row justify-center">
            <div class="col text-center text-h4">
              <q-icon name="home" />
            </div>
            <div class="col text-center text-h4">
              <q-icon name="search" />
            </div>
            <div class="col text-center text-h4">
              <q-icon name="exit_to_app" />
            </div>
        </div>
        <q-list separator>
            <q-item>
              <h4>Mon compte</h4>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="storage" />
              </q-item-section>
              <q-item-section>Ma collection</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="favorite" />
              </q-item-section>
              <q-item-section>Ma wishlist</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="pan_tool" />
              </q-item-section>
              <q-item-section>Mes emprunts</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="work" />
              </q-item-section>
              <q-item-section>Prêts</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="verified_user" />
              </q-item-section>
              <q-item-section>Administration</q-item-section>
            </q-item>
        </q-list>
        <q-separator spaced />
        <h4>Médiathèque</h4>
        <q-list separator>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="music_note" />
              </q-item-section>
              <q-item-section>Audio</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="movie" />
              </q-item-section>
              <q-item-section>Vidéo</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="menu_book" />
              </q-item-section>
              <q-item-section>Livre</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon name="gamepad" />
              </q-item-section>
              <q-item-section>Jeux</q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LayoutDefault",

  components: {},

  data() {
    return {
      
    };
  }
};
</script>

<style>
h4 {
  margin: 10px;
}

#logo {
  width: 50%;
  margin: 10px;
}
</style>
