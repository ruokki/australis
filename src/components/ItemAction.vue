<template>
    <q-icon v-if="onlyBorrow" size="sm" class="q-px-sm cursor-pointer" name="shopping_cart" @click.stop="borrowMe" >
        <q-tooltip 
            :transition-show="tooltipTransition"
            :transition-hide="tooltipTransition"
            :content-class="tooltipClass"
        >
            Emprunter l'item
        </q-tooltip>
    </q-icon>
    <q-btn-group flat v-else-if="item.possessed">
        <q-btn icon="edit">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
                @click.stop="editItem"
            >
                Modifier l'item
            </q-tooltip>
        </q-btn>
        <q-btn v-if="!item.borrowable" icon="lock_open" @click.stop="setBorrow(true)" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Prêts autorisés
            </q-tooltip>
        </q-btn>
        <q-btn v-else icon="lock" @click.stop="setBorrow(false)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Prêts interdits
            </q-tooltip>
        </q-btn>
        <q-btn icon="check_box" @click.stop="toReserve(false)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Retirer de ma réserve
            </q-tooltip>
        </q-btn>
    </q-btn-group>
    <q-btn-group flat v-else>
        <q-btn icon="check_box_outline_blank" @click.stop="toReserve(true)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Ajouter à ma réserve
            </q-tooltip>
        </q-btn>
        <q-btn v-if="borrow" icon="shopping_cart" @click.stop="borrowMe" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Emprunter l'item
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
        borrow: {
            type: Boolean,
            default: false
        },
        onlyBorrow: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            
        };
    },
    computed: {
        ...mapGetters([
            'tooltipTransition',
            'tooltipClass'
        ]),
    },
    methods: {
        // Définit si l'item est empruntable ou non
        setBorrow(borrowable) {
            this.item.borrowable = borrowable;
            this.$emit('update', this.item);
            this.$q.notify({
                type: 'positive',
                message: borrowable ? "L'item peut à nouveau être emprunté" : "L'item ne peux plus être emprunter"
            });
            /**
             * @TODO Envoyer requête pour enregistrer l'état "Empruntable"
             */
            },
        toReserve(possessed) {
            this.item.possessed = possessed;
            this.$emit('update', this.item);
            this.$q.notify({
                type: 'positive',
                message: possessed ? "Item ajouté à votre réserve" : "Item retiré de votre réserve"
            });
            /**
             * @TODO Envoyer une requête pour retirer l'item de la reserve du user
             * id : this.item.id
             */
        },
        // Envoi d'une demande de prêt
        borrowMe() {
            /**
             * @TODO Envoyer une requête pour faire un prêt
             * id : this.item.id
             * 
             * S'il y a plusieurs possesseurs, afficher modal pour demander à qui faire la demande
             * Si un seul, faire automatiquement la demande à ce user
             * Si aucun, message d'alerte pour dire qu'aucun item n'est disponible
             */
        },
        editItem() {
            // Redirection vers la page de modification d'un item
            router.push({ path: `/item/${this.item.id}`});
        }
    }
}
</script>

<style lang="scss" scoped>

</style>