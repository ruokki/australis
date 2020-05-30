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
                    category_icon: "music_note",
                    category_path: "Audio - Album"
                },
                {
                    id: 2,
                    img: "https://picsum.photos/300/500",
                    name: "Item 2",
                    category_icon: "movie",
                    category_path: "Vidéo - Anime",
                    possessed: true
                },
                {
                    id: 3,
                    img: "https://picsum.photos/500/300",
                    name: "Item 3",
                    category_icon: "movie",
                    category_path: "Vidéo - Film",
                    possessed: true,
                    borrowable: false
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