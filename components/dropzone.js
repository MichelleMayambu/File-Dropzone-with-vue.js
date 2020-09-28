import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";

export default {
  name: "app",
  components: {
    vueDropzone: vue2Dropzone,
  },
  data: function () {
    return {
      headers: {
        name: "Name",
        delete: "Delete",
      },
      fileUrl: [],
      tempAttachments: [],
      addedFiles: [],
      selectedDocument: [],
      selectedfile: [],
      dropzoneOptions: {
        // The Url Where Dropped or Selected files will be sent
        url: " ",
        maxFiles: 1,
        // File Size allowed in MB
        maxFilesize: 102400000,
        // Authentication Headers like Access_Token of your application
        // The way you want to receive the files in the server
        paramName: "file",
        acceptedFiles:
          "image/jpeg,image/png,image/gif,image/*,application/pdf,image/jpeg, image/png,image/jpg",
        dictDefaultMessage: "Drag and drop files here",
        includeStyling: false,
        previewsContainer: false,
        thumbnailWidth: 250,
        thumbnailHeight: 140,
        uploadMultiple: true,
        parallelUploads: 20,
      },
    };
  },
  computed: {
    getAddedFiles() {
      return this.selectedDocument;
    },
    checkAddedFiles() {
      return this.addedFiles;
    },
    checkAttachments() {
      return this.tempAttachments;
    },
  },
  methods: {
    getDataUrl() {
      var fileReader = new FileReader();
      var base64;
      fileReader.onload = (fileLoadedEvent) => {
        base64 = fileLoadedEvent.target.result;
        this.fileUrl.dataURL = base64;
      };
      fileReader.readAsDataURL(this.fileUrl);
    },
    fileAdded(file) {
      this.fileUrl = file[0];
      console.log("file", file);
      console.log("File Dropped => ", file[0]);
      let fileData = file;
      console.log("filedata", fileData);
      this.getDataUrl();
      let attachment = {};
      attachment.id = fileData[0].uuid;
      attachment.title = fileData[0].upload.filename;
      attachment.type = "file";
      attachment.extension = "." + file[0].type.split("/")[1];
      attachment.user = JSON.parse(localStorage.getItem("user"));
      attachment.content = "File Upload by Select or Drop";
      attachment.thumb = file.dataURL;
      attachment.thumb_list = file.dataURL;
      attachment.dataurl = this.fileUrl;
      attachment.isLoading = true;
      attachment.progress = null;
      attachment.entityTypeID = 0;
      attachment.color = "success";
      attachment.size = file.size;
      this.tempAttachments = [...this.tempAttachments, attachment];
      let data = new FormData();
      this.addedFiles.push(attachment);
      data.append("one file Data", attachment);
      console.log(file.length);
      file = [];
    },
    sendingFiles(files) {
      console.log("files sending", files);
    },
    success(response) {
      console.log("files uploaded successfully");
      console.log("our response is =", response);
    },
  },
};
