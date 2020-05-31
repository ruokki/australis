<template>
    <div v-if="!form">
        <q-list bordered separator>
            <q-item>
                <q-item-section class="text-center">
                    <q-scroll-area class="full-width" style="height: 100px;">
                    {{ item.item_descript }}
                    </q-scroll-area>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section class="text-right">Catégorie</q-item-section>
                <q-item-section>{{ fullCategory }}</q-item-section>
            </q-item>
            <q-item  v-if="item.item_idx_collection > 0">
                <q-item-section class="text-right">Collection</q-item-section>
                <q-item-section>{{ item.item_idx_collection }} / {{ item.collection_length }}</q-item-section>
            </q-item>
            <q-item  v-for="(one, key) in fields" :key="key">
                <q-item-section v-if="item['item_' + one.field_name]" class="text-right">{{ one.field_label }}</q-item-section>
                <q-item-section v-if="item['item_' + one.field_name]">{{ item['item_' + one.field_name]}}</q-item-section>
            </q-item>
        </q-list>
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    name: "ItemInfo",
    computed: {
        ...mapGetters([
            'getCategory',
            'getSubCategory'
        ]),
        fields: function() {
            let fields;

            if(this.form == true) {
                if(this.mainCat == -1) {
                    throw new TypeError("Aucune catégorie n'a été définie");
                }
                else if(this.subCat == -1) {
                    throw new TypeError("Aucune sous catégorie n'a été définie");
                }
                else {
                    fields = this.getSubCategory(this.mainCat, this.subCat);
                }
            }
            else {
                fields = this.getSubCategory(this.item.main_category, this.item.sub_category).category_fields;
            }

            return fields;
        },
        fullCategory: function() {
            let category = this.getCategory(this.item.main_category);
            let sub = this.getSubCategory(this.item.main_category, this.item.sub_category);

            return category.category_name + " - " + sub.category_name;
        }
    },
    props: {
        item: Object,
        form: Boolean,
        mainCat: {
            type: Number,
            default: -1
        },
        subCat: {
            type: Number,
            default: -1
        }
    }
}
</script>
<style lang="scss" scoped>

</style>