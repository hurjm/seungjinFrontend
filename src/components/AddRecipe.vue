<template>
<div>
    <button class="add-btn" @click="show">New Recipe</button>
    
    <modal name="add-recipe" :clickToClose=false>
            hello, world!
            <input id="title" v-model="title">
            <input id="note" v-model="note">
            <button v-on:click="confirm">확인</button>
            <button v-on:click="cancel">취소</button>
        </modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title: '',
            note: ''
        }
    },
    methods:{
        show () {
            this.$modal.show('add-recipe');
        },
        cancel () {
            this.$modal.hide('add-recipe');
        },
        confirm(){
            this.create()
            this.$modal.hide('add-recipe');
        },
        create(){
            this.$emit('send-data', {title: this.title, note: this.note})
            console.log(this.title)
            console.log(this.note)
            this.title = ''
            this.note = ''
        }
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