<template>
    <div class="customer-unit" >
        <div class="image">image
            <div class="option" @click="Option">
                <div class="dropdown" v-show="dropdown">
                    <div>
                        <li><div @click="Update">수정</div></li>
                        <li><div @click="Delete">삭제</div></li>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="title" @click="Select">{{title}}</div>
        

            <modal name="customer-option" :clickToClose=false>
                <imageUploader class="image" :customerID=id></imageUploader>
                test!
                <input id="project-title" v-model="title">
                <button @click="Confirm">확인</button>
                <button @click="Cancel">취소</button>
            </modal>
    </div>
</template>
<script>
import axios from 'axios';
import imageUploader from './ImageUploader.vue';

export default {
    props:{
        initTitle:String,
        id:Number
        },
    data(){
        return{
            dropdown: false,
            title: this.initTitle
        }
    },
    methods:{
        Update(){
            this.$modal.show('customer-option');
            this.dropdown = !this.dropdown;
        },
        Delete(){
            this.$emit('Delete', this.id);
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
            this.$modal.hide('customer-option');
        },
        Confirm(){
            this.$modal.hide('customer-option');
            this.$emit('Update', {id: this.id, title: this.title});
        }
    },
    components:{
        imageUploader
    }
}
</script>
<style lang="scss">
    .customer-unit{
        width: 250px;
        height: 250px;
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

    .image{
        margin: 10px;
        height: 80%;
    }

    .title{
        font-size: 20px;
        cursor: default;
    }
</style>