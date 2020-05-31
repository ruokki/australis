<template>
    <div v-if="item.possessed">
        <q-icon size="sm" name="edit" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
                @click.stop="editItem"
            >
                Modifier l'item
            </q-tooltip>
        </q-icon>
        <q-icon size="sm" v-if="!item.borrowable" name="lock_open" @click.stop="setBorrow(true)" >
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Prêts autorisés
            </q-tooltip>
        </q-icon>
        <q-icon size="sm" v-else name="lock" @click.stop="setBorrow(false)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Prêts interdits
            </q-tooltip>
        </q-icon>
        <q-icon size="sm" name="check_box" @click.stop="toCollection(false)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Retirer de ma collection
            </q-tooltip>
        </q-icon>
    </div>
    <div v-else>
        <q-icon size="sm" name="check_box_outline_blank" @click.stop="toCollection(true)">
            <q-tooltip 
                :transition-show="tooltipTransition"
                :transition-hide="tooltipTransition"
                :content-class="tooltipClass"
            >
                Ajouter à ma collection
            </q-tooltip>
        </q-icon>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import router from '../router/index.js';

export default {
    name: "ItemAction",
    props: [
        'item'
    ],
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
            /**
             * @TODO Envoyer requête pour enregistrer l'état "Empruntable"
             */
            },
        toCollection(possessed) {
            console.log(possessed);
            console.log(this.item.possessed);
            this.item.possessed = possessed;
            this.$emit('update', this.item);
            /**
             * @TODO Envoyer une requête pour retirer l'item de la collection du user
             * id : this.item.id
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
.q-icon {
    margin: 0 5px;
}
</style>