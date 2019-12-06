<template>
    <div>
        <imageUploader :projectID=projectID />
        <addMaterials @send-data="Create"></addMaterials>
        <div class="submat-container">
            <div class="suggested">
                제안
                <draggable v-model="suggested" group="people" @start="drag=true" @end="drag=false">
                            <div class="recipe-list" v-for="recipe in suggested" :key="recipe.id">
                                <recipe-element :id=recipe.id :initTitle=recipe.title :initNote=recipe.note @update="Update" @delete="Delete"></recipe-element>
                            </div>
                </draggable>   
            </div>
            <div class="progress">
                개발
                <draggable v-model="progress" group="people" @start="drag=true" @end="drag=false">   
                            <div class="recipe-list" v-for="recipe in progress" :key="recipe.id">
                                <recipe-element :id=recipe.id :initTitle=recipe.title :initNote=recipe.note @update="Update" @delete="Delete"></recipe-element>
                            </div>
                </draggable>
            </div>
            <div class="completed">
                최종
                <draggable v-model="completed" group="people" @start="drag=true" @end="drag=false">
                            <div class="recipe-list" v-for="recipe in completed" :key="recipe.id">
                                <recipe-element :id=recipe.id :initTitle=recipe.title :initNote=recipe.note @update="Update" @delete="Delete"></recipe-element>
                            </div>
                </draggable>
            </div> 
            <fileUploader class="file-uploader" :projectID=projectID />   
        </div>
    </div>           
</template>

<script>
import addMaterials from "./AddMaterials.vue"
import imageUploader from "./ImageUploader.vue"
import fileUploader from "./FileUploader.vue"
import recipeElement from './RecipeElement.vue'
import draggable from 'vuedraggable';
import axios from 'axios'

export default {
    props:{
        projectID: Number
    },
    data(){
        return{
            suggested: [],
            progress: [],
            completed: []
        }
    },
    mounted(){
        this.GetData();
        console.log('mounted');
        console.log(this.projectID);
        console.log(this.$test);
    },
    methods:{
        Create(data){
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
        GetData(){
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
        }
    },
    components:{
        imageUploader,
        fileUploader,
        addMaterials,
        recipeElement,
        draggable
    }
}
</script>

<style lang="scss" scoped>
    .submat-container{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        
        // .item:nth-child(1){
        //     flex-grow: 1;
        // }
        // .item:nth-child(2){
        //     flex-grow: 1;
        // }
        // .item:nth-child(3){
        //     flex-grow: 1;
        // }
        // .item:nth-child(4){
        //     flex-grow: 1;
        // }
    }

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

    .file-uploader{
    }

</style>