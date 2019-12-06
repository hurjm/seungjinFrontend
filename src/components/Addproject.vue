<template>
    <div>
        <div class="add-btn" @click="add">New Project</div>
        
        <modal name="hello-world" :clickToClose=false>
            hello, world!
            <input id="project-title" v-model="project_title">
            <button @click="confirm">확인</button>
            <button @click="cancel">취소</button>
        </modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            project_title: ''
        }
    },
    methods:{
        add(){
            this.show()
        },
        show () {
            this.$modal.show('hello-world');
        },
        cancel () {
            this.$modal.hide('hello-world');
        },
        confirm(){
            this.create()
            this.$modal.hide('hello-world');
        },
        create(){
            //this.projectList.push(test)
            this.$emit('send-message', this.project_title)
            console.log(this.project_title)
            this.project_title = ''
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