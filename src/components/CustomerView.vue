<template>
    <div>
        <addCustomerBtn @AddCustomer="AddCustomer"></addCustomerBtn>
        <div class="customer-view" v-for="(customer, index) in customers" :key="index">
            <customerUnit :initTitle=customer.title :id=customer.id @Update="UpdateCustomer" @Delete="DeleteCustomer" @Select="SelectCustomer"></customerUnit>
        </div>
    </div>
</template>

<script>
import addCustomerBtn from "./AddCutomerBtn.vue"
import customerUnit from './CustomerUnit.vue'
import axios from 'axios'

var customerList = [];

export default {
    props:{
        cutomerID: Number
    },
    data(){
        return{
            customers: customerList
        }
    },
    created(){
        this.GetCustomers()
        console.log(customerList);
    },
    methods: {
        SelectCustomer(id){
            console.log("cusView " + id);
            this.$emit('SelectCustomer', id);
        },
        AddCustomer(data){            
            var temp ={
                title: data.title
                }

            axios.post('http://localhost:80/addcustomer', temp)
            .then(function(res){
                console.log("add " + res.data.data);
                temp.id = res.data.data;
                customerList.push(temp)
            }).catch(function(err){
                console.log(err)
            })
            console.log(temp)
        },

        UpdateCustomer(data){
            axios.post('http://localhost:80/updatecustomer', data)
            .then(function(res){
                console.log(res);
                if(res.data.result == "success"){
                    customerList.forEach(function(project, index){
                        if(customerList[index].id == data.id){
                            customerList[index].title = data.title;
                            return;
                        }
                    });
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        DeleteCustomer(id){
            console.log("del " + id);
            axios.post('http://localhost:80/deletecustomer', {id : id})
            .then(function(res){
                console.log(res);
                if(res.data.result == "success"){
                    customerList.forEach(function(project, index){
                        console.log(index);
                        if(customerList[index].id == id){
                            console.log(index);
                            console.log(customerList[index].id);
                            customerList.splice(index, 1);
                            return;
                        }
                    });
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        GetCustomers(event, data){
            axios.get('http://localhost:80/getcustomers')
            .then(function (res) {
                console.log(res);
                for(var i=0; i<res.data.data.length; i++){
                    customerList.push(res.data.data[i])
                }
            }).catch(function(err){
                console.log(err)
            })
        }

    },
    components:{
        addCustomerBtn,
        customerUnit
    }
}
</script>

<style lang="scss">
    .customer-view{
        float: left;
    }
</style>