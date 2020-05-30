<template>
    <div class="item" 
        :class="{'hovered' : front }"
        @mouseover="front = true"
        @mouseleave="front = false"
    >
        <div class="background">
            <q-img :src="item.img" :ratio="1" />
        </div>
        <div class="front fit column justify-around item-center">
            <div>
                <div class="text-center text-h5">{{ item.name }}</div>
                <div class="text-center" v-if="item.category_icon">
                    <q-icon size="md" :name="item.category_icon" >
                        <q-tooltip 
                            v-if="item.category_path"
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            {{ item.category_path }}
                        </q-tooltip>
                    </q-icon>
                    <q-icon v-if="!item.possessed" @click="borrowMe" size="md" class="cursor-pointer" name="shopping_cart" >
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Emprunter l'item
                        </q-tooltip>
                    </q-icon>
                </div>
            </div>
            <div class="absolute-bottom-right cursor-pointer actions">
                <div v-if="item.possessed">
                    <q-icon size="sm" name="edit" >
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Modifier l'item
                        </q-tooltip>
                    </q-icon>
                    <q-icon size="sm" v-if="!item.borrowable" name="lock_open" @click="setBorrow(true)" >
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Prêts autorisés
                        </q-tooltip>
                    </q-icon>
                    <q-icon size="sm" v-else name="lock" @click="setBorrow(false)">
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Prêts interdits
                        </q-tooltip>
                    </q-icon>
                    <q-icon size="sm" name="check_box" @click="toCollection(false)">
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Retirer de ma collection
                        </q-tooltip>
                    </q-icon>
                </div>
                <div v-else>
                    <q-icon size="sm" name="check_box_outline_blank" @click="toCollection(true)">
                        <q-tooltip 
                            :transition-show="tooltip.transition"
                            :transition-hide="tooltip.transition"
                            :content-class="tooltip.class"
                        >
                            Ajouter à ma collection
                        </q-tooltip>
                    </q-icon>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Item",
    props: {
        item: Object
    },
    methods: {
        // Envoi d'une demande de prêt
        borrowMe() {
            /**
             * @TODO Envoyer une requête pour faire un prêt
             * id : this.item.id
             */
            },
        // Définit si l'item est empruntable ou non
        setBorrow(borrowable) {
            this.item.borrowable = borrowable;
            /**
             * @TODO Envoyer requête pour enregistrer l'état "Empruntable"
             */
            },
        toCollection(possessed) {
            this.item.possessed = possessed;
            /**
             * @TODO Envoyer une requête pour retirer l'item de la collection du user
             * id : this.item.id
             */
        }

    },
    data() {
        return {
            tooltip: {
                class: "bg-primary text-body1",
                transition: "scale"
            },
            front: false
        }
    }
}
</script>
<style lang="scss" scoped>
.item {
    $dimension: 200px;
    width: $dimension;
    height: $dimension;
    float: left;
    position: relative;
    margin-right: 20px;
    margin-bottom: 40px;

    &.hovered {
        .front {
            opacity: 0.8;
        }
    }

    .front {
        position: absolute;
        top: 0;
        left: 0;
        background: white;
        opacity: 0;
        z-index: 4;
        transition: opacity .35s;

        .actions {
            padding: 5px 0;

            .q-icon {
                margin: 0 5px;
            }
        }
    }
}
</style>