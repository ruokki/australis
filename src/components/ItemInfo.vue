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
    <div v-else>
         <q-input 
            label="Nom" 
            debounce="500"
            v-model="infoItem.item_name" 
            @input="updateParent" 
        />
         <q-file 
            label="Image" 
            v-model="infoItem.item_img" 
            @input="updateParent"
        >
            <template v-slot:append>
                <q-icon name="attachment" />
            </template>
        </q-file>
        <q-input 
            type="textarea" 
            label="Description" 
            debounce="500"
            v-model="infoItem.item_descript" 
            @input="updateParent" 
        />
        <div v-for="(one, key) in fields" :key="key" >
            <q-input v-if="one.field_type == 'text'" 
                :label="one.field_label" 
                debounce="500"
                v-model="infoItem['item_' + one.field_name]" 
                @input="updateParent" 
            />
            <q-input v-else-if="one.field_type == 'number'" 
                type="number" 
                debounce="500"
                :label="one.field_label" 
                v-model="infoItem['item_' + one.field_name]" 
                @input="updateParent" 
            />
            <q-select v-else-if="one.field_type == 'select'" 
                :label="one.field_label" 
                :options="one.field_options" 
                debounce="500"
                value="" 
                v-model="infoItem['item_' + one.field_name]" 
                @input="updateParent" 
            />
        </div>
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
        // Liste des champs à afficher pour la catégorie/sous catégorie indiquée
        fields: function() {
            let fields;

            if(this.form == true) {
                if(this.mainCat == 0 || this.subCat == 0) {
                    fields = [];
                }
                else if(this.mainCat == -1) {
                    throw new TypeError("Aucune catégorie n'a été définie");
                }
                else if(this.subCat == -1) {
                    throw new TypeError("Aucune sous catégorie n'a été définie");
                }
                else {
                    fields = this.getSubCategory(this.mainCat, this.subCat).category_fields;
                }
            }
            else {
                fields = this.getSubCategory(this.item.main_category, this.item.sub_category).category_fields;
            }

            return fields;
        },
        // Récupération du nom complet de la catégorie
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
    },
    data() {
        return {
            // Stockage de l'ensemble des infos de l'item
            infoItem: {
                item_name: "",
                item_img: [],
                item_descript: ""
            }
        }
    },
    methods: {
        // Champs modifiés, on va le dire au prant
        updateParent: function() {
            this.$emit('update', this.infoItem);
        }
    },
    created() {
        let defaultVal;
        for(var i in this.fields) {
            defaultVal = "";
            this.infoItem['item_' + this.fields[i].field_name] = defaultVal;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>