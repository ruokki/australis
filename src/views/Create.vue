<template>
    <q-page>
        <q-toolbar class="bg-primary text-white">
            <q-toolbar-title>{{ title }}</q-toolbar-title>
        </q-toolbar>
        <div class="q-pa-md">
            <q-expansion-item 
                :label="$getTexts('category', 'All')" 
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
            <q-separator />
            <q-expansion-item 
                :label="$getTexts('subCategory', 'All')" 
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
            <q-separator />
            <q-expansion-item 
                label="Informations" 
                switch-toggle-side
                v-model="seeInfo"
                :disable="newItem.category_id == 0 || newItem.subcategory_id == 0" 
            >
                <div v-show="alertOneShot" class="row justify-between items-center text-white bg-warning q-pa-xs">
                    <q-icon name="warning" size="sm" />
                    <div>Attention ! {{ $getTexts('oneShot', page) }}</div>
                    <q-icon name="warning" size="sm" />
                </div>
                <q-form @submit="saveItem">
                    <ItemInfo 
                        :form="true" 
                        :mainCat="this.newItem.category_id" 
                        :subCat="this.newItem.subcategory_id" 
                        :item="newItem"
                        :collection="type == 'collection'"
                        :errors="fieldsInError"
                    />
                    <q-input v-if="type == 'collection'" 
                        type="number" 
                        v-model="newItem.collection_length"
                        :label="$getTexts('nbItems', page)"
                        :hint="$getTexts('hintNbItems', page)" 
                    >
                        <template v-slot:append>
                            <q-icon name="list" class="cursor-pointer" @click="dialogPossessed = true" />
                        </template>
                    </q-input>
                    <div class="col q-py-md">
                        <q-btn label="Enregistrer" type="submit" color="primary" icon="send" />
                    </div>
                </q-form>

                 <q-dialog v-model="dialogPossessed" position="right">
                    <q-card>
                        <q-toolbar>
                            <q-toolbar-title>{{ $getTexts('listPossessed', page) }}</q-toolbar-title>
                            <q-btn flat round dense icon="close" v-close-popup />
                        </q-toolbar>
                        <q-card-section>
                            <div class="row">
                                <q-toggle v-model="allTome" label="Tous les tomes" left-label />
                            </div>
                            <div class="row" v-for="row in nbLine" :key="row">
                                <div class="col-4" v-if="getRowInfo(row)[0]">
                                    <q-checkbox 
                                        v-model="newItem.collection_possessed"
                                        :val="'T' + getRowInfo(row)[0]"
                                        :label="'Tome ' + getRowInfo(row)[0]"
                                        @input="checkAllToggle"
                                    />
                                </div>
                                <div class="col-4" v-if="getRowInfo(row)[1]">
                                    <q-checkbox 
                                        v-model="newItem.collection_possessed"
                                        :val="'T' + getRowInfo(row)[1]"
                                        :label="'Tome ' + getRowInfo(row)[1]"
                                        @input="checkAllToggle"
                                    />
                                </div>
                                <div class="col-4" v-if="getRowInfo(row)[2]">
                                    <q-checkbox 
                                        v-model="newItem.collection_possessed"
                                        :val="'T' + getRowInfo(row)[2]"
                                        :label="'Tome ' + getRowInfo(row)[2]"
                                        @input="checkAllToggle"
                                    />
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </q-dialog>
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
            let target = "";
            if(this.type === 'collection') {
                target = "createMulti";
            }
            else {
                target = "createOne";
            }
            return this.$getTexts('userItems', 'Menu')[target];
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
                        if(allSub.children[i].category_allow_collection == 1) {
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
        // Affiche l'alerte "Item One shot" si catégorie de l'item accepte les collections
        alertOneShot: function() {
            if(this.newItem.category_id > 0) {
                let cat = this.getCategory(this.newItem.category_id);
                if(parseInt(cat.category_allow_collection) === 1 && this.type == 'item') {
                    return true;
                }
            }
            return false;
        }, 
        // Force le type de collection_length pour le v-for
        parseLength: function() {
            return this.newItem.collection_length == '' ? 0 : parseInt(this.newItem.collection_length);
        },
        // Nombre de boucle à faire pour afficher toutes les checkboxes
        nbLine: function() {
            return Math.ceil(this.parseLength / this.nbCheckPerLine);
        }
    },
    data() {
        return {
            page: "Create",
            newItem: {
                category_id: 0,
                subcategory_id: 0,
                item_possessed: true,
                collection_length: '',
                collection_possessed: [],
                collection_running: false
            },
            // Ouverture auto de l'expansion "Categorie"
            seeCategory: true,
            // Ouverture auto de l'expansion "Sous categorie"
            seeSub: false,
            // Ouverture auto de l'expansion "Informations"
            seeInfo: false,
            // Affichage de la modal pour gérer les tomes possédés
            dialogPossessed: false,
            // On sélectionne par défaut tout les tomes
            allTome: false,
            // Nombre de checkbox par ligne
            nbCheckPerLine: 3,
            // Champs en erreur après enregistrement
            fieldsInError: {}
        }
    },
    methods: {
        // Gestion des expansion item
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
        // Enregistrement de l'item sur le serveur
        saveItem: function() {
            var thos = this,
                formData = new FormData();
            
            for(var i in this.newItem) {
                formData.append(
                    this.type == 'collection' ? i.replace('item_', 'collection_') : i, 
                    this.newItem[i]
                );
            }
            
            this.$api.url((this.type == 'collection' ? 'collection' : 'item') + '/set')
                .formData()
                .success(function(data) {
                    if(data.error === true) {
                        thos.fieldsInError = data.errors;
                        thos.$q.notify({
                            type: 'negative',
                            message: "Erreur dans le formulaire"
                        });
                    }
                    else {
                        thos.$q.notify({
                            type: 'positive',
                            message: "Item enregistré"
                        });
                        thos.resetData();
                    }
                })
                .send(formData);
        },
        // Génère les clés pour les checkboxes en fonction de l'idx de la ligne
        getRowInfo: function(currentIdx) {
            let start = (currentIdx - 1) * 3;
            let toReturn = [];
            for(var i = start; i < start + this.nbCheckPerLine; i++) {
                if(i + 1 <= this.newItem.collection_length) {
                    toReturn.push(i + 1);
                }
            }
            return toReturn;
        },
        // Vérifie s'il faut décocher le toggle "Tous"
        checkAllToggle: function() {
            if(this.newItem.collection_possessed == this.newItem.collection_length) {
                this.allTome = true;
            }
            else {
                this.allTome = null;
            }
        },
        // Reset des variables dans le data
        resetData: function() {
            this.newItem = {
                category_id: 0,
                subcategory_id: 0,
                item_possessed: true,
                collection_length: '',
                collection_possessed: []
            };
            this.seeCategory = true,
            this.seeSub = false;
            this.seeInfo = false;
            this.fieldsInError = {};
        }
    },
    watch: {
        'type': function() {
            this.resetData();
        },
        'allTome': function(newVal) {
            if(newVal == true) {
                this.newItem.collection_possessed = [];
                for(var i = 1; i <= this.parseLength; i++) {
                    this.newItem.collection_possessed.push('T' + i);
                }
            }
            else if(newVal == false) {
                this.newItem.collection_possessed = [];
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>