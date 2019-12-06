<template>
<div class="recipe-unit">
    <div class="option" @click="Option">
        <div class="dropdown" v-show="dropdown">
            <div>
                <li><button @click="Update">수정</button></li>
                <li><button @click="Delete">삭제</button></li>
            </div>
        </div>
    </div>

    <div @click="Enter">
        {{title}}
        {{note}}
    </div>
    

    <modal name="hello-world" :clickToClose=false>
        hello, world!
        <input id="title" v-model="title">
        <input id="note" v-model="note">
        <button @click="Confirm">확인</button>
        <button @click="Cancel">취소</button>
    </modal>
</div>
</template>
<script>
import axios from 'axios';
export default {
    props:[
        'initTitle',
        'initNote',
        'id',
        'unit_id',
        'draggable'
    ],
    data(){
        return{
            dropdown: false,
            title: this.initTitle,
            note: this.initNote
        }
    },
    created(){
        console.log('title ' + this.title);
    },
    methods:{
        Update(){
            this.$modal.show('hello-world');
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
        Enter(){
            this.$emit('send-message', this.id)
            console.log("enter " + this.id)
        },
        Cancel () {
            this.$modal.hide('hello-world');
        },
        Confirm(){
            this.$modal.hide('hello-world');
            this.$emit('update', {id: this.id, title: this.title, note: this.note});
        }
    }
}
</script>
<style lang="scss">
    .recipe-unit{
        width: 100px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 3px 3px 3px #000;
        padding: 5px;
        margin: 5px;
    }

    .dropdown{
        border: 3px solid #000;
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