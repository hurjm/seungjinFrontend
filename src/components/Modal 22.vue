<template>
    <modal name="modal" 
    :width="width" height="auto"
    :scrollable="true"
    :clickToClose="false">
        <div class="container">
            <input class="title" v-model="data.title" placeholder="NAME">
            <div v-if="data.note != null">
                <textarea class="note" v-model="data.note" placeholder="NOTE"/>
            </div>
            <div class="button-container">
                <span class="button" @click="Confirm">확인</span>
                <span class="button" @click="Cancel">취소</span>
            </div>
        </div>
    </modal>
</template>

<script>
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100px;
        margin: 10px;

    }

    .title{
        width: 96%;
        height: 30px;
        padding-left: 5px;
    }

    .note {
        width: 96%;
        height: 30px;
        padding-left: 5px;
    }

    .button-container{
        width: 100%;
        display: flex;
        margin-top: 5px;
        flex-direction: row;
        justify-content: flex-end;
    }

    .button{
        background-color: rgb(211, 211, 211);
        padding: 10px;
        border-radius: 15px;
        margin-left: 5px;
        // transition: background-color 0.1s linear;
        transition: color 0.25s;
        transition: background-color 0.25s;
        cursor: pointer;
    }

    .button:hover{
        background-color: rgb(155, 155, 155);
        color: #fff;
    }
</style>