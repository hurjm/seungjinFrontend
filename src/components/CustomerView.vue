<template>
    <div>
        <div class="list">
            <draggable class="drag-area" v-model="productionCodes" group="people" @start="drag=true" @end="drag=false">
                <list-element class="list-element" v-for="item in this.customers" :key="item.id" 
                @ShowModal="ShowModal" @Delete="Delete" @Select="Select" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
            </draggable>
            <div class="create-btn" @click="CreateBtn"/>
        </div>
        
        <modal v-if="showModal" :width="250" :height="125" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/> 
    </div>
</template>

<script>
import axios from 'axios'
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";
import draggable from 'vuedraggable';

export default {
    props:{
        cutomerID: Number
    },
    data(){
        return{
            customers: [],
            showModal: false,
            modalData: []
        }
    },
    created(){
        this.GetList()
    },
    methods: {
        Select(id){
            console.log("cusView " + id);
            this.$emit('SelectCustomer', id);
        },
        Create(data){   
            this.HideModal();         
            var temp ={
                title: data.title
                }

            axios.post('http://localhost:80/addcustomer', temp)
            .then(res => {
                console.log("add " + res.data.data);
                temp.id = res.data.data;
                this.customers.push(temp)
            }).catch(err => {
                console.log(err)
            })
            console.log(temp)
        },
        Update(data){
            this.HideModal();
            console.log("update");
            console.log(data);
            axios.post('http://localhost:80/updatecustomer', data)
            .then(res => {
                console.log(res);
                if(res.data.result == "success"){
                    this.customers.forEach((project, index) => {
                        if(this.customers[index].id == data.id){
                            this.customers.splice(index, 1, data);
                            return;
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        Delete(id){
            console.log("del " + id);
            axios.post('http://localhost:80/deletecustomer', {id : id})
            .then(res => {
                console.log(res);
                if(res.data.result == "success"){
                    this.customers.forEach((project, index) => {
                        console.log(index);
                        if(this.customers[index].id == id){
                            console.log(index);
                            console.log(this.customers[index].id);
                            this.customers.splice(index, 1);
                            return;
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
            })
        },
        GetList(){
            axios.get('http://localhost:80/getcustomers')
            .then(res => {
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    this.customers.push(res.data.data[i])
                }
            }).catch(err => {
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
        draggable,
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
        min-width: 250px;
        min-height: 250px;
        margin: 10px;
        padding: 10px;
        box-sizing: border-box;
        // width: fit-content;
        // margin-top: 7px;
        // padding: 10px;
        color: #ffffff;
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .create-btn:hover{
        box-shadow: 2px 2px 10px rgb(187, 187, 187);
    }

    .list-element{
        min-width: 250px;
        min-height: 250px;
    }

    .list{
        // display: flex;
        // flex-direction: row;
        // flex-wrap: wrap;
    }

    .drag-area{
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
</style>