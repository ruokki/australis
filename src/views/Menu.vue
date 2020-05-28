<template>
    <q-drawer bordered show-if-above content-class="bg-grey-2">
      <div class="row justify-center">
        <img id="logo" src="../assets/logo.png" />
      </div>
      <div class="row justify-center">
          <router-link class="col text-center text-h4" to="/">
            <q-icon name="home" />
          </router-link>
          <router-link class="col text-center text-h4" to="/">
            <q-icon name="search" />
          </router-link >
          <router-link class="col text-center text-h4" to="/">
            <q-icon name="exit_to_app" />
          </router-link >
      </div>
      <q-list separator>
          <q-item>
            <h5>Mon compte</h5>
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
      <h5>Médiathèque</h5>
      <q-list separator>
          <q-expansion-item 
              v-for="main in categories" 
              :key="main.id"
              :icon="main.icon"
              :label="main.name"
              group="media">
              <q-list separator>
                <q-item v-for="child in main.children" :key="child.id" clickable v-ripple>
                  <q-item-section>{{ child.name }}</q-item-section>
                </q-item>
              </q-list>
          </q-expansion-item>
      </q-list>
    </q-drawer>
</template>

<script>
export default {
  name: "Menu",

  data() {
    return {
      categories: [
        {
          name: "Audio",
          icon: "music_note",
          id: 1,
          children: [
             {
               name: "Album",
               id: 11
             },
             {
               name: "Audiobook",
               id: 12
             },
             {
               name: "Saga",
               id: 13
             },
          ]
        },
        {
          name: "Vidéo",
          icon: "movie",
          id: 2,
          children: [
             {
               name: "Série",
               id: 21
             },
             {
               name: "Anime",
               id: 22
             },
             {
               name: "Film",
               id: 23
             },
          ]
        },
        {
          name: "Livres",
          icon: "menu_book",
          id: 3,
          children: [
             {
               name: "Livre",
               id: 31
             },
             {
               name: "Comic",
               id: 32
             },
             {
               name: "Manga",
               id: 33
             },
             {
               name: "BD",
               id: 34
             },
          ]
        },
        {
          name: "Jeux",
          icon: "gamepad",
          id: 4,
          children: [
             {
               name: "Jeux vidéo",
               id: 41
             },
             {
               name: "Jeux de plateau",
               id: 42
             },
             {
               name: "Jeux de rôle",
               id: 43
             },
          ]
        }
      ]
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
