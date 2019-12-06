<template>
    <div class="file-uploader"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="OnDrop"
        :class="{dragging: isDragging}">

        <div v-show="!images.length">
            <label for="file">
            <p>Drag your files here</p>
            <div>OR</div>
            <p>Select a file</p>
            </label>
            <div class="file-input">
                <input v-show="false" type="file" ref="file" id="file" @change="OnInputChange" multiple>
            </div>
        </div>

        <div class="file-preview" v-show="images.length">
            <div class="file-wrapper" :id="file.id + file.name" v-for="file in images" :key="file.id">
                <span @click="DownloadFile" :id="file.id + file.name">{{file.name}}</span>
                <span @click="DeleteFile" :id="file.id + file.name" class="cancel_btn"></span>
            </div>
            <!-- <div class="file-wrapper" :id="projectID + '_' + index + '.' + file" v-for="(file, index) in images" :key="index">
                <span @click="DownloadFile" :id="projectID + '_' + index + '.' + file">{{file}}</span>
                <span @click="DeleteFile" :id="projectID + '_' + index + '.' + file" class="cancel_btn"></span>
            </div> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import toastr from 'vue-toastr'

export default {
    props:{
        projectID:Number
    },
    data(){
        return{
            isDragging: false,
            dragCount: 0,
            files: [],
            images: [],
            file: "",
            lastIndex: 0
        }
    },
    created(){
        console.log('projectID');
        console.log(this.projectID);
        this.GetFiles();
    },
    methods:{
        async DownloadFile(e){
            if(!this.isDragging){
                console.log("download!!");
                var filename = e.target.id;
                console.log(filename);
                 await axios({
                    url: 'http://localhost:80/downloadsubmatfile', 
                    method: 'post',
                    data: {
                        name: filename
                    },
                    responseType: 'blob'
                 })
                .then(res => {
                    console.log(res);
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    console.log(url);
                    const link = document.createElement('a');
                    link.href = url;
                    const index = filename.indexOf('.');
                    filename = filename.substring(index, filename.length);
                    link.setAttribute('download', filename); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        async DeleteFile(e){
            if(!this.isDragging){
                console.log("Delete!");
                console.log(e.target.id);
                console.log(e.target);
                const filename = e.target.id;
                await axios.post('http://localhost:80/deletesubmatfile', {name: filename})
                .then(res => {
                    if(res.data.result == 'success'){
                        console.log('success');
                        document.getElementById(filename).remove();
                    }
                    else{
                        console.log('error');
                        console.log(res);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        GetFiles(){
            axios.post('http://localhost:80/getsubmatfiles', {projectid: this.projectID})
            .then(res => {
                let pointIndex;
                let barIndex;
                let id;
                let name;
                console.log('getfiles');
                console.log(res.data);

                res.data.forEach(data => {
                    pointIndex = data.indexOf('.');
                    barIndex = data.indexOf('_');
                    id = data.substring(0, pointIndex + 1);
                    name = data.substring(pointIndex + 1, data.length);
                    console.log(data);
                    console.log(id);
                    console.log(name);
                    this.lastIndex = Number(data.substring(barIndex + 1, pointIndex)) + 1;
                    this.images.push({id: id, name: name});
                    console.log(this.lastIndex);
                })
                // this.images = res.data.data;
                // this.lastIndex = Number(res.data.lastIndex);
            }).catch(err => {
                console.log(err);
            })
        },
        AddFile(file, index){
            this.files.push(file);
            console.log('AddFIle');
            console.log(index)

            this.images.push({id: this.projectID + '_' + this.lastIndex + '.', name:file.name});

            this.UploadFile(file, index);
        },
        async UploadFile(file, index){
            var temp = file.slice(0, file.size, file.type);

            file = new File([temp], this.projectID + '_' + this.lastIndex + '.' + file.name, {type: String(file.type)});
            
            const formData = new FormData();
            formData.append('file', file);

            await axios.post('http://localhost:80/uploadsubmatfile', formData)
            .then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        },
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

            console.log('files')

            Array.from(files).forEach((file, index) =>{
                console.log(files.length)
                console.log(index)
                console.log(this.images.length)
            });

            Array.from(files).forEach((file, index)=> {
                this.AddFile(file, this.lastIndex + index)
                this.lastIndex++;
                });
            
        },
        OnInputChange(e){
            const files = e.target.files;
            this.file = this.$refs.file.files[0];

            Array.from(files).forEach(file => this.addImage(file));
        }
    }
}
</script>

<style lang="scss" scoped>
    .file-uploader{
        display: flex;
        flex-direction: column;
        width: 100px;
        min-height: 100px;
        height: fit-content;
        background: #2196F3;
        color: #fff;
        text-align: center;
        border-radius: 10px;
        border: 3px dashed #fff;
        font-size: 10px;

        &.dragging{
            background: #fff;
            color: #2196F3;
            border: 3px dashed #2196F3;
            
            .file-input label{
                background: #2196F3;
                color:#fff;
            }
        }
    }

    .file-input{
        // margin:auto;
        // position: relative;

        label,
        input {
            // background: #fff;
            color:#2196F3;
            // position: absolute;
            // left:0;
            // top:0;
            // padding:10px;
            border-radius:4px;
            // margin-top:7px;
            cursor:posinter;
        }

        input{
            opacity: 0;
            z-index: -2;
        }
    }

    .file-preview{
        display: flex;
        flex-direction: column;
    }

    .file-wrapper{
        display: flex;
        font-size:10px;
        align-items: center;
        flex-direction: row;
        padding: 2px;
        margin: 10px;
        justify-content: space-between;
        text-overflow:ellipsis;
        word-break:break-all;
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

    .cancel_btn{
        display: block;
        margin-left: 3px;
        margin-right: 1px;
        min-width: 10px;
        min-height: 10px;
        background-image: url(../assets/cancel_btn.png);
    }

    .upload-control{
        position:absolute;
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