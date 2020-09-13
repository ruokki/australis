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
            'getToken'
        ]),
        fullCategory: function() {
            if(this.main == 'mine') {
                return this.$getTexts('userItems', 'Menu').list;
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
            let category;
            let sub;
            if(this.main != "mine") {
                category = this.getCategory(this.main);
                this.mainName = category.category_name;
                this.icon = category.category_icon;
    
                sub = this.getSubCategory(this.main, this.sub);
                this.subName = sub.category_name;
            }

            if(this.$store.getters.getToken !== null) {
                if(this.main == 'mine') {
                    this.icon = 'account_balance';
                    this.$api.url('category/mine')
                        .success(this.setItem)
                        .send();
                }
                else {
                    this.$api.url('category/' + sub.category_id)
                        .success(this.setItem)
                        .send();
                }
            }
        },
        setItem: function(data){
            this.allItems = data;
        }
    },
    watch: {
        'main': function() {
            this.updateCategory();
        },
        'sub': function() {
            this.updateCategory();
        },
        'getToken': function(newVal, oldVal) {
            if(oldVal === null) {
                this.updateCategory();
            }
        }
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