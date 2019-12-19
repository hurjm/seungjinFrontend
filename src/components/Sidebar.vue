<template>
    <div class="sidebar-container">
        <div class="head">
            <img src="../assets/images/logo.png" alt="sorry;"/>
        </div>
        <div class="item-list">
            <div class="item" @click="SelectScreen">
                <div class="item-name" id="0">
                    고객사  
                </div>
            </div>
            
            <div class="item">
                <div class="item-name" id="1" @click="SelectScreen">
                    프로젝트 
                    <span v-show="customerName != null" id="1">{{'(' + customerName + ')'}}</span>
                </div>
                <div class="item-content-container">
                    <div class="item-content-list" v-if="projectList!=null">
                        <sidebarItem class="item-content" :id="['project' + item.id]" v-for="item in projectList" :key="item.id"
                        @Select="SelectProject"
                        :itemId="item.id"
                        :title="item.title"
                        />
                    </div>
                </div>
            </div>

            <div class="item" @click="SelectScreen">
                <div class="item-name" id="2">
                    처방
                    <span v-show="projectName != null" id="2">{{'(' + projectName + ')'}}</span>
                </div>
            </div>
            <div class="item">
                <div class="item-name-not" id="3">
                    부자재
                </div>
                <div class="item-content-container">
                    <div class="item-content-list" v-if="recipeList!=null">
                        <sidebarItem class="item-content" :id="['recipe' + item.id]" v-for="item in recipeList" :key="item.id"
                        @Select="SelectRecipe"
                        :itemId="item.id"
                        :title="item.title"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="item" @click="SelectScreen">
                <div class="item-name" id="4">
                    생산
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import sidebarItem from './SidebarItem.vue';
export default {
    props:{
        customerName: null,
        projectName: null,
        projectList:null,
        recipeList:null
    },
    data(){
        return{
            clicked:null
        }
    },
    mounted(){
        console.log('mounted')
        console.log(this.recipeList)
    },
    methods:{
        SelectScreen(e){
            console.log('SelectScreen');
            console.log(e.target.id);
            this.SetClicked(e.target);
            this.$emit("SelectScreen", e.target.id);
            // if(e.target.nextSibling.childNodes[0].style.marginTop != '0px'){
            //     e.target.nextSibling.childNodes[0].style.marginTop = '0';
            // }
            // else{
            //     e.target.nextSibling.childNodes[0].style.marginTop = '-100%';
            // }
        },
        Dropdown(){
            console.log('dropdown');
        },
        SelectProject(data){
            this.SetClicked(data.e.target.parentNode);
            this.$emit("SelectProject", data);
        },
        SelectRecipe(data){
            this.SetClicked(data.e.target.parentNode);
            this.$emit("SelectRecipe", {id: data.id});
        },
        SetClicked(target){
            console.log("SetClicked");
            console.log(target);
            if(this.clicked!=null){
                this.clicked.style.backgroundColor = "";
            }
            this.clicked = target;
            this.clicked.style.backgroundColor = "#506d91";
        }
    },
    components:{
        sidebarItem
    }
}
</script>

<style lang="scss" scoped>
    .sidebar-container{
        background-color: #232e3d;
        display: flex;
        flex-direction: column;
        z-index: 1;
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

    .item{
        cursor: pointer;
    }

    .item-name{
        padding-top: 5px;
        padding-bottom: 3px;
        padding-left: 20px;
        transition: background-color 0.1s linear;

        &-not{
            padding-top: 5px;
            padding-bottom: 3px;
            padding-left: 20px;
            cursor: default;
        }
    }

    .item-name:hover {
        background-color: #506d91;
    }


    .item-content-container{
        overflow: hidden;
    }

    .item-content-list{
        width: 100%;
        // margin-top:-100%;
        // transition: margin-top 0.125s ease;
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