<template>
    <q-scroll-area class="full-width">
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
    data() {
        return {
            items: [
                {
                    id: 1,
                    img: "https://picsum.photos/300/300",
                    name: "Item 1",
                    icon: "music_note"
                },
                {
                    id: 2,
                    img: "https://picsum.photos/300/500",
                    name: "Item 2",
                    icon: "movie",
                    possessed: true
                },
                {
                    id: 3,
                    img: "https://picsum.photos/500/300",
                    name: "Item 3",
                    icon: "movie"
                },
                {
                    id: 4,
                    img: "https://picsum.photos/300/300",
                    name: "Item 4"
                },
                {
                    id: 5,
                    img: "https://picsum.photos/300/300",
                    name: "Item 6",
                    icon: "movie"
                },
                {
                    id: 6,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8",
                    icon: "movie"
                },
                {
                    id: 7,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8"
                },
                {
                    id: 8,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8",
                    icon: "movie"
                },
                {
                    id: 9,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8"
                },
                {
                    id: 10,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8"
                },
                {
                    id: 11,
                    img: "https://picsum.photos/300/300",
                    name: "Item 8"
                },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>

</style>