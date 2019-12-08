<template>
<div class="element" @click="Select">
    <div class="option" v-if="isOption" @click="Option">
    </div>
    <div class="dropdown" v-show="dropdown">
        <div>
            <li><button @click="Update">수정</button></li>
            <li><button @click="Delete">삭제</button></li>
        </div>
    </div>
    <div>
        <div class="title">
            {{title}}
        </div>
        <div class="note" v-if="note != null">
            {{note}}
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
        width: 100px;
        height: 100px;
        border-radius: 10px;
        box-shadow: 3px 3px 3px #000;
        padding: 5px;
        margin: 5px;
    }

    .dropdown{
        border: 3px solid #000;
        background: #fff;
        float: right;
        width: 50px;
        text-align: center;
        margin-top: 20px;

        li{
            list-style: none;
            margin: 2px;
            border: 1px solid #000;
        }
    }

    .option{
        background: #fff;
        background-image: url(../assets/option_btn.png);
        float: right;
        width: 20px;
        height: 20px;
        cursor: pointer;
    }

    .title{
        font-size: 20px;
        cursor: default;
    }
</style>