<template>
    <div>
        <imageUploader class="timeline" :projectID=projectID></imageUploader>

        <div class="create-btn" @click="CreateBtn">New Code</div>
        <main class="state-container">
            <div class="list-container">
                최종 처방
                <div class="list" >
                    <list-element v-for="item in recipeFin" :key="item.id"
                    :id="item.id" :title="item.title" :note="item.note"/>
                </div>
            </div>
            <div class="list-container">
                최종 부자재  
                <div class="list">
                    
                    <list-element v-for="item in subMaterialFin" :key="item.id"
                    :id="item.id" :title="item.title" :note="item.note"/>
                </div>
            </div>
            <div class="list-container">
                생산코드
                <div class="list" >
                    <list-element v-for="item in productionCodes" :key="item.id" 
                    @ShowModal="ShowModal" @Delete="Delete" :id="item.id" :title="item.title" :note="item.note" :isOption="true"/>
                </div>
            </div>
        </main>

         <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"/> 
    </div>           
</template>

<script>
import axios from 'axios'
import imageUploader from "./ImageUploader.vue";
import listElement from "./ListElement.vue";
import modal from "./Modal.vue";

export default {
    props:{
        projectID: Number
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
    methods:{
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
        listElement,
        modal
    }
}
</script>

<style lang="scss" scoped>

    .list-container{
        border: 3px solid #000;
        padding:10px;
        min-width: 100px;
        min-height: 300px;
        float: left;
        margin: 5px;
    }

    .create-btn{
        width: fit-content;
        padding: 3px;
        border:3px solid #000;
        cursor: pointer;
    }

    .timeline{
    }

    .modal{
        border-radius: 10px;
    }

</style>