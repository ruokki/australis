<template>
    <div class="item" 
        :class="{'hovered' : front }"
        @mouseover="front = true"
        @mouseleave="front = false"
    >
        <div class="background">
            <q-img :src="item.img" :ratio="1" />
        </div>
        <div class="front fit column justify-around item-center" @click="seeItem">
            <div>
                <div class="text-center text-h5">{{ item.name }}</div>
                <div class="text-center" v-if="item.category_icon">
                    <q-icon size="md" :name="item.category_icon" >
                        <q-tooltip 
                            v-if="item.category_path"
                            :transition-show="tooltipTransition"
                            :transition-hide="tooltipTransition"
                            :content-class="tooltipClass"
                        >
                            {{ item.category_path }}
                        </q-tooltip>
                    </q-icon>
                    <q-icon v-if="!item.possessed" @click="borrowMe" size="md" class="cursor-pointer" name="shopping_cart" >
                        <q-tooltip 
                            :transition-show="tooltipTransition"
                            :transition-hide="tooltipTransition"
                            :content-class="tooltipClass"
                        >
                            Emprunter l'item
                        </q-tooltip>
                    </q-icon>
                </div>
            </div>
            <div class="absolute-bottom-right cursor-pointer actions">
                <ItemAction :item="item" @update="updateItem" />
            </div>
        </div>
    </div>
</template>
<script>
import router from '../router/index.js';
import ItemAction from './ItemAction.vue';
import { mapGetters } from 'vuex';

export default {
    name: "Item",
    components: {
        ItemAction
    },
    computed: {
        ...mapGetters([
            'tooltipTransition',
            'tooltipClass'
        ]),
    },
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
        seeItem() {
            router.push({ path: `/item/${this.item.id}`});
        },
        updateItem(newItem) {
            this.item = newItem;
        }
    },
    data() {
        return {
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
        }
    }
}
</style>