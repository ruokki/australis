<template>
    <q-page>
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>{{ title }}</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md">
            <q-expansion-item 
                label="Catégorie" 
                :caption="categoryName"
                switch-toggle-side 
                :icon="categoryIcon" 
                v-model="seeCategory"
            >
                <q-option-group 
                    v-model="newItem.category_id" 
                    inline 
                    :options="categories" 
                    @input="updateSee('cat')"
                />
            </q-expansion-item>
            <q-expansion-item 
                label="Sous-catégorie" 
                :caption="subCategoryName"
                switch-toggle-side 
                v-model="seeSub"
                :disable="newItem.category_id == 0"
            >
                <q-option-group 
                    v-model="newItem.subcategory_id" 
                    inline 
                    :options="subCategories" 
                    @input="updateSee('sub')"
                />
            </q-expansion-item>
            <q-expansion-item 
                label="Informations" 
                switch-toggle-side
                v-model="seeInfo"
                :disable="newItem.category_id == 0 || newItem.subcategory_id == 0" 
            >
                <div v-show="alertOneShot" class="row justify-between items-center text-white bg-warning q-pa-xs">
                    <q-icon name="warning" size="sm" />
                    <div>Attention ! L'item doit être un one-shot.</div>
                    <q-icon name="warning" size="sm" />
                </div>
                <q-form @submit="saveItem">
                    <ItemInfo 
                        :form="true" 
                        :mainCat="this.newItem.category_id" 
                        :subCat="this.newItem.subcategory_id" 
                        :item="newItem"
                    />
                    <div class="col q-py-md">
                        <q-btn label="Enregistrer" type="submit" color="primary" icon="send" />
                    </div>
                </q-form>
            </q-expansion-item>
        </div>
    </q-page>
</template>
<script>
import { mapGetters } from 'vuex';
import ItemInfo from '../components/ItemInfo.vue';

export default {
    name: "Create",
    components: {
        ItemInfo
    },
    props: [ 'type' ],
    computed: {
        ...mapGetters([
            'getAllCategories',
            'getCollectionCategories',
            'getCategory',
            'getSubCategory'
        ]),
        // Titre de la page
        title: function() {
            if(this.type === 'collection') {
                return "Création d'une collection";
            }
            else {
                return "Création d'un item";
            }
        },
        // Liste des catégories disponibles
        categories: function() {
            let all = this.type == 'collection' ? this.getCollectionCategories : this.getAllCategories;
            let optGroup = [];

            for(var i in all) {
                optGroup.push({
                    label: all[i].category_name,
                    value: all[i].category_id
                });
            }

            return optGroup;
        },
        // Liste des sous-catégories disponibles pour la catégorie sélectionnée
        subCategories: function() {
            let optGroup = [];

            if(this.newItem.category_id > 0) {
                let allSub = this.getCategory(this.newItem.category_id);
                for(var i in allSub.children) {
                    if(this.type == 'collection') { 
                        if(allSub.children[i].collection_allowed == true) {
                            optGroup.push({
                                label: allSub.children[i].category_name,
                                value: allSub.children[i].category_id
                            });
                        }
                    }
                    else {
                        optGroup.push({
                            label: allSub.children[i].category_name,
                            value: allSub.children[i].category_id
                        });
                    }
                }
            }

            return optGroup;
        },
        // Récupération de l'icone de la catégorie
        categoryIcon: function() {
            if(this.newItem.category_id != 0) {
                return this.getCategory(this.newItem.category_id).category_icon;
            }
            else {
                return "";
            }
        },
        // Récupération del'icone de la sous-catégorie
        categoryName: function() {
            if(this.newItem.category_id != 0) {
                return this.getCategory(this.newItem.category_id).category_name;
            }
            else {
                return "";
            }
        },
        // Récupération del'icone de la sous-catégorie
        subCategoryName: function() {
            if(this.newItem.category_id != 0 && this.newItem.subcategory_id != 0) {
                return this.getSubCategory(this.newItem.category_id, this.newItem.subcategory_id).category_name;
            }
            else {
                return "";
            }
        },
        alertOneShot: function() {
            if(this.newItem.category_id > 0) {
                let cat = this.getCategory(this.newItem.category_id);
                if(cat.collection_allowed === true && this.type == 'item') {
                    return true;
                }
            }
            return false;
        }
    },
    data() {
        return {
            newItem: {
                category_id: 0,
                subcategory_id: 0
            },
            // Ouverture auto de l'expansion "Categorie"
            seeCategory: true,
            // Ouverture auto de l'expansion "Sous categorie"
            seeSub: false,
            // Ouverture auto de l'expansion "Informations"
            seeInfo: false
        }
    },
    methods: {
        updateSee: function(from) {
            if(from == 'sub') {
                this.seeCategory = false;
                this.seeSub = false;
                this.seeInfo = true
            }
            else if(from == 'cat') {
                this.newItem.subcategory_id = 0;
                this.seeCategory = false;
                this.seeSub = true;
            }
        },
        saveItem: function() {
            /**
             * @TODO Envoyer une requête pour enregistrer l'item en base
             */
            console.log(this.newItem);
            this.$q.notify({
                type: 'positive',
                message: "Item enregistré"
            });
        }
    },
    watch: {
        'type': function() {
            this.newItem = {
                category_id: 0,
                subcategory_id: 0
            };
            this.seeCategory = true,
            this.seeSub = false;
            this.seeInfo = false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>