const { ipcRenderer } = require('electron');
const faceapi = require('face-api.js')
const fs = require('fs');
const path = require('path');
const { default: Swal } = require("sweetalert2");


const video = document.querySelector("#video")
const canvas_cap = document.querySelector('#overlay')
const lbl_sonuc = document.querySelector('#lbl_sonuc');
const avatar = document.querySelector("#avatar");
const prg = document.querySelector("#prg");
const nokta = document.querySelector("#nokta");
const array = 5;



faceapi.env.setEnv(Object.assign(faceapi.env.createBrowserEnv(), faceapi.env.createFileSystem(fs)));
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia








navigator.getUserMedia(
  { video: true },
  stream => video.srcObject = stream,
  err => console.error(err)
)
const useTinyModel = true


    video.addEventListener('play', () => {
     
            // Create canvas from our video element
    
      // Current size of our video
    
      // run the code multiple times in a row --> setInterval
      //  async func 'cause it's a async library
      
        islem();

      
   
       
  });

  function jparserN(jsondata)
  {
          const obj = JSON.parse(jsondata);

          return("İSİMLER: " + obj.eslesenKisiler);


  }

  function islem()
  {
prg.setAttribute("style","width: 50%")

    const canvas = faceapi.createCanvasFromMedia(video);
    canvas.setAttribute("position","absolute");
    canvas.setAttribute("top","0");
    canvas.setAttribute("left","0");
    canvas.setAttribute("class","form-control invisible")
    
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height }
    faceapi.matchDimensions(canvas, displaySize);
    var int1= setImmediate(async () => {
    
      
      await faceapi.nets.tinyYolov2.loadFromDisk(path.join(__dirname,'models'));
      await faceapi.nets.tinyFaceDetector.loadFromDisk(path.join(__dirname,'models'))
      await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname,'models'))
      await faceapi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname,'models'))
      await faceapi.nets.ageGenderNet.loadFromDisk(path.join(__dirname,'models'))

      await faceapi.nets.ssdMobilenetv1.loadFromDisk(path.join(__dirname, 'models'))
        // Every 100ms, get all the faces inside of the webcam image to video element
       

        
       
        const detections = await faceapi.detectSingleFace(video, 
        new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks().withFaceExpressions().withAgeAndGender()
            prg.setAttribute("style","width: 100%")
      
          if(detections==undefined)
          {
            lbl_sonuc.setAttribute("class","text-danger")
          lbl_sonuc.innerHTML=("<h2>YÜZ BULUNAMADI</h2>");
            islem()
          }

          
        
          

        // boxes will size properly for the video element
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // get 2d context and clear it from 0, 0, ...
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        console.log(detections.expressions);
       
        //console.log(detections.detection.score);
        //console.log(detections.age)
          try {
            if(detections.detection.score>0.5 && detections!=undefined)
            {          
           //  clearInterval(int1);
            canvas_cap.getContext('2d').drawImage(video, 0, 0, 200,200);  
            photoData = canvas_cap.toDataURL('image/png')
            .replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
  
            //avatar.setAttribute("src",canvas_cap.toDataURL());
           
            ipcRenderer.send('data:dvalue',photoData);
            ipcRenderer.on("data:mdata",(erer,value)=>{
              lbl_sonuc.setAttribute("class","form-text text-muted")
              lbl_sonuc.innerHTML ="<p>"+ (value)+"</p>";

          

              
             
              if(JSON.stringify(value).includes("YOK")){
  
                Swal.fire("SONUÇ","Login Başarısız","error")
  
  
              }else{
                Swal.fire("SONUÇ","Login Başarılı","success")

                
               
                const data = JSON.parse(value);
                console.log(data);
               
                
                lbl_sonuc.innerHTML="<h2>"+"Hoşgeldin "+data.eslesenKisiler[0].isim+"</h2>"

                

                //ipcRenderer.send("loginok","1");
                

              }
              
              console.log(JSON.parse(value));
             //clearInterval(int1);
             
            
            })
  
              
            }
           
            
          } catch (error) {
            console.log(error)
            
          }
       
       
         
    }, 5000)
  }

  


  
     
    
  
  