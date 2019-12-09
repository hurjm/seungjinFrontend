<template>
    <div class="modal-background" v-show="isShow">
        <div class="modal" >
            <div class="container">
                <input class="title" v-model="data.title" placeholder="NAME">
                <div v-if="data.note != null">
                    <ResizeAuto>
                        <template v-slot:default="{resize}">
                            <textarea class="note" v-model="data.note" @input="resize" placeholder="NOTE"/>
                        </template>
                    </ResizeAuto>
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

export default {
    props:{
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
        data: {
            id: {
                type: Number,
                default: null
            },
            title: {
                type: String,
                default: ""
            },
            note: {
                type: String,
                default: null
            },
            mode: {
                type: String,
                default: null
            }
        }
    },
    mounted(){
        console.log('mounted');
        console.log(this.data);
        this.isShow = true;
    },
    methods:{
        Confirm(){
            this.isShow = false;
            if(this.data.mode == "update"){
                this.$emit('Update', {id: this.data.id, title: this.data.title, note: this.data.note});
            }
            else if(this.data.mode == "create"){
                console.log("create");
                this.$emit('Create', {title: this.data.title, note: this.data.note});
            }
        },
        Cancel () {
            this.isShow = false;
            this.$emit('HideModal');
        }
    },
    components: { 
        ResizeAuto 
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