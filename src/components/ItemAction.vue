<template>
    <span v-if="onlyBorrow">
        <q-icon v-if="!possessed" size="sm" class="q-px-sm cursor-pointer" name="shopping_cart" @click.stop="tryBorrow" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                {{ $getTexts('borrow') }}
            </q-tooltip>
        </q-icon>
        <q-dialog v-model="dialogPossessor" @hide="resetBorrowTo">
                <q-card>
                    <q-toolbar>
                        <q-toolbar-title>{{ $getTexts('dialogPossessor').title }}</q-toolbar-title>
                        <q-btn flat round dense icon="close" v-close-popup />
                    </q-toolbar>
                    <q-card-section>
                        <p>{{ $getTexts('dialogPossessor').question }} <span class="text-bold">{{ item.item_name }}</span> ?</p>
                        <q-form @submit="askBorrow" class="column">
                            <q-option-group v-model="borrowTo" :options="possessors" type="checkbox" />
                            <q-btn label="Envoyer" color="primary" type="submit" full-width />
                        </q-form>
                    </q-card-section>
                </q-card>
        </q-dialog>
    </span>
    <q-btn-group flat v-else-if="possessed">
        <q-btn icon="edit">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
                @click.stop="editItem"
            >
                {{ $getTexts('editItem') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-if="allowBorrow" icon="lock_open" @click.stop="setBorrow(true)" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                {{ $getTexts('lentAllow') }}
            </q-tooltip>
        </q-btn>
        <q-btn v-else icon="lock" @click.stop="setBorrow(false)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                {{ $getTexts('lentForbidden') }}
                
            </q-tooltip>
        </q-btn>
        <q-btn icon="check_box" @click.stop="toReserve">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                {{ $getTexts('removeItemToUser') }}
            </q-tooltip>
        </q-btn>
    </q-btn-group>
    <q-btn-group flat v-else>
        <q-btn icon="check_box_outline_blank" @click.stop="toReserve">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                {{ $getTexts('removeItemToUser') }}
            </q-tooltip>
        </q-btn>
    </q-btn-group>
</template>
<script>
import { mapGetters } from 'vuex';
import router from '../router/index.js';

export default {
    name: "ItemAction",
    props: {
        item: Object,
        button: Boolean,
        onlyBorrow: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            borrow: false,
            dialogPossessor: false,
            borrowTo: []
        };
    },
    computed: {
        ...mapGetters([
            'tooltipTransition',
            'tooltipClass',
            'getMe'
        ]),
        possessed: function() {
            let imIn = this.myPossession();
            if(imIn == false) {
                return false;
            }
            return true;
        },
        possessors: function() {
            let possessors = this.otherPossession();
            let varReturn = [];
            for(var i in possessors) {
                varReturn.push({
                    label: possessors[i].user_name,
                    value: possessors[i].user_id
                });
            }
            return varReturn;
        },
        allowBorrow: function() {
            let poss = this.myPossession();
            if(poss === false) {
                return false;
            }
            else {
                if(poss.item_borrowable == 1) {
                    return true;
                }

                return false;
            }
        },
        borrowable: function() {
            let poss = this.otherPossession();
            if(poss == false) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    methods: {
        /**  
         * Définit si l'item est empruntable ou non
         */
        setBorrow(borrowable) {
            let thos = this;            
            this.$api.url('item/borrow/allow')
                .success(data => {
                    let idxPoss = this.indexPossession();
                    if(idxPoss !== -1) {
                        this.item.possessors[idxPoss].item_borrowable = data.newVal;
                        thos.$emit('update', this.item);
                        thos.$q.notify({
                            type: 'positive',
                            message: borrowable ? this.$getTexts('notify').borrowable : this.$getTexts('notify').noBorrowable
                        });
                    }
                })
                .send({
                    item: this.item.item_id
                });
        },
        /**
         * Modification de la possession d'un item
         */
        toReserve() {
            let poss = this.myPossession();
            this.$api.url('item/poss/' + (poss === false ? 'add': 'remove'))
                .success(data => {
                    this.item.possessors = data;
                    let possessed = data.findIndex(elem => elem.user_id == this.getMe) === -1 ? false: true;
                    this.$q.notify({
                        type: 'positive',
                        message: possessed ? this.$getTexts('notify').itemPossessed : this.$getTexts('notify').itemNotPossessed
                    });
                })
                .send({
                    item: this.item.item_id
                });
        },
        /**  
         * Envoi d'une demande de prêt
         */
        tryBorrow() {
            let possessors = this.otherPossession();
            if(possessors.length == 1) {
                this.borrowTo = [possessors[0].user_id];
                this.askBorrow();
            }
            else {
                this.dialogPossessor = true;
            }
        },
        /**
         * Envoi des demandes d'emprunt
         */
        askBorrow() {
            if(this.borrowTo.length > 0) {
                let thos = this;
                this.$api.url('borrow/ask')
                    .success(() => {
                        thos.dialogPossessor = false;
                        thos.$q.notify({
                            type: 'positive',
                            message: this.$getTexts('notify').borrowASked
                        });
                    })
                    .send({
                        to: this.borrowTo,
                        item: this.item.item_id
                    });
            }
            else {
                this.$q.notify({
                    type: 'negative',
                    message: this.$getTexts('notify').noUserSelected
                });
            }
        },
        /**
         * Réinitialise le tableau des utilisateurs auprès desquel faire une demande d'emprunt
         */
        resetBorrowTo: function() {
            this.borrowTo = [];
        },
        /**
         * Redirection vers la modification d'un item
         */
        editItem() {
            // Redirection vers la page de modification d'un item
            router.push({ path: `/item/${this.item.id}`});
        },
        /**
         * Récupère les infos de possession pour le user courant
         */
        myPossession() {
            if(this.item.possessors == undefined) return false;
            
            let poss = this.item.possessors.filter(elem => elem.user_id == this.getMe);
            if(poss.length > 0) {
                return poss[0];
            }
            else {
                return false;
            }
        },
        /**
         * Récupère l'index des infos de possession pour le user courant
         */
        indexPossession() {
            if(this.item.possessors == undefined) return false;

            return this.item.possessors.findIndex(elem => elem.user_id == this.getMe);
        },
        /**
         * Récupère les users auprès desquels on peut emprunter l'item
         */
        otherPossession() {
            if(this.item.possessors == undefined) return false;

            let poss = this.item.possessors.filter(elem => elem.user_id != this.getMe && elem.item_borrowable == 1);
            if(poss.length > 0) {
                return poss;
            }
            else {
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>