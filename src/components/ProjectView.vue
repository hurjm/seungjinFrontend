<template>
    <div>
        <addproject @send-message="CreateProject"></addproject>
        <div class="select-project" v-for="project in projects" v-bind:key="project.id">
            <projectunit :title=project.title :id=project.id @update="UpdateProject" @delete="DeleteProject" @Select="SelectProject"></projectunit>
        </div>
    </div>
</template>

<script>
import addproject from "./Addproject.vue"
import projectunit from './ProjectinHome'
import axios from 'axios'


export default {
    props:{
        customerID: Number
    },
    data(){
        return{
            project: '',
            childMessage: '',
            projects: [],
            currentCustomerID: this.customerID,
            currentProjectID:null
        }
    },
    mounted(){
        this.GetProjects()
    },
    watch: {
        customerID: function(customerID){
            this.currentCustomerID = customerID;
            console.log("cus " + customerID);
        }
    },
    methods: {
        SelectProject(id){
            this.$emit('SelectProject', id)
        },
        CreateProject(data){
            
            var temp ={
                title: data, 
                customer_id: this.currentCustomerID,
                state: 0, 
                startdate: Date.now(),
                enddate: null
                }
            axios.post('http://localhost:80/addproject', temp)
            .then((res) =>{
                temp.id = res.data.data;
                this.projects.push(temp)
            }).catch((err) => {
                console.log(err)
            })
            
            console.log(temp)
        },
        UpdateProject(data){
            axios.post('http://localhost:80/updateproject', data)
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.projects.forEach((project, index) => {
                        if(this.projects[index].id == data.id){
                            this.projects[index].title = data.title;
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        DeleteProject(id){
            axios.post('http://localhost:80/deleteproject', {id : id})
            .then((res) => {
                console.log(res);
                if(res.data.result == "success"){
                    this.projects.forEach((project, index) => {
                        if(this.projects[index].id == id){
                            this.projects.splice(index, 1);
                            return;
                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        GetProjects(event, data){
            console.log("getprojects");
            axios.post('http://localhost:80/getprojects', {customer_id: this.currentCustomerID})
            .then((res) => {
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    this.projects.push(res.data.data[i])
                }
            }).catch((err) => {
                console.log(err)
            })
        }

    },
    components:{
        addproject,
        projectunit
    }
}
</script>

<style lang="scss">

    .select-project{
        float: left;
    }

</style>