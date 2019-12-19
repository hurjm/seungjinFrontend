<template>
    <div class="main-container">
        <imageUploader class="timeline" :kind="1" :projectID=projectID></imageUploader>

        <div class="element-container">
            <div class="create-btn" @click="CreateBtn">New Code</div>
            <main class="state-container">
                <div class="list-container">
                    <div class="list-name">
                        최종 처방
                    </div>
                    <div class="list" >
                        <list-element v-for="item in recipeFin" :key="item.id"
                        :id="item.id" :title="item.title" :note="item.note"/>
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        최종 부자재  
                    </div>
                    <div class="list">
                        
                        <list-element v-for="item in subMaterialFin" :key="item.id"
                        :id="item.id" :title="item.title" :note="item.note"/>
                    </div>
                </div>
                <div class="list-container">
                    <div class="list-name">
                        생산코드
                    </div>
                    <div class="list" >
                        <draggable class="drag-area" v-model="productionCodes" group="people" @start="drag=true" @end="drag=false">
                            <list-element v-for="item in productionCodes" :key="item.id" 
                            @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                        </draggable>
                    </div>
                </div>
            </main>

            <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/> 
        </div> 
    </div>           
</template>

<script>
import axios from 'axios'
import imageUploader from "./ImageUploader.vue";
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";
import draggable from 'vuedraggable';

export default {
    props:{
        projectID: {
            type: Number,
            default: null
        }
    },
    data(){
        return{
            recipeFin: [],
            subMaterialFin: [],
            productionCodes: [],
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetList();
    },
    watch:{
        productionCodes:function(){
            console.log('suggested');
            console.log(this.suggested);
            this.UpdateState(this.productionCodes);
        }
    },
    methods:{
        UpdateState(list){
            let updateList = [];
            list.forEach((data, index) => {
                if(data.list_order != index){
                    data.list_order = index;
                    updateList.push(data);
                }
            });

            if(updateList.length > 0){
                axios.post('http://localhost:80/updateproductioncodestate', {data: updateList})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        GetList(){
            axios.post('http://localhost:80/getproductions', {projectID : this.projectID, state: 2})
            .then((res) => {
                console.log("res")
                console.log(typeof(this.recipeFin));
                console.log(typeof(res.data.recipes));
                this.recipeFin = res.data.recipes;
                this.subMaterialFin = res.data.subMaterials
                this.productionCodes = res.data.productionCodes;
                console.log('productionCodes')
                console.log(this.productionCodes)

            }).catch((err) => {
                console.log(err)
            })
        },
        Create(data){
            console.log("create");
            this.showModal = false;
            let temp ={
                list_order: this.productionCodes.length,
                title: data.title, 
                note: data.note,
                project_id: this.projectID,
                startdate: Date.now(),
                enddate: null
                }
            axios.post('http://localhost:80/createproductioncode', temp)
            .then((res) => {
                console.log(res);
                if(res.data.result == 'success'){
                    temp.id = res.data.data;
                    this.productionCodes.push(temp);
                    console.log(this.productionCodes);
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        Update(data){
            this.HideModal();
            console.log("update")
            console.log(data)
            let temp ={
                id: data.id,
                project_id: this.projectID,
                title: data.title, 
                note: data.note
                }
            axios.post('http://localhost:80/updateproductioncode', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.productionCodes.forEach((project, index) => {
                        console.log(index);
                        console.log(project.id);
                        if(project.id == data.id){
                            this.productionCodes.splice(index, 1, temp);
                        }
                    });
                    this.productionCode
                }
                
                console.log(this.productionCodes)
            }).catch((err) => {
                console.log(err);
            })
        },
        Delete(id){
            console.log("delete");
            axios.post('http://localhost:80/deleteproductioncode', {id : id})
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.productionCodes.forEach((project, index) => {
                        if(this.productionCodes[index].id == id){
                            this.productionCodes.splice(index, 1);
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
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