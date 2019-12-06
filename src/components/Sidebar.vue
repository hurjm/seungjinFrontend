<template>
    <div class="sidebar-container">
    <!-- <Push 
    width="200" 
    disableEsc="true" 
    isOpen="true" 
    disableOutsideClick="true" 
    noOverlay="true"
    :burgerIcon="false" 
    :crossIcon="false"
    > -->
    <div  @click="SelectScreen" id="0">
        Home
    </div>
    <div v-if="screen>1" @click="SelectScreen" id="1">
        프로젝트
    </div>
    <div v-if="screen>1" @click="SelectScreen" id="2">
        처방
    </div>
    <div v-if="screen >1" @click="SelectScreen" id="3">
        부자재
    </div>
    <div v-show="screen>1" @click="SelectScreen" id="4">
        생산
    </div>
    </div>
</template>

<script>
// import { Push } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
    props:{
        screenNum:Number
    },
    data(){
        return{
            screen: this.screenNum
        }
    },
    watch: {
        screenNum: function(screenNum){
            this.screen = screenNum;
            console.log("screenNum " + screenNum);
        }
    },
    methods:{
        SelectScreen(e){
            console.log('e.target.id');
            console.log(e.target.id);
            // this.$screen = e.target.id;
            this.$emit("SelectScreen", e.target.id);
        }
    },
    components: {
        // Push // Register your component
    }
}
</script>

<style lang="scss">
    // .sidebar-container{
    //     display: flex;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     bottom: 0;
    //     min-width: 200px;
    //     min-height: 100%;
    //     margin-right: 10px;
    //     align-items: center;
    //     padding-top: 50px;
    //     flex-direction: column;
    //     background-color: #F7F6F3;
    //     font-size: 30px;
    //     font-weight: 700;
    //     overflow: hidden;

    //     div{
    //         margin: 5px;
    //     }

    // }
    // .bm-menu{
    //     background-color:#F7F6F3;
    // }

    // .bm-item-list > span {
    //     font-weight: 600;
    //     color: #000;
    //     cursor: pointer;
    // }
</style>