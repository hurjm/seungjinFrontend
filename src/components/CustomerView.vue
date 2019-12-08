<template>
    <div>
        <div class="create-btn" @click="CreateBtn">New Customer</div>
        <div class="list">
            <list-element v-for="item in this.customers" :key="item.id" 
            @ShowModal="ShowModal" @Delete="Delete" @Select="Select" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
        </div>
        
        <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/> 
    </div>
</template>

<script>
import axios from 'axios'
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";

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
        listElement,
        modal
    }
}
</script>

<style lang="scss" scoped>
    .list{
        display: flex;
        flex-direction: row;
    }
</style>