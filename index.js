const { BrowserWindow } = require("electron");
const electron = require("electron");
const { default: Swal } = require("sweetalert2");
const faceapi = require("face-api.js");

const axios = require('axios')

const {ipcRenderer} = electron;

const canvas = document.querySelector("#overlay")
const context = canvas.getContext('2d')

const displaySize = { width: video.width, height: video.height }






const btn = document.querySelector("#btn");
const enroll_text = document.querySelector("#txt_name");
const btn_enroll = document.querySelector("#btn_enroll");
const btn_one = document.querySelector("#btn_one");
const txt_one = document.querySelector("#txt_one");

const btn_Deneme = document.querySelector("#btn_deneme");

btn_Deneme.addEventListener('click',(e=>{
    Swal.fire({
        title: '1:1 ARama İçin İsim Giriniz',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        cancelButtonText:"VAZGEÇ",
       
        allowEnterKey:true,
        allowEscapeKey:true,
        confirmButtonText: 'ARA',
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
        takePhoto_one(login);
       
      
},
allowOutsideClick: () => !Swal.isLoading()
}).then((result=>{
    if(result.isConfirmed)
    {
        ipcRenderer.on("data:onedata",(err,value)=>{

            Swal.fire({
                    title:"Eşleşen Kişiler",
                    html:jparser(value),
                    allowEnterKey:true,
        allowEscapeKey:true,
        confirmButtonText: 'Tamam',
        cancelButtonText:"Çıkış"

            });
        
        })

    }else if (result.isDismissed) {
        Swal.fire('Arama Yapılmadı', '', 'info')


}}));;



}))


btn.addEventListener('click',(e)=>{

    takePhoto();

    let data = ipcRenderer.on("data:mdata",(erer,value)=>{

       Swal.fire({
            title:"Eşleşme Sonucu",
            showCancelButton: true,
            html:value,
            allowEnterKey:true,
            allowEscapeKey:true,
            showCloseButton:true,
            showLoaderOnConfirm: true,
            confirmButtonText:"Tamam",
            cancelButtonText:"Kapat"


       })
        
        })

})



btn_enroll.addEventListener('click',(e)=>{

    Swal.fire({
        title: 'Kayıt İçin İsim Giriniz',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
       
        allowEnterKey:true,
        allowEscapeKey:true,
        showCloseButton:true,
        confirmButtonText: 'KAYDET',
        cancelButtonText:"VAZGEÇ",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
        takePhoto_enroll(login);
        
      
},
allowOutsideClick: () => !Swal.isLoading()
}).then((result=>{
    if(result.isConfirmed)
    {
        ipcRenderer.on("edata:enrolldata",(err,value)=>{
            alert(value);

            Swal.fire("SONUÇ",value,"info");
        
        })

    }else if (result.isDismissed) {
        Swal.fire('Kayıt Yapılmadı', '', 'info')


}}));


})


function jparser(jsondata)
{
    const obj = JSON.parse(jsondata);

    console.log(obj.eslesmeSonucu)

    return"Bulunan isim : "+obj.isim+"\n"+" Eşleşme Skoru :" +obj.skor + " Kayıt ID : "+ obj.id;

 
}

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

    console.log(photoData);

    ipcRenderer.send('data:dvalue',photoData);
    
}
function takePhoto_enroll(name) {
    let canvas = window.document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, 315, 315);
    photoData = canvas.toDataURL('image/png')
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    // saveFile.click();

    console.log(photoData);

    ipcRenderer.send("en:data",{ref:"enroll",name:name,image:photoData});

    
}
function takePhoto_one(name) {
    let canvas = window.document.querySelector('canvas');
    canvas.getContext('2d').drawImage(video, 0, 0, 315, 315);
    photoData = canvas.toDataURL('image/png')
        .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
    // saveFile.click();

    console.log(photoData);

    ipcRenderer.send("data:onedata",{ref:"enroll",name:name,image:photoData});

    
}
window.onload = initialize;


