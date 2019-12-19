<template>
    <div class="main-container">
        <imageUploader class="timeline" :kind="1" :projectID=projectID></imageUploader>
        <div class="element-container">
            <div class="state-container">
                <div class="list-container">
                    <div class="list-name">
                        카테고리
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="suggested" group="suggested" @start="drag=true" @end="drag=false">
                            <list-element v-for="item in suggested" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" @Select="Select"
                            :kind="2"
                            :id="item.id" 
                            :title="item.title" 
                            :note="item.note" :isOption="true"/>
                        </draggable>
                        <div class="create-btn" id="0" @click="CreateBtn">+New</div>
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        개발
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="progress" group="progress" @start="drag=true" @end="drag=false">
                            <list-element v-for="item in progress" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" @Select="Select"
                            :kind="2"
                            :id="item.id" 
                            :title="item.title" 
                            :note="item.note" :isOption="true"/>
                        </draggable>
                        <div class="create-btn" id="1" @click="CreateBtn">+New</div>
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        최종
                    </div>
                    <div class="list">
                        <draggable class="drag-area" v-model="completed" group="completed" @start="drag=true" @end="drag=false">
                            <list-element v-for="item in completed" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" @Select="Select"
                            :kind="2"
                            :id="item.id" 
                            :title="item.title" 
                            :note="item.note" :isOption="true"/>
                        </draggable>
                        <div class="create-btn" id="2" @click="CreateBtn">+New</div>
                    </div>
                </div>
            </div>
        </div>
        
        <modal v-if="showModal" @Create="Create" @Update="Update" @HideModal="HideModal"
        :kind="2"
        :mode="modalData.mode"
        :id="modalData.id"
        :title="modalData.title"
        :note="modalData.title"
        :state="modalData.state"
        />

        <modalRecipe v-if="showRecipe" @Update="Update" @Delete="Delete" @HideModal="HideModal"
        :id="modalData.id"
        :title="modalData.title"
        :note="modalData.note"
        />
    </div>           
</template>

<script>
import axios from 'axios'
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";
import draggable from 'vuedraggable';
import imageUploader from "./ImageUploader.vue"
import modalRecipe from "./ModalRecipe.vue"

export default {
    props:{
        projectID: {
            type: Number,
            default: null
        }
    },
    data(){
        return{
            suggested: [],
            progress: [],
            completed: [],
            showModal: false,
            showRecipe: false,
            modalData: []
        }
    },
    mounted(){
        this.GetRecipes();
        this.SendSideBarData();
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
            console.log("create");
            console.log(data);
            var temp ={
                list_order:function(){
                    if(data.state==0){
                        return this.suggested.length;
                    }
                    else if(data.state==1){
                        return this.progress.length;
                    }
                    else if(data.state==2){
                        return this.completed.length;
                    }
                },
                project_id: this.projectID,
                title: data.title, 
                note: data.note,
                state: data.state,
                }
                console.log("create");
            axios.post('http://localhost:80/createrecipe', temp)
            .then((res) => {
                console.log(res);
                if(res.data.result == 'success'){
                    temp.id = res.data.data;
                    if(data.state==0){
                        this.suggested.push(temp);
                    }
                    else if(data.state==1){
                        this.progress.push(temp);
                    }
                    else if(data.state==2){
                        this.completed.push(temp);
                    }
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        Update(data){
            this.HideModal();
            console.log('updaterecipe');
            console.log(this.suggested);
            console.log(data);
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
            this.HideModal();
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
            this.showRecipe = false;
        },
        ShowModal(data){
            console.log(data);
            this.modalData = data;
            this.showModal = true;
        },
        CreateBtn(e){
            console.log("createbtn");
            console.log(e.target.id);
            this.ShowModal({state:e.target.id, mode: 'create'});
        },
        Select(data){
            console.log('Select' + " " + data);
            this.modalData = data;
            this.showRecipe = true;
        },
        SendSideBarData(){
            console.log('SendSideBarData')
            this.$emit('SendSideBarData', {index: 3, list: this.suggested});
        }
    },
    components:{
        imageUploader,
        listElement,
        modal,
        draggable,
        modalRecipe
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
        text-align: center;
        width: 100%;
        padding-top:10px;
        padding-bottom:10px;
        color: rgb(187, 187, 187);
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }
    
    .create-btn:hover{
        color: rgb(99, 99, 99);
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

</style>