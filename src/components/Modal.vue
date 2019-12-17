<template>
    <div class="modal-background" v-show="isShow">
        <div :class="['modal-container modal-container-' + type] ">
            <div class="customers" v-if="kind==0">
                <input class="title" v-model="title" placeholder="고객사 이름">
                <imageUploader class="image" :photo="photo" :kind="0" :customerID=id @ImageTransfer="ImageTransfer"></imageUploader>
            </div>

            <div v-if="kind==1">
                <input class="title" v-model="title" placeholder="프로젝트 이름">
                <div class="datepicker-container">
                    <div class="datepicker-element">
                        <div class="datepicker-title">
                            시작일
                        </div>
                        <datepicker id="start-datepicker" :value="startDate" :inline="true" :format="'yyyy년 MM월 dd일'" :placeholder="'시작일'" calendar-class="calendar"></datepicker>
                    </div>
                    <div class="datepicker-element">
                        <div class="datepicker-title">
                            런칭일
                        </div>
                        <datepicker id="launching-datepicker" :value="launchingDate" :inline="true" :format="'yyyy년 MM월 dd일'" :placeholder="'런칭일'" calendar-class="calendar"></datepicker>
                    </div>
                </div>
            </div>

            <div class="recipes" v-if="kind==2">
                <input class="title" v-model="title" placeholder="처방 이름">
            
                <ResizeAuto>
                    <template v-slot:default="{resize}">
                        <textarea class="note" v-model="note" @input="resize" placeholder="NOTE"/>
                    </template>
                </ResizeAuto>
            </div>

            <div class="subMaterials" v-if="kind==3">
                <input type="text" v-model="sub_code" placeholder="코드">
                <input type="text" v-model="bom" placeholder="bom">
                <input type="text" v-model="demand_cap" placeholder="소요량">
                <input type="text" v-model="indication_cap" placeholder="표시용량">
                <input type="text" v-model="real_cap" placeholder="실용량">
                <input type="text" v-model="subconstractor" placeholder="협력업체">
            </div>
            <div class="button-container">
                <span class="button" @click="Confirm">확인</span>
                <span class="button" @click="Cancel">취소</span>
            </div>
        </div>
    </div>
</template>


<script>
import ResizeAuto from "./ResizeAuto.vue";
import Datepicker from 'vuejs-datepicker';
import imageUploader from "./ImageUploader.vue";
export default {
    props:{
        kind:{// 0 : customers, 1 : projects, 2 : recipes, 3 : submarterials
            type: Number,
            default: null
        },
        isShow: {
            type: Boolean,
            default: false
        },
        id: {
            type: Number,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        note: {
            type: String,
            default: null
        },
        photo: {
            type: String,
            default: null
        },
        state:{
            type: String,
            default: null
        },
        startDate: {
            type: Date,
            default: Date.now()
        },
        launchingDate: {
            type: Date,
            default: null
        },
        sub_code:{
            type: String,
            default: null
        },
        bom:{
            type: String,
            default: null
        },
        demand_cap:{
            type: Number,
            default: null
        },
        indication_cap:{
            type: Number,
            default: null
        },
        real_cap:{
            type: Number,
            default: null
        },
        subconstractor:{
            type: String,
            default: null
        },
        mode: {
            type: String,
            default: null
        }
    },
    data(){
        return{
            type: null
        }
    },
    mounted(){
        console.log('mounted');
        console.log(this.mode);
        this.isShow = true;
        if(this.kind == 0){
            this.type = "customers";
        }
        else if(this.kind == 1){
            this.type = "projects";
        }
        else if(this.kind == 2){
            this.type = "recipes";
        }
        else if(this.kind == 3){
            this.type = "submaterials";
        }
    },
    methods:{
        ImageTransfer(data){
            console.log("imageTransfer");
            this.photo = data;
            console.log(this.photo);
        },
        Confirm(){
            this.isShow = false;
            console.log('confirm');
            if(this.mode == "create"){
                console.log("create");
                if(this.kind == 0){
                    console.log("customers_modal_update");
                    this.$emit('Create', {
                        title: this.title,
                        photo: this.photo
                        });
                }
                else if(this.kind == 1){
                    let startDate = document.getElementById("start-datepicker").value;
                    let launchingDate = document.getElementById("launching-datepicker").value;
                    this.$emit('Create', {
                        title: this.title, 
                        startDate: startDate, 
                        launchingDate: launchingDate});
                }
                else if(this.kind == 2){
                    console.log("recipes_modal_create");
                    this.$emit('Create', {
                        title: this.title, 
                        note: this.note,
                        state: this.state
                        });
                }
                else if(this.kind == 3){
                    console.log("submaterials_modal_create");
                    this.$emit('Create', {
                        sub_code: this.sub_code, 
                        bom: this.bom, 
                        demand_cap: this.demand_cap, 
                        indication_cap: this.indication_cap, 
                        real_cap: this.real_cap, 
                        subconstractor: this.subconstractor});
                }
            }
            else if(this.mode == "update"){
                if(this.kind == 0){
                    console.log("customers_modal_update");
                    this.$emit('Update', {
                        id: this.id, 
                        title: this.title,
                        photo: this.photo
                        });
                }
                else if(this.kind == 1){
                    console.log('updateproject');
                    let startDate = document.getElementById("start-datepicker").value;
                    let launchingDate = document.getElementById("launching-datepicker").value;
                    this.$emit('Update', {
                        id: this.id, 
                        title: this.title, 
                        startDate: startDate, 
                        launchingDate: launchingDate});
                }
                else if(this.kind == 2){
                    console.log("recipes_modal_update");
                    this.$emit('Update', {
                        id: this.id, 
                        title: this.title, 
                        note: this.note});
                }
                if(this.kind == 3){
                    console.log("submaterials_modal_update");
                    this.$emit('Update', {
                        id: this.id, 
                        sub_code: this.sub_code, 
                        bom: this.bom, 
                        demand_cap: this.demand_cap, 
                        indication_cap: this.indication_cap, 
                        real_cap: this.real_cap, 
                        subconstractor: this.subconstractor});
                }
            }
        },
        Cancel () {
            this.isShow = false;
            this.$emit('HideModal');
        }
    },
    components: { 
        ResizeAuto,
        Datepicker,
        imageUploader
    }
}
</script>

<style lang="scss" scoped>
    .modal-background{
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        width: 100%; 
        height: 100%;
        z-index: 3;
    }

    .modal-container{
        background-color: #fff;
        display: flex;
        width: fit-content;
        height: fit-content;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);

        &-customers{
            
        }

        &-recipes{
            .title{
                height: 30px;
                
                padding-left: 5px;
                border-radius: 5px;
                border: 1px solid rgb(0, 0, 0);
            }

            .title:focus{
                border: 1px solid rgb(189, 19, 19);
                outline: none;
            }
        }
    }

    // .modal-container-customers{
    //     background-color: #fff;
    //     display: flex;
    //     width: fit-content;
    //     height: fit-content;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     padding: 10px;
    //     border-radius: 5px;
    //     box-shadow: 2px 2px 5px rgb(187, 187, 187);
    // }

    // .modal-container-projects{
    //     background-color: #fff;
    //     display: flex;
    //     width: fit-content;
    //     height: fit-content;
    //     flex-direction: column;
    //     justify-content: space-between;
    //     padding: 10px;
    //     border-radius: 5px;
    //     box-shadow: 2px 2px 5px rgb(187, 187, 187);
    // }

    // .modal-container-recipes{
    //     background-color: #fff;
    //     display: flex;
    //     width: fit-content;
    //     height: fit-content;
    //     flex-direction: column;
    //     padding: 10px;
    //     border-radius: 5px;
    //     box-shadow: 2px 2px 5px rgb(187, 187, 187);
    // }

    // .modal-container-recipes{
    //     background-color: #fff;
    //     display: flex;
    //     width: fit-content;
    //     height: fit-content;
    //     flex-direction: column;
    //     padding: 10px;
    //     border-radius: 5px;
    //     box-shadow: 2px 2px 5px rgb(187, 187, 187);
    // }

    // .title{
    //     height: 30px;
    //     width: 99%;
    //     padding-left: 5px;
    //     border-radius: 5px;
    //     border: 1px solid rgb(0, 0, 0);
    // }

    .note {
        min-height: 30px;
        margin-top: 5px;
        padding-left: 5px;
        padding-top: 9px;
        width: 94.5%;
        border-radius: 10px;
        border: 1px solid rgb(0, 0, 0);
        resize: none;
        overflow: hidden; 
    }

    .subMaterials{
        display: flex;
        flex-direction: column;
    }

    .button-container{
        display: flex;
        margin-top: 5px;
        flex-direction: row;
        justify-content: flex-end;
    }

    .button{
        background-color: #4f5467;
        color: #ffffff;
        padding: 5px 20px;
        border-radius: 5px;
        margin-left: 5px;
        transition: color 0.1s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .button:hover{
        background-color: #333642;
    }

    .image{
        margin-top:10px;
        max-width: 250px;
    }

    .datepicker-container{
        display: flex;
        flex-direction: row;
    }

    .datepicker-element{
        display: flex;
        flex-direction: column;
        margin-top: 8px;
    }
    .datepicker-title{
        padding-left: 5px;
        margin-bottom: 3px;
    }
</style>

<style lang="scss">
    .calendar{
        // margin-bottom:10px;
    }
</style>