<template>
    <div class="image-container"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="OnDrop"
        :class="{dragging: isDragging}">

        <div v-show="!images.length">
            <p>Drag your images here</p>
            <div>OR</div>
            <div class="image-input">
                <label for="image">Select a file</label>
                <input type="file" ref="file" id="image" @change="OnInputChange" multiple>
            </div>
        </div>

        <div class="images-preview" v-show="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <img :src="image" :alt="'Image Uploader ${index}'">
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import toastr from 'vue-toastr'

export default {
    props:{
        projectID:Number,
        customerID:String,
        kind:{//0 : Customers Photo, 1 : Project Timeline
            type: Number,
            default: null
        },
        photo:{
            type: String,
            default: null
        }
    },
    data(){
        return{
            isDragging: false,
            dragCount: 0,
            files: [],
            images: [],
            file: ""
        }
    },
    created(){
        console.log(this.projectID);
        console.log(this.customerID);
        if(this.kind == 0){
            console.log("getcustomerphoto");
        }
        else if(this.kind == 1){
            axios.post('/getimage', {id: this.projectID, type: 1})
            .then(res => {
                this.images.push(res.data.data);
            }).catch(err => {
                console.log(err);
            });
        }


        console.log('this.photo')
        console.log(this.photo)
        if(this.photo != null){
            this.images.push(this.photo);
        }
    },
    methods:{
        OnDragEnter(e){
            e.preventDefault();
            this.dragCount++;
            this.isDragging=true;
        },
        OnDragLeave(e){
            e.preventDefault();
            this.dragCount--;

            if(this.dragCount <= 0){
                this.isDragging = false;
            }
        },
        OnDrop(e){//Drop Image
            console.log('drop');
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = false;

            const files = e.dataTransfer.files;
            console.log(files);
            this.file = files[0];

            if(files.length == 1){
                Array.from(files).forEach(file => this.addImage(file));
            }

            if(this.kind == 0){
                this.$emit("ImageTransfer", this.file);
            }
            else if(this.kind == 1){
                this.upload();
            }
            
        },
        addImage(file){
            if(!file.type.match('image.*')){
                alert('${file.name} is not an image');
                return;
            }

            this.files.pop();
            this.files.push(file);

            console.log('file')
            console.log(file)

            const reader = new FileReader();

            this.images.pop();
            reader.onload = (e) => this.images.push(e.target.result);
            // reader.onload((e) => {
            //     this.images.push(e.target.result)
            //     this.upload();
            // });
            reader.readAsDataURL(file);
        },
        OnInputChange(e){//Select Image
            const files = e.target.files;
            this.file = this.$refs.file.files[0];

            Array.from(files).forEach(file => this.addImage(file));

            if(this.kind == 0){
                this.$emit("ImageTransfer", this.file);
            }
            else if(this.kind == 1){
                this.upload();
            }
        },
        async upload(){
            var temp = this.file.slice(0, this.file.size, this.file.type);
            if(this.customerID != null){
                this.file = new File([temp], this.customerID, {type: String(this.file.type)});
            }
            else if(this.projectID != null){
                this.file = new File([temp], this.projectID, {type: String(this.file.type)});
            }
            
            
            const formData = new FormData();
            formData.append('file', this.file);

            if(this.customerID != null){
                try{
                    await axios.post('/uploadcustomerphoto', formData);
                } catch(err){
                    console.log(err);
                }
            }
            else if(this.projectID != null){
                try{
                    await axios.post('/uploadtimeline', formData);
                } catch(err){
                    console.log(err);
                }
            }
            
            
            // const formData = new FormData();

            // // this.files.forEach(file => {
            // //     formData.append('images[]', file, file.name);
            // // })

            // axios.post('/uploadtimeline', formData)
            // .then(res =>{
            //     this.$toastr.s('All images uploaded successfully!');
            //     this.images = [];
            //     this.files = [];
            // }).catch(err =>{
            //     console.log(err)
            // })
        }
    }
}
</script>

<style lang="scss" scoped>
    .image-container{
        // border-radius: 10px;
        // box-shadow: 2px 2px 5px rgb(187, 187, 187);
        width: 100%;
        min-width: 300px;
        color: #000000;
        border: 0.1px solid rgb(199, 199, 199);
        
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 4px;


        &.dragging{
            background: #fff;
            box-shadow: 2px 2px 15px rgb(187, 187, 187);
            
        }
    }

    .image-input{
        width: 200px;
        margin:auto;
        height:68px;
        position: relative;

        label,
        input {
            width:100%;
            position: absolute;
            left:0;
            top:0;
            padding:10px;
            border-radius:4px;
            margin-top:7px;
            cursor:pointer;
        }

        input{
            opacity: 0;
            z-index: -2;
        }
    }

    .images-preview{
        display: flex;
        flex-wrap: wrap;
        height: fit-content;
        width: fit-content;
        padding: 1px;
    }

    .img-wrapper{
        background: #fff;
        border-radius: 10px;
        overflow: hidden;

        img{
            height: auto;
            width: 100%;
        }
    }

    .details{
        font-size: 12px;
        background: #fff;
        color: #000;
        display: flex;
        flex-direction: column;
        align-items: self-start;
        padding: 3px 6px;

        .name{
            overflow: hidden;
            height: 18px;
        }
    }

    .upload-control{
        position:absolute;
        width: 100%;
        background:#fff;
        top: 0;
        left: 0;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        padding: 10px;
        padding-bottom: 4px;
        text-align: right;

        button, label{
            background: #2196F3;
            border: 2px solid #83A9f4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }

        label{
            padding: 2px 5px;
            margin-right: 5px;
        }
    }

</style>