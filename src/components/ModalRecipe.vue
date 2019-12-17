<template>
    <div class="modal-background" v-show="isShow">
        <div class="modal-container">
            <div class="recipes">
                <div class="head-container">
                    <div class="title-container">
                    <input class="title" id="title" v-model="title" placeholder="처방 이름" readonly>
                    <div class="edit" @click="Edit"/>
                    </div>
                    <div class="delete-btn-container">
                        <div class="delete-btn" @click="Delete">삭제</div>
                    </div>
                </div>
            
                <div class="note-container">
                    <ResizeAuto>
                        <template v-slot:default="{resize}">
                            <textarea class="note" v-model="note" @input="resize" placeholder="NOTE" readonly/>
                        </template>
                    </ResizeAuto>
                    <div class="edit edit-note" @click="Edit"/>
                </div>
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
export default {
    props:{
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
        }
    },
    data(){
        return{
            edited: {
                type: Boolean,
                default: false
            }
        }
    },
    mounted(){
        console.log('mounted');
        console.log(this.mode);
        this.isShow = true;
    },
    methods:{
        Confirm(){
            this.isShow = false;
            console.log('confirm');
            if(this.edited){
                console.log("recipes_modal_update");
                this.$emit('Update', {
                    id: this.id, 
                    title: this.title, 
                    note: this.note
                });
            }
        },
        Cancel () {
            this.isShow = false;
            this.$emit('HideModal');
        },
        Edit(e){
            this.edited = true;
            console.log(e)
            if(e.target.previousElementSibling){
                e.target.previousElementSibling.removeAttribute('readonly');
                e.target.previousElementSibling.style.borderColor = "rgb(143, 185, 248)";
            }
            else if(e.target.nextElementSibling){
                e.target.nextElementSibling.removeAttribute('readonly');
                e.target.nextElementSibling.style.borderColor = "rgb(143, 185, 248)";
            }
        },
        Delete(){
            this.isShow = false;
            this.$emit('Delete', this.id);
        }
    },
    components: { 
        ResizeAuto
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
        min-width: 400px;
        min-height: 400px;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
    }

    .head-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .title-container{
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .title{
        height: 30px;
        padding-left: 5px;
        border-radius: 5px;
        border: 1px solid rgb(255, 255, 255);
        font-size: 12px;
    }

    .delete-btn-container{
        // width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        background-color: rgba(0, 0, 0, 0);
    }

    .delete-btn{
        background-color: red;
        padding: 5px;
        border-radius: 10px;
        color: #ffffff;
        cursor: pointer;
    }

    .delete-btn:hover{
        background-color: rgb(223, 0, 0);
    }
    
    .note-container{
        display: flex;
        flex-direction: row;
    }

    .note {
        min-height: 30px;
        margin-top: 5px;
        padding-left: 5px;
        padding-top: 9px;
        width: 94.5%;
        border-radius: 10px;
        font-size: 12px;
        border: 1px solid rgb(255, 255, 255);
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

    .edit{
        width: 16px;
        height: 16px;
        margin-left: 5px;
        background-image: url(../assets/images/edit_btn.png);
        
        cursor: pointer;

        &-note{
            margin-top: 5px;
        }
    }
</style>