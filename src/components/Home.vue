<template>
    <div class="home-container">
        <sidebar class="sidebar" :screenNum="screen" @SelectScreen="SelectScreen"></sidebar>
        <div class="page-wrap">
            <customerView v-show="screen==0" @SelectCustomer='SelectCustomer'></customerView>
            <projectView v-if="screen==1" @SelectProject='SelectProject' :customerID=customerID></projectView>
            <recipeView v-if="screen==2" :projectID=projectID></recipeView>
            <subMaterialsView v-if="screen==3" :projectID=projectID></subMaterialsView>
            <productionView v-if="screen==4" :projectID=projectID></productionView>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
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
            screen: this.$screen,
            customerID: null,
            projectID: null
        }
    },
    methods: {
        SelectScreen(num){
            this.screen = num;
        },
        SelectCustomer(id){
            this.customerID = id;
            console.log("home cus " + this.customerID);
            this.screen = 1;
        },
        SelectProject(id){
            this.projectID = id;
            this.screen = 2;
        }

    },
    components:{
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
    * {
        user-select: none;
    }   

    .home-container{
        // display: flex;
        // flex-direction: row;
        // justify-content: flex-start;
        // height: 100%;
    }

    .page-wrap{
        position: absolute;
        left: 220px;
    }

    // .sidebar{
    //     display: flex;
    //     position:fixed;
    //     top: 0;
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
</style>