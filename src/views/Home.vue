<template>
  <q-page class="q-pa-md column">
    <!-- Première ligne : Chart et Répartition de la médiathèque -->
    <div class="row q-gutter-x-md">
      <div class="col">Mon joli chart</div>
      <div class="col">
          <q-card class="bg-primary">
            <q-card-section>
              <div class="text-h6 text-center">Ma médiathèque</div>
            </q-card-section>
            <q-tabs
              v-model="tab"
              dense
              active-color="white"
              indicator-color="white"
              align="justify"
              narrow-indicator
            >
              <q-tab v-for="one in categories" :key="one.category_id" :name="one.category_name" :label="one.category_name" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel v-for="one in categories" :key="one.category_id" :name="one.category_name">
                 <q-list dense>
                   <q-item v-for="sub in one.children" :key="sub.category_id">
                      <q-item-section>{{ sub.category_name }}</q-item-section>
                      <q-item-section class="text-center">
                        {{ itemsBySub[sub.category_id] ? itemsBySub[sub.category_id] : 0 }}
                      </q-item-section>
                   </q-item>
                 </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
      </div>
    </div>

    <!-- Deuxième ligne : Liste des dernières demandes et des emprunts en cours -->
    <div class="row q-gutter-x-md">
      <div class="col">
        <q-table
          title="Demandes en attente"
          dense
          :data="lends"
          :columns="lendCols"
          row-key="borrow_id"
        >
          <template v-slot:bottom></template>
        </q-table>
      </div>
      <div class="col">
        <q-table
          title="Emprunts en cours"
          dense
          :data="borrows"
          :columns="borrowCols"
          row-key="borrow_id"
        >
          <template v-slot:bottom></template>
        </q-table>
      </div>
    </div>

    <!-- Troisième ligne : Liste des derniers items récupérés -->
    <div id="list" class="row">
        <ItemList />
    </div>
  </q-page>
</template>

<script>
import moment from 'moment';
import ItemList from './ItemList.vue';

export default {
  name: 'Home',
  components: {
    ItemList
  },
  computed: {
    categories() {
      return this.$store.getters.getAllCategories;
    }
  },
  beforeMount() {
    this.tab = this.categories.length > 0 && Array.isArray(this.categories) ? Array.from(this.categories)[0].category_name : "";
  },
  data() {
    return {
      tab: "",
      itemsBySub: {
        11: 8,
        12: 5,
        13: 2,
        21: 5,
        22: 8,
        23: 12
      },

      // Définition des tableaux
      lendCols: [
        { name: "item", label: "Item", field: "item_name"  },
        { name: "lender", label: "Possesseur", field: "user_name"  },
        { name: "duration", label: "Durée", field: "borrow_duration", format: (val) =>  val + " jour" + (val > 1 ? "s" : "" ) },
      ],
      borrowCols: [
        { name: "item", label: "Item", field: "item_name"  },
        { name: "lender", label: "Possesseur", field: "user_name"  },
        { name: "end", label: "Fin", field: "borrow_date_end", format: (val) => moment(val).format('DD/MM/YYYY') }
      ],

      // Data des tableaux
      lends: [
        {
          borrow_id: 1,
          item_name: "Truc du truc",
          user_name: "Jean Michel",
          borrow_duration: 20
        },
        {
          borrow_id: 2,
          item_name: "Album de truc",
          user_name: "Jean Guy",
          borrow_duration: 10
        },
        {
          borrow_id: 3,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 20
        },
        {
          borrow_id: 4,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 20
        },
        {
          borrow_id: 5,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_duration: 1
        }
      ],
      borrows: [
        {
          borrow_id: 1,
          item_name: "Truc du truc",
          user_name: "Jean Michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 2,
          item_name: "Album de truc",
          user_name: "Jean Guy",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 3,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 4,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
        {
          borrow_id: 5,
          item_name: "Truc du truc",
          user_name: "Jean michel",
          borrow_date_end: new Date()
        },
      ],
    }
  }
}
</script>
<style lang="scss" scoped>
.row {
  flex: 1;
}

#list {
  flex: 3;
}
</style>