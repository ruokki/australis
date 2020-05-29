<template>
    <div class="item">
        <div class="background">
            <q-img :src="img" :ratio="1" >
                <div v-if="name !== ''" class="absolute-bottom text-subtitle1 text-center">
                    {{ name }}
                </div>
            </q-img>
        </div>
        <div class="front"></div>
    </div>
</template>
<script>
export default {
    name: "Item",
    props: {
        img: String,
        name: String
    }
}
</script>
<style lang="scss" scoped>
.item {
    $dimension: 150px;
    width: $dimension;
    height: $dimension;
    float: left;
    position: relative;
    margin-right: 20px;
    margin-bottom: 40px;
}
</style>