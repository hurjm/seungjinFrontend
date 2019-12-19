<template>
    <div class="container" @click="Select">
        <div class="title">
            {{title}}
        </div>

    </div>
</template>

<script>
export default {
    props:{
        itemId:{
            type: Number,
            default: null
        },
        title:{
            type: String,
            default: null
        }
    },
    methods:{
        Select(e){
            this.$emit('Select', {id: this.itemId, title: this.title, e: e});
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>