<template>
    <div class="home-container">
        <headbar class="headbar" :screenNum="screen"/>
        <sidebar class="sidebar" :screenNum="screen" @SelectScreen="SelectScreen"></sidebar>
        <div class="page-wrap">
            <customerView v-if="screen==0" @SelectCustomer='SelectCustomer'></customerView>
            <projectView v-if="screen==1" @SelectProject='SelectProject' :customerID=customerID></projectView>
            <recipeView v-if="screen==2" :projectID=projectID></recipeView>
            <subMaterialsView v-if="screen==3" :projectID=projectID></subMaterialsView>
            <productionView v-if="screen==4" :projectID=projectID></productionView>
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