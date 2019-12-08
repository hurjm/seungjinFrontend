<template>
    <div>
        <imageUploader class="timeline1" :projectID=projectID></imageUploader>

        <div class="create-btn" @click="CreateBtn">New Recipe</div>
        <main class="state-container">
            <div class="suggested">
                제안
                <div class="list">
                    <draggable v-model="suggested" group="people" @start="drag=true" @end="drag=false">   
                            <list-element v-for="item in suggested" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                    </draggable>   
                 </div>
            </div>
            <div class="progress">
                개발
                <div class="list">
                    <draggable v-model="progress" group="people" @start="drag=true" @end="drag=false">   
                            <list-element v-for="item in progress" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                    </draggable>
                </div>
            </div>
            <div class="completed">
                최종
                  <div class="list">
                    <draggable v-model="completed" group="people" @start="drag=true" @end="drag=false">
                            <list-element v-for="item in completed" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                    </draggable>
                </div>
            </div>
        </main>
        
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
            let list = [];
            this.suggested.forEach(data => {
                if(data.state != 0){
                    data.state = 0;
                    list.push(data);
                }
            });

            if(list.length > 0){
                axios.post('http://localhost:80/updaterecipestate', {state: 0, data: list})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        progress:function(){
            console.log('progress');
            console.log(this.progress);
            let list = [];
            this.progress.forEach(data => {
                if(data.state != 1){
                    data.state = 0;
                    list.push(data);
                }
            });

            if(list.length > 0){
                axios.post('http://localhost:80/updaterecipestate', {state: 1, data: list})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        completed:function(){
            console.log('completed');
            console.log(this.completed);
            let list = [];
            this.completed.forEach(data => {
                if(data.state != 2){
                    data.state = 0;
                    list.push(data);
                }
            });

            if(list.length > 0){
                axios.post('http://localhost:80/updaterecipestate', {state: 2, data: list})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    },
    methods:{
        UpdateState(state){

        },
        Create(data){
            this.HideModal();
            var temp ={
                title: data.title, 
                note: data.note,
                project_id: this.projectID,
                timeline: null,
                state: 0, 
                startdate: Date.now(),
                enddate: null
                }
                console.log("create");
            axios.post('http://localhost:80/addrecipe', temp)
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

    .suggested,
    .progress,
    .completed{
        border: 3px solid #000;
        padding:10px;
        min-width: 100px;
        min-height: 300px;
        float: left;
        margin: 5px;
    }

    .timeline1{
    }
</style>