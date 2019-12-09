<template>
    <div class="main-container">
        <imageUploader class="timeline" :projectID=projectID></imageUploader>
        <div class="element-container">
            <div class="create-btn" @click="CreateBtn">New Recipe</div>
            <div class="state-container">
                <div class="list-container">
                    <div class="list-name">
                        제안
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="suggested" group="people" @start="drag=true" @end="drag=false">   
                                <list-element v-for="item in suggested" :key="item.id" 
                                @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                        </draggable>   
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        개발
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="progress" group="people" @start="drag=true" @end="drag=false">   
                                <list-element v-for="item in progress" :key="item.id" 
                                @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                        </draggable>
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        최종
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="completed" group="people" @start="drag=true" @end="drag=false">
                                <list-element v-for="item in completed" :key="item.id" 
                                @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        
        
        <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/>
    </div>           
</template>

<script>
import axios from 'axios'
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";

import imageUploader from "./ImageUploader.vue"
import draggable from 'vuedraggable';


export default {
    props:{
        projectID: Number
    },
    data(){
        return{
            suggested: [],
            progress: [],
            completed: [],
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetRecipes();
    },
    watch:{
        suggested:function(){
            console.log('suggested');
            console.log(this.suggested);
            this.UpdateState(0, this.suggested);
        },
        progress:function(){
            console.log('progress');
            console.log(this.progress);
            this.UpdateState(1, this.progress);
        },
        completed:function(){
            console.log('completed');
            console.log(this.completed);
            this.UpdateState(2, this.completed);
        }
    },
    methods:{
        UpdateState(state, list){
            let updateList = [];
            list.forEach((data, index) => {
                if(data.state != state || data.list_order != index){
                    data.state = state;
                    data.list_order = index;
                    updateList.push(data);
                }
            });

            if(updateList.length > 0){
                axios.post('http://localhost:80/updaterecipestate', {state: state, data: updateList})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        Create(data){
            this.HideModal();
            var temp ={
                list_order: this.suggested.length,
                title: data.title, 
                note: data.note,
                project_id: this.projectID,
                timeline: null,
                state: 0, 
                startdate: Date.now(),
                enddate: null
                }
                console.log("create");
            axios.post('http://localhost:80/createrecipe', temp)
            .then((res) => {
                console.log(res);
                if(res.data.result == 'success'){
                    temp.id = res.data.data;
                    this.suggested.push(temp);
                    console.log(this.suggested);
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        Update(data){
            this.HideModal();
            axios.post('http://localhost:80/updaterecipe', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.suggested.forEach((project, index) => {
                        if(this.suggested[index].id == data.id){
                            this.suggested[index].title = data.title;
                            this.suggested[index].note = data.note;
                            return;
                        }
                    });
                    this.progress.forEach((project, index) => {
                        if(this.progress[index].id == data.id){
                            this.progress[index].title = data.title;
                            this.progress[index].note = data.note;
                            return;
                        }
                    });
                    this.completed.forEach((project, index) => {
                        if(this.completed[index].id == data.id){
                            this.completed[index].title = data.title;
                            this.completed[index].note = data.note;
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        Delete(id){
            console.log("delete");
            axios.post('http://localhost:80/deleterecipe', {id : id})
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.suggested.forEach((project, index) => {
                        if(this.suggested[index].id == id){
                            this.suggested.splice(index, 1);
                            return;
                        }
                    });
                    this.progress.forEach((project, index) => {
                        if(this.progress[index].id == id){
                            this.progress.splice(index, 1);
                            return;
                        }
                    });
                    this.completed.forEach((project, index) => {
                        if(this.completed[index].id == id){
                            this.completed.splice(index, 1);
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        GetRecipes(){
            axios.post('http://localhost:80/getrecipes', {id : this.projectID})
            .then((res) => {
                console.log(res)
                for(var i=0; i<res.data.data.length; i++){
                    if(res.data.data[i].state == 0){
                        this.suggested.push(res.data.data[i]);
                    }
                    else if(res.data.data[i].state == 1){
                        this.progress.push(res.data.data[i]);
                    }
                    else if(res.data.data[i].state == 2){
                        this.completed.push(res.data.data[i]);
                    }
                }
                console.log(this.suggested)
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
            this.ShowModal({note: "", mode: 'create'});
        }
    },
    components:{
        imageUploader,
        draggable,
        listElement,
        modal
    }
}
</script>

<style lang="scss" scoped>
    .main-container{
    }

    .element-container{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

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
    
    .create-btn:hover{
        background-color: #7e7abb;
    }

    .state-container{
        display: flex;
    }

    .list-container{
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
        padding:10px;
        width: 100%;
        min-height: 300px;
        margin-top: 7px;
        margin-right: 30px;
    }

    .list{
        display: flex;
        flex-direction: column;
    }

    .list-name{
        margin-left: 10px;
        margin-bottom: 5px;
        font-weight: 600;
    }

    .drag-area{
        min-height: 300px;
        overflow: hidden;
    }

</style>