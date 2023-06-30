const { BrowserWindow, ipcRenderer } = require("electron");
const electron = require("electron");
const { default: Swal } = require("sweetalert2");





const btn = document.querySelector("#btn");
const txt_name = document.querySelector('#txt_name');
btn.addEventListener('click',(error)=>{






takePhoto();
let data = ipcRenderer.on("edata:enrolldata",(erer,value)=>{

   Swal.fire("Sonuç",value,"info");
    
    })

})





function initialize() {
   
    video = window.document.querySelector("#video");
    let errorCallback = (error) => {
        console.log(
            'There was an error connecting to the video stream:', error
        );
    };
    window.navigator.webkitGetUserMedia(
        { video: true, facingMode:'user' },
        (localMediaStream) => {
            video.srcObject = localMediaStream;
            video.onloadedmetadata = bindSavingPhoto;
        }, errorCallback);

       
}
function takePhoto() {
    let canvas = window.document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, 315, 315);
    photoData = canvas.toDataURL('image/png')
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    // saveFile.click();


 
    ipcRenderer.send("en:data",{ref:"enroll",name:txt_name.value,image:photoData});

    
}
window.onload = initialize;