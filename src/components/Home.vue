<template>
    <div class="home-container">
        <headbar class="headbar" :screenNum="screen"/>
        <sidebar class="sidebar"
        :customerName="customerName" 
        :projectName="projectName"
        :projectList="projectList"
        :recipeList="recipeList"
        @SelectScreen="SelectScreen"
        @SelectProject="SelectProject"
        @SelectRecipe="SelectRecipe"/>
        <div class="page-wrap">
            <customerView v-if="screen==0" 
            @SelectCustomer='SelectCustomer'
            />
            <projectView v-if="screen==1" 
            :customerID="customerID"
            @SelectProject='SelectProject' 
            @SendSideBarData='SendSideBarData'
            />
            <recipeView v-if="screen==2" 
            :key="projectID"
            :projectID="projectID" 
            @SendSideBarData="SendSideBarData"
            />
            <subMaterialsView v-if="screen==3" 
            :key="recipeID"
            :projectID="projectID" 
            :recipeID="recipeID"
            />
            <productionView v-if="screen==4" 
            :projectID="projectID"
            />
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import headbar from './Header.vue';
import sidebar from './Sidebar.vue';
import projectView from './ProjectView.vue';
import recipeView from "./RecipeView.vue";
import customerView from "./CustomerView.vue";
import subMaterialsView from "./SubMaterialsView.vue";
import productionView from "./ProductionView.vue";

export default {
    name: 'Home',
    data(){
        return{
            screen: 0,
            customerID: {
                type: Number,
                default: null
            },
            customerName:null,
            projectName:null,
            projectList:null,
            recipeList:null,
            projectID: {
                type: Number,
                default: null
            },
            recipeID: null
        }
    },
    methods: {
        SelectScreen(num){
            this.screen = num;
        },
        SelectCustomer(data){
            this.customerID = data.id;
            this.customerName = data.title;
            this.projectID = null;
            this.recipeID = null;
            this.projectList = null;
            this.recipeList = null;
            this.projectName = null;
            console.log("home cus " + this.customerID);
            this.screen = 1;
        },
        SelectProject(data){
            this.projectID = data.id;
            this.projectName = data.title;
            this.screen = 2;
        },
        SelectRecipe(data){
            console.log("SelectRecipe");
            console.log(data);
            this.recipeID = data.id;
            this.screen = 3;
        },
        SendSideBarData(data){
            console.log('SendSideBarData')
            console.log(data)
            if(data.index == 1){
                this.projectList = data.list;
            }
            else if(data.index == 3){
                this.recipeList = data.list;
                console.log(this.recipeList);
            }
        }
    },
    components:{
        headbar,
        sidebar,
        projectView,
        recipeView,
        customerView,
        subMaterialsView,
        productionView
    }
}
</script>

<style lang="scss" >
    @import url(//cdn.jsdelivr.net/gh/moonspam/NanumBarunGothic@1.0/nanumbarungothicsubset.css);
    @import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);

    * {
        user-select: none;
        font-size: 12px;
    } 

    input{
        font-family: 'NanumBarunGothic', sans-serif;
    }

    input:focus{
        outline: none;
    }

    textarea{
        font-family: 'NanumBarunGothic', sans-serif;
    }

    textarea:focus{
        outline: none;
    }
    .home-container{
        display: flex;
        flex-direction: column;
        font-family: 'NanumBarunGothic', sans-serif;
        // justify-content: flex-start;
        // height: 100%;
    }

    .headbar{
        position: fixed;
        z-index: 2;
        top: 0;
        left: 234.5px;
        height: 55px;
        width: 100%;
        // margin-left: 235px;
    }

    .page-wrap{
        width: 80%;
        height: 100%;
        margin-top: 55px;
        margin-bottom: 40px;
        margin-left: 235px;
    }

    .sidebar{
        position: fixed;
        top: 0;
        left: 0;
        margin-right: 10px;
        width: 234.5px;
        min-height: 100%;
    }

    

    // @font-face { font-family: 'NanumBarunGothic';
    // src: url('../fonts/NanumBarunGothic.eot');
    // src: url('../fonts/NanumBarunGothic.eot') format('embedded-opentype'),
    // url('../fonts/NanumBarunGothic.woff') format('woff');
    // }

</style>