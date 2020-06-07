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
            <ItemList :items="allItems" />
        </div>
    </q-page>
</template>
<script>
import ItemList from './ItemList.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: "Category",
    props: [
        'main',
        'sub'
    ],
    computed: {
        ...mapGetters([
            'getCategory',
            'getSubCategory',
            'getAPI'
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
            icon: "",
            allItems: []
        };
    },
    methods: {
        updateCategory: function() {
            if(this.main == 'mine') {
                this.icon = 'account_balance';
                axios.get(this.getAPI + '/category/mine')
                    .then(this.setItem);
            }
            else {
                let category = this.getCategory(this.main);
                this.mainName = category.category_name;
                this.icon = category.category_icon;
    
                let sub = this.getSubCategory(this.main, this.sub);
                this.subName = sub.category_name;

                axios.get(this.getAPI + '/category/' + sub.category_id)
                    .then(this.setItem);

            }
        },
        setItem: function(response){
            this.allItems = response.data;
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