<template>
    <div>
        <div class="list">
            <div class="create-btn" @click="CreateBtn">
                +New Customer
            </div>
            <draggable class="drag-area" v-model="customers" group="customers" @start="drag=true" @end="drag=false">
                <list-element class="list-element" v-for="item in customers" :key="item.id" 
                @ShowModal="ShowModal" @Delete="Delete" @Select="Select" 
                :isOption="true"
                :kind="0"
                :id="item.id" 
                :title="item.title"
                :photo="item.photo"/>
            </draggable>
        </div>
        
        <modal v-if="showModal" :width="250" :height="125" @Create="Create" @Update="Update" @HideModal="HideModal"
        :kind="0"
        :mode="modalData.mode"
        :id="modalData.id"
        :title="modalData.title"
        :photo="modalData.photo"
        /> 
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
    watch: {
        customers:function(){
            console.log('test')
            this.UpdateOrder();
        }
    },
    methods: {
        UpdateOrder(){
            let updateList = [];
            this.customers.forEach((item, index)=>{
                if(item.list_order != index){
                    item.list_order = index;
                    updateList.push(item);
                }
            });

            if(updateList.length > 0){
                axios.post('/updatecustomersorder', updateList)
                .then((res) =>{
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        Select(data){
            console.log("cusView " + data.id);
            this.$emit('SelectCustomer', {id: data.id, title: data.title});
        },
        Create(data){   
            this.HideModal();         
            console.log("create");
            console.log(data.photo);
            let photo;
            
            console.log(photo);
            let temp ={
                title: data.title
            }

            axios.post('/createcustomer', temp)
            .then(res => {
                console.log("add " + res.data.data);
                temp.id = res.data.data;

                if(data.photo != null){
                    let temp_img = data.photo.slice(0, data.photo.size, data.photo.type);
                    data.photo = new File([temp_img], temp.id, {type: String(data.photo.type)});

                    this.UploadPhoto(data.photo)
                    .then(res=>{
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            temp.photo = e.target.result;
                            this.customers.push(temp);
                            };
                        reader.readAsDataURL(data.photo);
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                }
                else{
                    this.customers.push(temp)
                }
            }).catch(err => {
                console.log(err)
            })
            console.log(temp)
        },
        Update(data){
            this.HideModal();
            console.log("update");
            console.log(data);
            axios.post('/updatecustomer', data)
            .then(res => {
                console.log(res);
                if(res.data.result == "success"){
                    if(data.photo != null){
                        let file
                        console.log('data.photo')
                        console.log(data.photo)
                        console.log(typeof(data.photo))
                        if(typeof(data.photo)=="string"){
                            file = this.dataURLtoFile(data.photo, data.id);
                        }
                        else{
                            let temp_img = data.photo.slice(0, data.photo.size, data.photo.type);
                            console.log('temp_img')
                            console.log(temp_img)
                            file = new File([temp_img], data.id, {type: String(data.photo.type)});
                            
                        }
                         
                        console.log('file');
                        console.log(file);
                        this.UploadPhoto(file)
                        .then(res=>{
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                data.photo = e.target.result;
                                this.customers.forEach((project, index) => {
                                    if(this.customers[index].id == data.id){
                                        this.customers.splice(index, 1, data);
                                        return;
                                    }
                                });
                            };
                            reader.readAsDataURL(file);
                            
                        })
                        .catch(err=>{
                            console.log("error");
                        })
                    }
                    else{
                        this.customers.forEach((project, index) => {
                            if(this.customers[index].id == data.id){
                                this.customers.splice(index, 1, data);
                                return;
                            }
                        });
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        },
        Delete(id){
            console.log("del " + id);
            axios.post('/deletecustomer', {id : id})
            .then(res => {
                console.log("res");
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
            let temp_list = [];
            axios.get('/getcustomers')
            .then(res => {
                console.log(res);
                temp_list = res.data.data;
                console.log('images');
                axios.post('/getimage', {type: 0})
                .then(res => {
                    console.log(res);
                    temp_list.forEach(item => {
                        res.data.data.forEach(data => {
                            if(item.id == data.id){
                                item.photo = data.file;
                            }
                        })
                        this.customers.push(item);
                    })
                    console.log(this.customers);
                }).catch(err => {
                    console.log(err);
                });
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
        },
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], filename, {type:mime});
        },
        UploadPhoto(photo){
            console.log("UploadPhoto");
            const formData = new FormData();
            formData.append('file', photo);
            console.log("formData");
            console.log(formData);

            return axios.post('/uploadcustomerphoto', formData)
            .then(res => {
                console.log("res");
                console.log(res);
            })
            .catch(err => {
                console.log("err");
                console.log(err);
            })
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
        background-color: #4f5467;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
        width: fit-content;
        height: fit-content;
        margin-bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        color: #ffffff;
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .create-btn:hover{
        background-color: #333642;
        box-shadow: 2px 2px 10px rgb(187, 187, 187);
    }

    .list-element{
        // min-width: 250px;
        // min-height: 250px;
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