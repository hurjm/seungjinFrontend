<template>
<div class="element" @click="Select">
    <div class="option-container-container">
        <div class="option-container">
            <div class="option-btn" v-if="isOption" @click="Option">
            </div>
            <div class="dropdown-container" v-show="dropdown">
                <div class="dropdown-content">
                    <div class="dropdown-btn" @click="Update">수정</div>
                    <div class="dropdown-btn" @click="Delete">삭제</div>
                </div>
            </div>
        </div>
    </div>

    <div class="table-property" id="title" v-if="title!=null">
        {{title}}
    </div>
    <div class="table-property" id="start-date" v-if="startDate!=null">
        {{startDate}}
    </div>
    <div class="table-property" id="launching-date" v-if="launchingDate!=null">
        {{launchingDate}}
    </div>

    <div class="table-property" id="sub-code" v-if="sub_code!=null">
        {{sub_code}}
    </div>
    <div class="table-property" id="bom" v-if="bom!=null">
        {{bom}}
    </div>
    <div class="table-property" id="demand-cap" v-if="demand_cap!=null">
        {{demand_cap}}
    </div>
    <div class="table-property" id="indication-cap" v-if="indication_cap!=null">
        {{indication_cap}}
    </div>
    <div class="table-property" id="real-cap" v-if="real_cap!=null">
        {{real_cap}}
    </div>
    <div class="table-property" id="subconstractor" v-if="subconstractor!=null">
        {{subconstractor}}
    </div>
</div>
</template>

<script>
export default {
    props:{
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
            default: null
        },
        startDate: {
            type: String,
            default: null
        },
        launchingDate: {
            type: String,
            default: null
        },
        sub_code: {
            type: String,
            default: null
        },
        bom: {
            type: String,
            default: null
        },
        demand_cap: {
            type: String,
            default: null
        },
        indication_cap: {
            type: String,
            default: null
        },
        real_cap: {
            type: String,
            default: null
        },
        subconstractor: {
            type: String,
            default: null
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
            this.$emit("ShowModal", {id: this.id, title: this.title, startDate: startDateConverted, launchingDate: launchingDateConverted, mode: "update"});
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
                this.$emit('Select', this.id)
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
        // display: flex;
        // justify-content: space-between;
        // // width: 80%;
        // min-width: 125px;
        // min-height: 125px;
        // height: fit-content;
        // box-sizing: border-box;
        // // margin-right: 10px;
        // // margin-left: 10px;
        // margin: 10px;
        // background-color: #ffffff;
        // border-radius: 10px;
        // box-shadow: 2px 2px 5px rgb(187, 187, 187);
        // padding: 10px;
        // margin: 5px;
        cursor: pointer;
    }

    .element:hover{
        box-shadow: 2px 2px 10px rgb(187, 187, 187);
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
        // position: absolute;
        // left:250px;

        .option-btn{
            background-image: url(../assets/images/option_btn.png);
            width: 20px;
            height: 20px;
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
        max-width: 100px;
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