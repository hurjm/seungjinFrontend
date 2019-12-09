<template>
    <div>
        <div class="create-btn" @click="CreateBtn">New Project</div>
        <div class="list">
            <list-element class="list-element" v-for="item in projects" :key="item.id" 
            @ShowModal="ShowModal" @Delete="Delete" @Select="Select" :id="item.id" :title="item.title" :isOption="true"/>
        </div>
        <modal v-if="showModal" :width="250" :height="125" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/> 
    </div>
</template>

<script>
import axios from 'axios'
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";

export default {
    props:{
        customerID: Number
    },
    data(){
        return{
            project: '',
            childMessage: '',
            projects: [],
            currentCustomerID: this.customerID,
            currentProjectID:null,
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetList()
    },
    watch: {
        customerID: function(customerID){
            this.currentCustomerID = customerID;
            console.log("cus " + customerID);
        }
    },
    methods: {
        Select(id){
            this.$emit('SelectProject', id)
        },
        Create(data){
            this.HideModal();
            var temp ={
                title: data.title, 
                customer_id: this.currentCustomerID,
                state: 0, 
                startdate: Date.now(),
                enddate: null
                }
            axios.post('http://localhost:80/addproject', temp)
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
            axios.post('http://localhost:80/updateproject', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.projects.forEach((project, index) => {
                        if(this.projects[index].id == data.id){
                            this.projects[index].title = data.title;
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        Delete(id){
            axios.post('http://localhost:80/deleteproject', {id : id})
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
        GetList(event, data){
            console.log("getprojects");
            axios.post('http://localhost:80/getprojects', {customer_id: this.currentCustomerID})
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
            console.log(this.showModal);
        },
        CreateBtn(){
            console.log("createbtn");
            this.ShowModal({mode: 'create'});
        }
    },
    components:{
        listElement,
        modal
    }
}
</script>

<style lang="scss" scoped>
    .create-btn{
        background-color: #5f5ab9;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
        width: fit-content;
        margin-top: 7px;
        padding: 10px;
        color: #ffffff;
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .list{
        display: flex;
        flex-direction: row;
    }

    .list-element{
        min-width: 250px;
        min-height: 250px;
    }

    .select-project{
        float: left;
    }

</style>