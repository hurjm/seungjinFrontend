<template>
<div :class="['element element-' + type]" @click="Select">
    <div class="content-container">
        <div class="title">
            {{title}}
        </div>

        <div class="option-container" v-if="kind!=2">
            <img class="option-btn" src="../assets/images/list_option_btn.png" v-if="isOption" @click="Option"/>
            <div class="dropdown-container" v-show="dropdown">
                <div class="dropdown-content">
                    <div class="dropdown-btn" @click="Update">수정</div>
                    <div class="dropdown-btn" @click="Delete">삭제</div>
                </div>
            </div>
        </div>
    </div>
    <img class="photo" :src="photo" v-if="photo!=null">
</div>
</template>

<script>
export default {
    props:{
        kind: {
            type: Number,
            default: null
        },
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
        photo: {
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
            dropdown: false,
            type: null
        }
    },
    mounted(){
        console.log('mounted');
        // console.log(this.id);
        // console.log(this.photo);
        // console.log(this.kind);
        if(this.kind == 0){
            this.type = "customers";
        }
        else if(this.kind == 2){
            this.type = "recipes";
        }
    },
    methods:{
        Update(){
            console.log("Update");
            this.$emit("ShowModal", {id: this.id, title: this.title, note: this.note, photo: this.photo, mode: "update"});
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
                this.$emit('Select', {
                    id: this.id,
                    title: this.title,
                    note: this.note
                });
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
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 2px 2px 5px rgb(187, 187, 187);
        padding: 10px;
        cursor: pointer;

        &-customers{
            width: 100px;
            height: 100px;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        &-recipes{
            width: 100%;
            height: fit-content;
            margin-bottom: 10px;
            margin-top: 10px;
        }
    }

    .element:hover{
        box-shadow: 2px 2px 10px rgb(187, 187, 187);
    }

    .content-container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    .title{
        font-weight: 600;
    }

    .option-container{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative  ;
    right: 0;

        .option-btn{
            // background: #fff;
            // background-image: url(../assets/images/list_option_btn.png);
            width: 10px;
            height: 13px;
            cursor: pointer;
        }

        .option-btn:hover{
            opacity: 0.5;
        }

        .dropdown-container{
            position: absolute;
            top:22px;
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


    .photo{
        width: 75%;
        height: 75%;
    }
</style>