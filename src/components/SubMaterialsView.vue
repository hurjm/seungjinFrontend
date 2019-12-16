<template>
    <div class="container">
        <imageUploader class="timeline" :projectID=projectID />
        <div class="table">
            <div class="table-property-list">
                <div class="table-property" id="sub-code">
                    코드
                </div>
                <div class="table-property" id="bom">
                    BOM
                </div>
                <div class="table-property" id="demand-cap">
                    소요량
                </div>
                <div class="table-property" id="indication-cap">
                    표시용량
                </div>
                <div class="table-property" id="real-cap">
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
                    :sub_code="item.sub_code" 
                    :bom="item.bom" 
                    :demand_cap="item.demand_cap" 
                    :real_cap="item.real_cap"
                    :indication_cap="item.indication_cap"
                    :subconstractor="item.subconstractor"/>
                </draggable>
                <div class="create-btn" @click="CreateBtn">+New SubMaterials</div>
            </div>
        </div>

        <fileUploader class="file-uploader" :projectID=projectID />   
            
        <modal v-if="showModal" :data="modalData" @Create="Create" @Update="Update" @HideModal="HideModal"
        :isSubMaterials="true"
        :mode="modalData.mode"
        :sub_code="modalData.sub_code"
        :bom="modalData.bom"
        :demand_cap="modalData.demand_cap"
        :indication_cap="modalData.indication_cap"
        :real_cap="modalData.real_cap"
        :subconstractor="modalData.subconstractor"
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
        projectID: Number,
        recipeID: {
            type:Number,
            default: 3
        }
    },
    data(){
        return{
            subMaterials: [],
            showModal: false,
            modalData: []
        }
    },
    mounted(){
        this.GetList();
        console.log('mounted');
        console.log(this.projectID);
        console.log(this.recipeID);
        console.log(this.subMaterials);
    },
    watch:{
        subMaterials:function(){
            console.log('subMaterials');
            console.log(this.subMaterials);
            this.UpdateState(this.subMaterials);
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
                axios.post('http://localhost:80/updatesubmaterialorder', {data: updateList})
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        Create(data){
            this.HideModal()
            console.log("submaterials_modal_create");
            console.log(data);
            var temp ={
                recipe_id: this.recipeID,
                list_order: this.subMaterials.length,
                sub_code: data.sub_code, 
                bom: data.bom, 
                demand_cap: data.demand_cap, 
                indication_cap: data.indication_cap, 
                real_cap: data.real_cap, 
                subconstractor: data.subconstractor
                }
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
            console.log("submaterials_modal_update");
            console.log(data);
            axios.post('http://localhost:80/updatesubmaterial', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.subMaterials.forEach((project, index) => {
                        if(this.subMaterials[index].id == data.id){
                            this.subMaterials[index].sub_code = data.sub_code;
                            this.subMaterials[index].bom = data.bom;
                            this.subMaterials[index].demand_cap = data.demand_cap;
                            this.subMaterials[index].indication_cap = data.indication_cap;
                            this.subMaterials[index].real_cap = data.real_cap;
                            this.subMaterials[index].subconstractor = data.subconstractor;
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
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        GetList(){
            axios.post('http://localhost:80/getsubmaterials', {id : this.recipeID})
            .then((res) => {
                console.log(res)
                for(var i=0; i<res.data.data.length; i++){
                    this.subMaterials.push(res.data.data[i]);
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
        padding-top:10px;
        padding-bottom:10px;
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

    #sub-code{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }

    #bom{
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    
    #demand-cap{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #indication-cap{
        max-width: 100px;
        border-right: 0.1px solid rgb(199, 199, 199);
    }
    #real-cap{
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