<template>
    <div class="container">
        <div class="table">
            <div class="table-property-list">
                <div class="table-property" id="title">
                    프로젝트명
                </div>
                <div class="table-property" id="start-date">
                    시작일
                </div>
                <div class="table-property" id="launching-date">
                    런칭예정일
                </div>
            </div>
            <div class="table-element-list">
                <draggable class="drag-area" v-model="projects" group="projects" @start="drag=true" @end="drag=false">
                    <table-element class="table-element" v-for="item in projects" :key="item.id" 
                    @ShowModal="ShowModal" @Delete="Delete" @Select="Select" :isOption="true"
                    :kind="2"
                    :id="item.id" 
                    :title="item.title" 
                    :startDate="item.start_date" 
                    :launchingDate="item.launching_date"/>
                </draggable>
                <div class="create-btn" @click="CreateBtn">+New Project</div>
            </div>
        </div>
        <modal v-if="showModal" :width="250" :height="125" @Create="Create" @Update="Update" @HideModal="HideModal"
        :kind="1"
        :id="modalData.id"
        :title="modalData.title"
        :startDate="modalData.startDate"
        :launchingDate="modalData.launchingDate"
        :mode="modalData.mode"
        /> 
    </div>
</template>

<script>
import axios from 'axios'
import tableElement from "./TableElement.vue";
import modal from "./Modal.vue";
import draggable from 'vuedraggable';

export default {
    props:{
        customerID: {
            tyep: Number,
            default: null
        }
    },
    data(){
        return{
            project: '',
            childMessage: '',
            projects: [],
            currentProjectID:null,
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetList();
        this.SendSideBarData();
    },
    watch: {
        projects:function(){
            console.log('test')
            this.UpdateOrder();
        }
    },
    methods: {
        UpdateOrder(){
            let updateList = [];
            this.projects.forEach((project, index)=>{
                if(project.list_order != index){
                    project.list_order = index;
                    console.log(project);
                    updateList.push(project);
                }
            });

            if(updateList.length > 0){
                axios.post('/updateprojectsorder', updateList)
                .then((res) =>{
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            }
            
        },
        Select(data){
            this.$emit('SelectProject', data);
        },
        Create(data){
            this.HideModal();
            console.log(data.startDate.length)
            console.log(data.launchingDate)
            var temp ={
                title: data.title, 
                customer_id: this.customerID,
                state: 0, 
                start_date: data.startDate,
                launching_date: data.launchingDate,
                list_order: this.projects.length
                }
            axios.post('/createproject', temp)
            .then((res) =>{
                temp.id = res.data.data;
                this.projects.push(temp)
            }).catch((err) => {
                console.log(err)
            })
            
            console.log(temp)
        },
        Update(data){
            this.HideModal();
            console.log('UpdateProject')
            console.log(data);
            axios.post('/updateproject', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    console.log('success');
                    this.projects.forEach((project, index) => {
                        if(project.id == data.id){
                            console.log(project);
                            console.log(data);
                            project.title = data.title;
                            project.start_date = data.startDate;
                            project.launching_date = data.launchingDate;
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        Delete(id){
            axios.post('/deleteproject', {id : id})
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.projects.forEach((project, index) => {
                        if(this.projects[index].id == id){
                            this.projects.splice(index, 1);
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        GetList(){
            console.log("getprojects");
            axios.post('/getprojects', {customer_id: this.customerID})
            .then((res) => {
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    this.projects.push(res.data.data[i])
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        HideModal(){
            console.log("hide")
            this.showModal = false;
        },
        ShowModal(data){
            console.log(data);
            this.modalData = data;
            this.showModal = true;
        },
        CreateBtn(){
            console.log("createbtn");
            this.ShowModal({title: "", mode: 'create'});
        },
        SendSideBarData(){
            console.log('SendSideBarData')
            console.log(this.projects)
            this.$emit('SendSideBarData', {index: 1, list: this.projects});
        }
    },
    components:{
        tableElement,
        modal,
        draggable
    }
}
</script>

<style lang="scss" scoped>
    .create-btn{
        text-align: center;
        width: 100%;
        margin-top: 7px;
        padding: 10px;
        color: rgb(199, 199, 199);
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .create-btn:hover{
        color: rgb(99, 99, 99);
    }

    .table{
        display: flex;
        flex-direction: column;
    }

    .table-property-list{
        display: flex;
        flex-direction: row;
        border: 0.1px solid rgb(199, 199, 199);
    }

    .table-property{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
    }

    #title{
        min-width: 200px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }

    #start-date{
        max-width: 175px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #launching-date{
        max-width: 175px;
    }

    .table-element-list{
        display: flex;
        flex-direction: column;;
        border-right: 0.1px solid rgb(199, 199, 199);
        border-left: 0.1px solid rgb(199, 199, 199);
        border-bottom: 0.1px solid rgb(199, 199, 199);
    }


    .table-element{
        // min-width: 250px;
        // min-height: 250px;
    }
</style>