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
        <div v-for="(one, key) in fields" :key="key" >
            <q-input v-if="one.field_name == 'item_name'" 
                :label="one.field_label" 
                debounce="500"
                v-model="item[one.field_name]" 
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
            >
                <template v-slot:append>
                    <q-toggle
                        v-if="!collection"
                        v-model="item.item_possessed"
                        label="Possédé"
                        unchecked-icon="clear"
                        checked-icon="check"
                    />
                </template>
            </q-input>
            <q-input v-else-if="one.field_type == 'text'" 
                :label="one.field_label" 
                debounce="500"
                v-model="item[one.field_name]" 
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
            />
            <q-input v-else-if="one.field_type == 'number'" 
                type="number" 
                debounce="500"
                :label="one.field_label" 
                v-model="item[one.field_name]" 
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
            />
            <q-select v-else-if="one.field_type == 'select'" 
                :label="one.field_label" 
                :options="one.field_options" 
                debounce="500"
                value="" 
                v-model="item[one.field_name]"
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
            />
            <q-file 
                v-else-if="!collection && one.field_type == 'file'" 
                :label="one.field_label" 
                v-model="item[one.field_name]" 
                accept=".jpg, .png, image/*"
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
            >
                <template v-slot:append>
                    <q-icon name="attachment" />
                </template>
                <template v-slot:file="{ index, file }">
                    <q-chip
                    class="full-width q-my-xs"
                    square
                    >
                        <q-avatar>
                            <q-icon name="photo" />
                        </q-avatar>
                        <div class="ellipsis relative-position">
                            {{ file.name }}
                        </div>
                    </q-chip>
                </template>
            </q-file>
            <q-input 
                v-else-if="one.field_type == 'textarea'" 
                type="textarea" 
                :label="one.field_label" 
                debounce="500"
                v-model="item[one.field_name]" 
                :error="typeof(errors[one.field_name]) !== 'undefined'"
                @input="val => setProp(one.field_name, val)"
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
            let fields = [
                {
                    field_label: "Nom",
                    field_name: "item_name",
                    field_type: "text"
                },
                {
                    field_label: "Image",
                    field_name: "item_img",
                    field_type: "file"
                },
                {
                    field_label: "Description",
                    field_name: "item_descript",
                    field_type: "textarea"
                }
            ];

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
                    fields = fields.concat(this.getSubCategory(this.mainCat, this.subCat).fields);
                }
            }
            else {
                fields = fields.concat(this.getSubCategory(this.item.main_category, this.item.sub_category).fields);
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
            type: [Number, String],
            default: -1
        },
        subCat: {
            type: [Number, String],
            default: -1
        },
        errors: {
            type: Object,
            default: function() { return {}; }
        },
        collection: Boolean
    },
    data() {
        return {}
    },
    methods: {
        setProp: function(field, val) {
            if(this.errors[field] !== "undefined") {
                delete this.errors[field];
            }

            this.$set(this.item, field, val);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>