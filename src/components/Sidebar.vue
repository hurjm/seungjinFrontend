<template>
    <div class="sidebar-container">
        <div class="item" @click="SelectScreen" id="0">
            Home
        </div>
        <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="1">
            프로젝트
        </div>
        <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="2">
            처방
        </div>
        <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="3">
            부자재
        </div>
        <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="4">
            생산
        </div>
    </div>
</template>

<script>
export default {
    props:{
        screenNum:Number
    },
    // data(){
    //     return{
    //         screen: this.screenNum
    //     }
    // },
    // watch: {
    //     screenNum: function(screenNum){
    //         this.screen = screenNum;
    //         console.log("screenNum " + screenNum);
    //     }
    // },
    methods:{
        SelectScreen(e){
            console.log('e.target.id');
            console.log(e.target.id);

           
            this.$emit("SelectScreen", e.target.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar-container{
        display: flex;
        // position: absolute;
        // top: 0;
        // left: 0;
        // bottom: 0;
        min-width: 200px;
        min-height: 100%;
        margin-right: 10px;
        align-items: center;
        padding-top: 50px;
        flex-direction: column;
        // background-color: #F7F6F3;
        overflow: hidden;

        .item{
            margin: 5px;
            margin-top: 10px;
            font-size: 30px;
            font-weight: 900;
            color: #000;
            transition: color 0.1s linear;
            cursor: pointer;
        }

        .item:hover{
            color: rgb(138, 138, 138);
        }
    }
    
</style>