<template>
    <q-page class="column">
        <q-toolbar class="bg-primary text-white">
             <q-avatar>
                <q-icon :name="icon" />
            </q-avatar>
            <q-toolbar-title>{{ fullCategory }}</q-toolbar-title>
            <q-btn flat round dense icon="search" class="q-mr-xs" />
        </q-toolbar>
        <div class="container q-pa-md row">
            <ItemList />
        </div>
    </q-page>
</template>
<script>
import ItemList from './ItemList.vue';
import { mapGetters } from 'vuex';

export default {
    name: "Category",
    props: [
        'main',
        'sub'
    ],
    computed: {
        ...mapGetters([
            'getCategory',
            'getSubCategory'
        ]),
        fullCategory: function() {
            if(this.main == 'mine') {
                return 'Mes items';
            }
            else {
                return this.mainName + " - " + this.subName;
            }
        }
    },
    components: {
        ItemList
    },
    data() {
        return {
            mainName: "main",
            subName: "sub",
            icon: ""
        };
    },
    methods: {
        updateCategory: function() {
            if(this.main == 'mine') {
                this.icon = 'account_balance';
                /**
                 * @TODO Récupération des items de l'utilisateur
                 * @param Catégorie principale main
                 */
            }
            else {
                let category = this.getCategory(this.main);
                this.mainName = category.category_name;
                this.icon = category.category_icon;
    
                let sub = this.getSubCategory(this.main, this.sub);
                this.subName = sub.category_name;

                /**
                 * @TODO Récupération des items correspondants à la catégorie/sous catégorie sélectionnés
                 * @param Catégorie principale main
                 * @param Catégorie enfante sub
                 */
            }

        }
    },
    watch: {
        'main': function() {
            this.updateCategory();
        },
        'sub': function() {
            this.updateCategory();
        },
    },
    mounted() {
        this.updateCategory();
    }
}
</script>
<style lang="scss" scoped>
.list-item, .container {
    flex: 1;
}
</style>