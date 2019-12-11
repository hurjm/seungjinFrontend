<template>
<div class="element" @click="Select">
    <div class="content-container">
        <div class="title">
            {{title}}
        </div>
        <div class="note" v-if="note != null">
            {{note}}
        </div>
    </div>

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
</template>

<script>
export default {
    props:{
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
        isOption: {
            type: Boolean,
            default: null
        }
    },
    data(){
        return{
            dropdown: false
        }
    },
    methods:{
        Update(){
            console.log("Update");
            this.$emit("ShowModal", {id: this.id, title: this.title, note: this.note, mode: "update"});
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
        display: flex;
        justify-content: space-between;
        // width: 80%;
        min-width: 125px;
        min-height: 125px;
        height: fit-content;
        box-sizing: border-box;
        // margin-right: 10px;
        // margin-left: 10px;
        margin: 10px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
        padding: 10px;
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

     .option-container{
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        top: 0;
        right: 0;

        .option-btn{
            // background: #fff;
            background-image: url(../assets/images/option_btn.png);
            width: 20px;
            height: 20px;
            cursor: pointer;
        }

        .option-btn:hover{
            opacity: 0.5;
        }

        .dropdown-container{
            display: inline;
            padding: 5px;
            border-radius: 10px;
            box-shadow: 2px 2px 8px rgb(187, 187, 187);
            margin-top: 3px;

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


    

    .title{
        font-size: 24px;
        font-weight: 600;
    }
</style>