<template>
    <q-page class="column">
        <q-toolbar class="bg-primary text-white">
             <q-avatar>
                <q-icon :name="icon" />
            </q-avatar>
            <q-toolbar-title>{{ mainName }} - {{ subName }}</q-toolbar-title>
            <q-btn flat round dense icon="search" class="q-mr-xs" />
        </q-toolbar>
        <div class="container q-pa-md row">
            <ItemList />
        </div>
    </q-page>
</template>
<script>
import ItemList from './ItemList.vue';

export default {
    name: "Category",
    props: [
        'main',
        'sub'
    ],
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
            let category = this.$store.getters.getCategory(this.main);
            this.mainName = category.name;
            this.icon = category.icon;

            let sub;
            for(var i in category.children) {
                sub = category.children[i];
                if(sub.id == this.sub) {
                    this.subName = sub.name;
                    break;
                }
            }

            /**
             * @TODO Récupération des items correspondants à la catégorie/sous catégorie sélectionnés
             * @param Catégorie principale main
             * @param Catégorie enfante sub
             */
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