<template>
    <div class="modal-background" v-show="isShow">
        <div class="modal" >
            <div class="container">
                <input class="title" v-model="title" placeholder="NAME" v-if="title!=null">
                <div v-if="note != null">
                    <ResizeAuto>
                        <template v-slot:default="{resize}">
                            <textarea class="note" v-model="note" @input="resize" placeholder="NOTE"/>
                        </template>
                    </ResizeAuto>
                </div>
                <div class="subMaterials" v-if="isSubMaterials">
                    <input type="text" v-model="code" placeholder="코드">
                    <input type="text" v-model="BOM" placeholder="BOM">
                    <input type="text" v-model="demandCap" placeholder="소요량">
                    <input type="text" v-model="indicationCap" placeholder="표시용량">
                    <input type="text" v-model="realCap" placeholder="실용량">
                    <input type="text" v-model="subConstractor" placeholder="협력업체">
                </div>
                <div v-if="isProjects">
                    <datepicker id="start-datepicker" :value="startDate" :format="'yyyy년 MM월 dd일'" :placeholder="'시작일'"></datepicker>
                    <datepicker id="launching-datepicker" :value="launchingDate" :format="'yyyy년 MM월 dd일'" :placeholder="'런칭일'"></datepicker>
                </div>
                <div class="button-container">
                    <span class="button" @click="Confirm">확인</span>
                    <span class="button" @click="Cancel">취소</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import ResizeAuto from "./ResizeAuto.vue";
import Datepicker from 'vuejs-datepicker';

export default {
    props:{
        isProjects:{
            type: Boolean,
            default: false
        },
        isSubMaterials:{
            type: Boolean,
            default: false
        },
        width:{
            type: Number,
            default: 200
        },
        height:{
            type: Number,
            default: 200
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
        startDate: {
            type: Date,
            default: Date.now()
        },
        launchingDate: {
            type: Date,
            default: null
        },
        code:{
            type: String,
            default: null
        },
        BOM:{
            type: String,
            default: null
        },
        demandCap:{
            type: Number,
            default: null
        },
        indicationCap:{
            type: Number,
            default: null
        },
        realCap:{
            type: Number,
            default: null
        },
        subConstractor:{
            type: String,
            default: null
        },
        mode: {
            type: String,
            default: null
        }
    },
    mounted(){
        console.log('mounted');
        console.log(this.startDate);
        this.isShow = true;
    },
    methods:{
        Confirm(){
            this.isShow = false;
            if(this.mode == "update"){
                 if(this.isProjects){
                    console.log('testtest')
                    let startDate = document.getElementById("start-datepicker").value;
                    let launchingDate = document.getElementById("launching-datepicker").value;
                    this.$emit('Update', {id: this.id, title: this.title, startDate: startDate, launchingDate: launchingDate});
                }
                else{
                    this.$emit('Update', {id: this.id, title: this.title, note: this.note});
                }
            }
            else if(this.mode == "create"){
                console.log("create");
                if(this.isProjects){
                    let startDate = document.getElementById("start-datepicker").value;
                    // startDate = startDate.replace("년 ", "-").replace("월 ", "-").replace("일", "");

                    let launchingDate = document.getElementById("launching-datepicker").value;
                    // launchingDate = launchingDate.replace("년 ", "-").replace("월 ", "-").replace("일", "");
                    this.$emit('Create', {
                        title: this.title, 
                        startDate: startDate, 
                        launchingDate: launchingDate});
                }
                else if(this.isSubMaterials){
                    this.$emit('Create', {
                        code: this.code, 
                        BOM: this.BOM, 
                        demandCap: this.demandCap, 
                        indicationCap: this.indicationCap, 
                        realCap: this.realCap, 
                        subConstractor: this.subConstractor});
                }
                else{
                    this.$emit('Create', {title: this.title, note: this.note});
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
        Datepicker
    }
}
</script>

<style lang="scss" scoped>

    .modal-background{
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        width: 100%;
        height: 100%;
        z-index: 3;
    }
    .container{
        background-color: #fff;
        display: flex;
        width: fit-content;
        height: fit-content;
        position: absolute;
        top: 40%;
        left: 40%;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
    }

    .title{
        height: 30px;
        width: 96%;
        padding-left: 5px;
        border-radius: 10px;
        border: 1px solid rgb(0, 0, 0);
    }

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
        background-color: #5f5ab9;
        color: #ffffff;
        padding: 10px;
        border-radius: 15px;
        margin-left: 5px;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .button:hover{
        background-color: #7e7abb;;
    }
</style>