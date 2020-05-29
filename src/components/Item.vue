<template>
    <div class="item" 
        @mouseover="front = true"
        @mouseleave="front = false"
    >
        <div class="background">
            <q-img :src="item.img" :ratio="1" />
        </div>
        <div v-show="front" class="front fit column justify-around item-center">
            <div>
                <div class="text-center text-h5">{{ item.name }}</div>
                <div class="text-center" v-if="item.icon">
                    <q-icon size="md" :name="item.icon" />
                </div>
            </div>
            <div class="absolute-bottom-right actions">
                <div v-if="item.possessed">
                    <q-icon size="sm" name="edit" />
                    <q-icon size="sm" v-if="item.borrowable" name="lock_open" />
                    <q-icon size="sm" v-else name="lock" />
                    <q-icon size="sm" name="check_box" />
                </div>
                <div v-else>
                    <q-icon size="sm" name="check_box_outline_blank" />
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

    .front {
        position: absolute;
        top: 0;
        left: 0;
        background: white;
        opacity: 0.8;
        z-index: 4;

        .actions {
            padding: 5px 0;

            .q-icon {
                margin: 0 5px;
            }
        }
    }
}
</style>