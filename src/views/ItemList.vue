<template>
    <q-scroll-area class="row full-width list-item" >
        <Item v-for="one in items" :key="one.id"
            :item="one" 
        />
    </q-scroll-area>
</template>
<script>
import Item from '../components/Item.vue';

export default {
    name: "ItemList",
    components: {
        Item
    },
    props: {
        fit: Boolean,
        items: {
            type: Array,
            default: function() { return []; }
        }
    },
    data() {
        return {}
    }
}
</script>
<style lang="scss" scoped>

</style>