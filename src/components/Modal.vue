<template>
    <modal name="modal" :clickToClose=false>
            <input class="title" v-model="data.title">
            <p>{{data.title}}</p>
            <div v-if="data.note != null">
                <input class="note" v-model="data.note">
                <p>{{data.note}}</p>
            </div>
            <button @click="Confirm">확인</button>
            <button @click="Cancel">취소</button>
    </modal>
</template>

<script>
export default {
    props:{
        data: {
            // id: Number,
            // title: String,
            // note: String,
            // mode: String
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
        this.$modal.show("modal");
    },
    methods:{
        Confirm(){
            this.$modal.hide("modal");
            if(this.data.mode == "update"){
                this.$emit('Update', {id: this.data.id, title: this.data.title, note: this.data.note});
            }
            else if(this.data.mode == "create"){
                console.log("create");
                this.$emit('Create', {title: this.data.title, note: this.data.note});
            }
        },
        Cancel () {
            this.$modal.hide("modal");
            this.$emit('HideModal');
        }
    }

}
</script>

<style lang="scss" scoped>
    .container{
        min-width: 100px;
        min-height: 100px;
        background-color: rgb(121, 60, 60)
    }
</style>