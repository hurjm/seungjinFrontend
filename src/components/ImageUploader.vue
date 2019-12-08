<template>
    <div class="image-uploader"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="OnDrop"
        :class="{dragging: isDragging}">

        <div class="upload-control" v-show="images.length">
            <label for="file">Select a file</label>
            <button @click="upload">Upload</button>
        </div>

        <div v-show="!images.length">
            <i class="fa fa-cloud-upload"></i>
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
        projectID:String,
        customerID:String
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
        if(this.projectID != null){
            axios.post('http://localhost:80/gettimeline', {id: this.projectID})
            .then(res => {
                this.images.push(res.data.data);
            }).catch(err => {
                console.log(err);
            });
        }
        // else if(this.customerID != null){
        //     axios.post('http://localhost:80/getcustomerphoto', {id: this.customerID})
        //     .then(res => {
        //         this.images.push(res.data.data);
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // }
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
        OnDrop(e){
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = false;

            const files = e.dataTransfer.files;

            if(files.length == 1){
                Array.from(files).forEach(file => this.addImage(file));
            }
            
        },
        addImage(file){
            if(!file.type.match('image.*')){
                this.$toastr.e('${file.name} is not an image');
                return;
            }

            this.files.pop();
            this.files.push(file);
            
            const img = new Image();
            const reader = new FileReader();

            this.images.pop();
            reader.onload = (e) => this.images.push(e.target.result);

            reader.readAsDataURL(file);
        },
        OnInputChange(e){
            const files = e.target.files;
            this.file = this.$refs.file.files[0];

            Array.from(files).forEach(file => this.addImage(file));
        },
        async upload(e){
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
                    await axios.post('http://localhost:80/uploadcustomerphoto', formData);
                } catch(err){
                    console.log(err);
                }
            }
            else if(this.projectID != null){
                try{
                    await axios.post('http://localhost:80/uploadtimeline', formData);
                } catch(err){
                    console.log(err);
                }
            }
            
            
            // const formData = new FormData();

            // // this.files.forEach(file => {
            // //     formData.append('images[]', file, file.name);
            // // })

            // axios.post('http://localhost:80/uploadtimeline', formData)
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
    .image-uploader{
        width: 80%;
        color: #fff;
        padding: 40px 15px;
        text-align: center;
        border-radius: 10px;
        border: 3px dashed #fff;
        font-size: 20px;
        position: relative;


        &.dragging{
            background: #fff;
            color: #2196F3;
            border: 3px dashed #2196F3;
            
            .image-input label{
                background: #2196F3;
                color:#fff;
            }
        }
    }

    .image-input{
        width: 200px;
        margin:auto;
        height:68px;
        position: relative;

        label,
        input {
            background: #fff;
            color:#2196F3;
            width:100%;
            position: absolute;
            left:0;
            top:0;
            padding:10px;
            border-radius:4px;
            margin-top:7px;
            cursor:posinter;
        }

        input{
            opacity: 0;
            z-index: -2;
        }
    }

    .images-preview{
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
    }

    .img-wrapper{
        // width: 500px;
        // display: flex;
        // flex-direction: column;
        margin: 10px;
        // height: 500px;
        justify-content: space-between;
        background: #fff;
        box-shadow: 5px 5px 20px #3e3737;
        border:3px solid #000;

        img{
            max-height: 300px;
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