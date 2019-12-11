<template>
    <div class="container">
        <div class="item" v-show="screenNum==0">
            고객사
        </div>
    </div>
</template>

<script>
export default {
    props:{
        screenNum:{
            type: Number,
            defalut: 0
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        background-color: #ffffff;
        box-shadow: 0px 0px 1px;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 20px;

        .item{
            color: #666666;
            font-size: 17px;
            font-weight: 500;
        }
    }
</style>