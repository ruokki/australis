<template>
    <q-page id="page">
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>
                {{ item.item_name }}
            </q-toolbar-title>
            <ItemAction :item="item" @update="updateItem" :button="true" :borrow="true" />
        </q-toolbar>
        <div id="info" class="row q-pa-sm">
            <div class="col-4 row justify-center items-center">
                <img :src="item.item_img" style="max-height: 100%; max-width: 100%;" />
            </div>
            <div class="col-8 q-px-sm">
                <ItemInfo :item="item" />
            </div>
        </div>
        <div id="similar" class="column q-px-sm" :style="'max-height:' + similarHeight + 'px;'" >
            <div class="col-1">
                <div class="text-h6">Items similaires</div>
            </div>
            <div class="col row">
                <ItemList />
            </div>
        </div>
    </q-page>
</template>
<script>
import ItemAction from '../components/ItemAction.vue';
import ItemInfo from '../components/ItemInfo.vue';
import ItemList from './ItemList.vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        ItemAction,
        ItemInfo,
        ItemList
    },
    props: [
        'id'
    ],
    computed: {
        ...mapGetters([
            'getCategory',
            'getSubCategory',
            'getToken'
        ]),
        itemCategory() {
            let category = this.getCategory(this.item.main_category);
            let sub = this.getSubCategory(this.item.main_category, this.item.sub_category);

            return category.category_name + " - " + sub.category_name;
        }
    },
    data() {
        return {
            infoHeight: 0,
            similarHeight: 0,
            item: {},
        }
    },
    methods: {
        updateItem(newItem) {
            console.log(newItem);
            this.item = newItem;
        },
        getItem() {
            if(this.$store.getters.getToken !== null) {
                this.$api.url('item/get')
                    .success(data => this.item = data)
                    .send({
                        id: this.id
                    });
            }
        }
    },
    watch: {
        'getToken': function(newVal, oldVal) {
            if(oldVal === null) {
                this.getItem();
            }
        }
    },
    mounted() {
        /**
         * @TODO Récupérer les infos de l'item
         */
        this.getItem();
        let availHeight = document.getElementById("page").offsetHeight - document.querySelector("#page > .q-toolbar").offsetHeight;
        this.similarHeight = availHeight;
    }
}
</script>
<style lang="scss" scoped>
#page {
    display: flex;
    flex-direction: column;
}

#similar {
    flex: 1;
}
</style>