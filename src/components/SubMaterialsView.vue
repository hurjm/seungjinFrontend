<template>
    <div class="container">
        <imageUploader class="timeline" :projectID=projectID />
        <div class="table">
            <div class="table-property-list">
                <div class="table-property" id="code">
                    코드
                </div>
                <div class="table-property" id="bom">
                    BOM
                </div>
                <div class="table-property" id="demand-capacity">
                    소요량
                </div>
                <div class="table-property" id="indication-capacity">
                    표시용량
                </div>
                <div class="table-property" id="real-capacity">
                    실용량
                </div>
                <div class="table-property" id="subcontractor">
                    협력업체
                </div>
            </div>
            
            <div class="table-element-list">
                <draggable class="drag-area" v-model="subMaterials" group="subMaterials" @start="drag=true" @end="drag=false">
                    <table-element class="table-element" v-for="item in subMaterials" :key="item.id" 
                    @ShowModal="ShowModal" @Delete="Delete" @Select="Select" :isOption="true"
                    :id="item.id" 
                    :title="item.title" 
                    :startDate="item.start_date" 
                    :launchingDate="item.launching_date"/>
                </draggable>
                <div class="create-btn" @click="CreateBtn">+New Project</div>
            </div>
        </div>

        <fileUploader class="file-uploader" :projectID=projectID />   
            
        <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"
        :isSubMaterials="true"
        :code="modalData.code"
        :BOM="modalData.BOM"
        :demandCap="modalData.demandCap"
        :indicationCap="modalData.indicationCap"
        :realCap="modalData.realCap"
        :subConstractor="modalData.subConstractor"
        />
    </div> 
</template>

<script>
import axios from 'axios'
import tableElement from "./TableElement.vue";
import modal from "./Modal.vue";
import draggable from 'vuedraggable';
import imageUploader from "./ImageUploader.vue"
import fileUploader from "./FileUploader.vue"

export default {
    props:{
        projectID: Number
    },
    data(){
        return{
            subMaterials: [],
            progress: [],
            completed: [],
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetList();
        console.log('mounted');
        console.log(this.projectID);
        console.log(this.$test);
    },
    watch:{
        subMaterials:function(){
            console.log('subMaterials');
            console.log(this.subMaterials);
            this.UpdateState(0, this.subMaterials);
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
                axios.post('http://localhost:80/updatesubmaterialstate', {state: state, data: updateList})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        Create(data){
            this.HideModal()
            var temp ={
                list_order: this.subMaterials.length,
                title: data.title, 
                note: data.note,
                project_id: this.projectID,
                state: 0, 
                startdate: Date.now(),
                enddate: null
                }
                console.log("create");
            axios.post('http://localhost:80/createsubmaterial', temp)
            .then((res) => {
                console.log(res);
                if(res.data.result == 'success'){
                    temp.id = res.data.data;
                    this.subMaterials.push(temp);
                    console.log(this.subMaterials);
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        Update(data){
            this.HideModal()
            axios.post('http://localhost:80/updatesubmaterial', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.subMaterials.forEach((project, index) => {
                        if(this.subMaterials[index].id == data.id){
                            this.subMaterials[index].title = data.title;
                            this.subMaterials[index].note = data.note;
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
            axios.post('http://localhost:80/deletesubmaterial', {id : id})
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.subMaterials.forEach((project, index) => {
                        if(this.subMaterials[index].id == id){
                            this.subMaterials.splice(index, 1);
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
        GetList(){
            axios.post('http://localhost:80/getsubmaterials', {id : this.projectID})
            .then((res) => {
                console.log(res)
                for(var i=0; i<res.data.data.length; i++){
                    if(res.data.data[i].state == 0){
                        this.subMaterials.push(res.data.data[i]);
                    }
                    else if(res.data.data[i].state == 1){
                        this.progress.push(res.data.data[i]);
                    }
                    else if(res.data.data[i].state == 2){
                        this.completed.push(res.data.data[i]);
                    }
                }
                console.log(this.subMaterials)
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
            this.ShowModal({mode: 'create'});
        }
    },
    components:{
        imageUploader,
        fileUploader,
        tableElement,
        modal,
        draggable
    }
}
</script>
<style lang="scss" scoped>
    // .container{
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    // }

    .timeline{
        // width: 100%;

    }

    .create-btn{
        text-align: center;
        width: 100%;
        margin-top: 7px;
        padding: 10px;
        color: rgb(199, 199, 199);
        font-weight: 700;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .create-btn:hover{
        color: rgb(99, 99, 99);
    }

    .table{
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .table-property-list{
        display: flex;
        flex-direction: row;
        border: 0.1px solid rgb(199, 199, 199);
    }

    .table-property{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
    }

    #code{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }

    #bom{
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    
    #demand-capacity{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #indication-capacity{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #real-capacity{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #subcontractor{
        max-width: 200px;
    }

    .table-element-list{
        display: flex;
        flex-direction: column;;
        border-right: 0.1px solid rgb(199, 199, 199);
        border-left: 0.1px solid rgb(199, 199, 199);
        border-bottom: 0.1px solid rgb(199, 199, 199);
    }

</style>