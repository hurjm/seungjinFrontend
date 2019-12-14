<template>
    <div class="sidebar-container">
        <div class="head">
            <img src="../assets/images/logo.gif" alt="sorry;"/>
        </div>
        <div class="item-list">
            <div class="item" @click="SelectScreen">
                <div class="item-name" id="0">
                    고객사  
                </div>
                <div class="item-content-container">
                    <div class="item-content-list">
                        <div class="item-content">
                            test
                        </div>
                        <div class="item-content">
                            test
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="item" @click="SelectScreen">
                <div class="item-name" id="1">
                    프로젝트
                </div>
                <div class="item-content-container">
                    <div class="item-content-list">
                        <div class="item-content">
                            test
                        </div>
                        <div class="item-content">
                            test
                        </div>
                    </div>
                </div>
            </div>


            <div class="item" @click="SelectScreen">
                <div class="item-name" id="2">
                    처방
                </div>
                <div class="item-content-container">
                    <div class="item-content-list">
                        <div class="item-content">
                            test
                        </div>
                        <div class="item-content">
                            test
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" @click="SelectScreen">
                <div class="item-name" id="3">
                    부자재
                </div>
                <div class="item-content-container">
                    <div class="item-content-list">
                        <div class="item-content">
                            test
                        </div>
                        <div class="item-content">
                            test
                        </div>
                    </div>
                </div>
            </div>
            <div class="item" @click="SelectScreen">
                <div class="item-name" id="4">
                    생산
                </div>
                <div class="item-content-container">
                    <div class="item-content-list">
                        <div class="item-content">
                            test
                        </div>
                        <div class="item-content">
                            test
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="2">
                처방
            </div>
            <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="3">
                부자재
            </div>
            <div class="item" v-show="screenNum > 1" @click="SelectScreen" id="4">
                생산
            </div> -->
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
            console.log('SelectScreen');
            console.log(e.target.id);
            //item dropdown
            if(e.target.nextSibling.childNodes[0].style.marginTop != '0px'){
                e.target.nextSibling.childNodes[0].style.marginTop = '0';
            }
            else{
                e.target.nextSibling.childNodes[0].style.marginTop = '-100%';
            }
            this.$emit("SelectScreen", e.target.id);
        },
        Dropdown(){
            console.log('dropdown');
        }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar-container{
        background-color: #232e3d;
        display: flex;
        flex-direction: column;
        // bottom: 0;
        align-items: center;
    }

    .head{
        background-color: #19222d;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color:#ffffff;
        height: 55px;
        width: 100%;
    }

    .item-list{
        width: 100%;
        margin-top: 20px;
        color: #ffffff;
        font-size: 15px;
        font-weight: 300;
    }

    input[type=checkbox]{
        display: none;
    }

    input:checked + label .item{
            margin-top: 0;
        .item-content-container{
            .item-content-list{
            margin-top: 0;

            }
        }
    }

    .item{
        cursor: pointer;
    }
    .item-name{
        padding: 5px 20px;
        transition: background-color 0.1s linear;
    }

    .item-name:hover {
        background-color: #506d91;
    }


    .item-content-container{
        overflow: hidden;
    }

    .item-content-list{
        width: 100%;
        margin-top:-100%;
        transition: margin-top 0.125s ease;
    }

    .item-content{
        width: 100%;
        padding-left: 40px;
        padding-bottom: 2px;
    }

    .item-content:hover{
        background-color: #506d91;
    }
</style>