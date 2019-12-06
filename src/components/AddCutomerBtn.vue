<template>
    <div>
        <div class="add-btn" @click="Show">New Customer</div>
        
        <modal name="hello-world" :clickToClose=false>
            <imageUploader :customerID=id></imageUploader>
            hello, world!
            <input id="title" v-model="title">
            <button @click="Confirm">확인</button>
            <button @click="Cancel">취소</button>
        </modal>
    </div>
</template>

<script>
import imageUploader from './ImageUploader.vue';

export default {
    data(){
        return{
            title: ''
        }
    },
    methods:{
        Show () {
            this.$modal.show('hello-world');
        },
        Cancel () {
            this.$modal.hide('hello-world');
        },
        Confirm(){
            this.create()
            this.$modal.hide('hello-world');
        },
        create(){
            this.$emit('AddCustomer', {title: this.title})
            console.log(this.title)
            this.title = ''
        }
    },
    components:{
        imageUploader
    }
}
</script>

<style lang="scss">
    .add-btn{
        border-radius: 10px;
        background: rgb(155, 142, 142);
        width: 150px;
        text-align: center;
        cursor: pointer;
    }
</style>