<template>
<div class="project-unit">
    <div class="option" @click="Option">
        <div class="dropdown_project" v-show="dropdown">
            <div>
                <li><div @click="Update">수정</div></li>
                <li><div @click="Delete">삭제</div></li>
            </div>
        </div>
    </div>
    
    <div class="title" @click="Select">{{title}}</div>

    <modal name="option" :clickToClose=false>
        hello, world!
        <input id="project-title" v-model="project_title">
        <button @click="Confirm">확인</button>
        <button @click="Cancel">취소</button>
    </modal>
</div>
</template>
<script>
import axios from 'axios';
export default {
    props:{
        title:String,
        id:Number
        },
    data(){
        return{
            dropdown: false,
            project_title: this.title
        }
    },
    methods:{
        Update(){
            this.$modal.show('option');
            this.dropdown = !this.dropdown;
        },
        Delete(){
            this.$emit('delete', this.id);
            this.dropdown = !this.dropdown;
        },
        Option(){
            this.dropdown = !this.dropdown;
            console.log("option");
        },
        Select(){
            this.$emit('Select', this.id)
            console.log("enter " + this.id)
        },
        Cancel () {
            this.$modal.hide('option');
        },
        Confirm(){
            this.$modal.hide('option');
            this.$emit('update', {id: this.id, title: this.project_title});
        }
    }
}
</script>
<style lang="scss">
    .project-unit{
        width: 250px;
        height: 250px;
        border-radius: 10px;
        box-shadow: 3px 3px 3px #000;
        padding: 5px;
        margin: 5px;
    }

    .dropdown_project{
        border: 3px dashed #000;
        background: #fff;
        float: right;
        width: 50px;
        text-align: center;
        margin-top: 20px;

        li{
            list-style: none;
            margin: 2px;
            border: 1px solid #000;
        }
    }

    .option{
        background: #fff;
        background-image: url(../assets/option_btn.png);
        float: right;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .title{
        font-size: 20px;
        cursor: default;
    }
</style>