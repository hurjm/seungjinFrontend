<template>
<div class="element" @click="Select">
    <div class="option-container-container">
        <div class="option-container">
            <img class="option-btn" src="../assets/images/table_option_btn.png" v-if="isOption" @click="Option"/>
            <div class="dropdown-container" v-show="dropdown">
                <div class="dropdown-content">
                    <div class="dropdown-btn" @click="Update">수정</div>
                    <div class="dropdown-btn" @click="Delete">삭제</div>
                </div>
            </div>
        </div>
    </div>

    <div class="table-property-container" v-if="kind==2">
        <div class="table-property" id="title">
            {{title}}
        </div>
        <div class="table-property" id="start-date">
            {{startDate}}
        </div>
        <div class="table-property" id="launching-date">
            {{launchingDate}}
        </div>
    </div>

    <div class="table-property-container" v-if="kind==3">
        <div class="table-property" id="sub-code">
            {{sub_code}}
        </div>
        <div class="table-property" id="bom">
            {{bom}}
        </div>
        <div class="table-property" id="demand-cap">
            {{demand_cap}}
        </div>
        <div class="table-property" id="indication-cap">
            {{indication_cap}}
        </div>
        <div class="table-property" id="real-cap">
            {{real_cap}}
        </div>
        <div class="table-property" id="subconstractor">
            {{subconstractor}}
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        kind:{
            type: Number,
            default: null
        },
        id: {
            type: Number,
            default: null
        },
        isOption: {
            type: Boolean,
            default: null
        },
        title: {
            type: String,
            default: ""
        },
        startDate: {
            type: String,
            default: ""
        },
        launchingDate: {
            type: String,
            default: ""
        },
        sub_code: {
            type: String,
            default: ""
        },
        bom: {
            type: String,
            default: ""
        },
        demand_cap: {
            type: String,
            default: ""
        },
        indication_cap: {
            type: String,
            default: ""
        },
        real_cap: {
            type: String,
            default: ""
        },
        subconstractor: {
            type: String,
            default: ""
        }
    },
    data(){
        return{
            dropdown: false
        }
    },
    mounted(){
        console.log("table-mounted");
        console.log(this.subconstractor);
    },
    methods:{
        Update(){
            console.log("Update");
            let startDateConverted =  new Date(this.startDate.replace("년 ", "-").replace("월 ", "-").replace("일", ""));
            let launchingDateConverted =  new Date(this.launchingDate.replace("년 ", "-").replace("월 ", "-").replace("일", ""));
            console.log(startDateConverted)
            if(this.kind == 2){
                this.$emit("ShowModal", {
                    id: this.id, 
                    title: this.title, 
                    startDate: startDateConverted, 
                    launchingDate: launchingDateConverted, 
                    mode: "update"});
            }
            else if(this.kind == 3){
                this.$emit("ShowModal", {
                    id: this.id, 
                    sub_code: this.sub_code, 
                    bom: this.bom, 
                    demand_cap: this.demand_cap, 
                    indication_cap: this.indication_cap, 
                    real_cap: this.real_cap, 
                    subconstractor: this.subconstractor, 
                    mode: "update"});
            }
            this.ChangeDropDown();
            console.log("Update");
        },
        Delete(){
            this.$emit('Delete', this.id);
            this.ChangeDropDown();
        },
        Option(){
            console.log("option");
            this.ChangeDropDown();
        },
        Select(){
            if(!this.dropdown){
                this.$emit('Select', {id: this.id, title: this.title})
            }
            console.log("Select " + this.id)
        },
        ChangeDropDown(){
            if(this.dropdown){
                setTimeout(() => {
                    this.dropdown = false;
                }, 1)
            }
            else{
                this.dropdown = true;
            }
        }

    }
}
</script>

<style lang="scss" scoped>
    .element{
        width: 100%;
        background-color: #ffffff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-bottom: 0.1px solid rgb(199, 199, 199);
        border-right: 0.1px solid rgb(199, 199, 199);
        border-left: 0.1px solid rgb(199, 199, 199);
        cursor: pointer;
    }

    .element:hover{
        box-shadow: 2px 2px 10px rgb(187, 187, 187);
    }

    .table-property-container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .content-container{
        display: inline-flex;
        flex-direction: column;
    }

    .option-container-container{
        position: relative;
        top: -23%;
        left: 10px;
    }

    .option-container{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        align-items: flex-end;
        position: absolute;

        .option-btn{
            width: 20px;
            height: 26px;
            cursor: pointer;
        }

        .option-btn:hover{
            opacity: 0.5;
        }

        .dropdown-container{
            position: absolute;
            top:22px;
            left: 10%;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 2px 2px 8px rgb(187, 187, 187);

            .dropdown-content{
                display: flex;
                flex-direction: column;

                .dropdown-btn{
                    font-weight: 600;
                    margin: 3px;
                    min-width: 35px;
                }

                .dropdown-btn:hover{
                    color: #6b6b6b;
                }
            }
        }
    }


    .table-property{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #title{
        display: flex;
        flex-direction: row;
        min-width: 200px;
    }

    #start-date{
        max-width: 175px;
    }
    #launching-date{
        max-width: 175px;
    }
    
    #sub-code{
        max-width: 200px;
    }
    #bom{
        
    }
    #demand-cap{
        max-width: 100px;
    }
    #indication-cap{
        max-width: 100px;
    }
    #real-cap{
        max-width: 100px;
    }
    #subconstractor{
        max-width: 200px;
    }
</style>