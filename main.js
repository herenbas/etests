const { app, BrowserWindow , electron,ipcMain, ipcRenderer, Menu} = require('electron');

const url = require('url'); 

const path = require('path');
const { default: Swal } = require('sweetalert2');




let mainWindow;
let enrollWindow;
let loginWindow;

app.on('ready',()=>{

     

    mainWindow = new BrowserWindow({

        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false

        },
        icon: path.join(__dirname, 'assets/img/loft.jpg'),
           fullscreen:true
            
            

    });
mainWindow.loadURL(
url.format({ pathname:path.join(__dirname,"index.html"),


protocol:"file",
slashes:true,


})
);

const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(mainMenu);


;


})
const mainMenuTemplate = [
{
label:"İşlemler",
submenu:[
    /*{
        label:"Yüz Kaydet",
        click(item,win)
        {
            enrollWindow = new BrowserWindow({
                height: 600,
                width: 800,
                webPreferences: {
                    nodeIntegration: true,
                    enableRemoteModule: true,
                    contextIsolation:false
                },
                icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
                title: 'Yüz Kaydet',
            });
            enrollWindow.setTitle('Yüz Kaydet');
            enrollWindow.loadFile(path.join(__dirname, 'index.html'));


        }
        
    },/*
   /* {
        label:"Kişi Bul 1:1",
        click(item,focusedWindow){
            const mainWindow = new BrowserWindow({
                height: 600,
                width: 800,
                webPreferences: {
                    nodeIntegration: true,
                    enableRemoteModule: true
                },
               // icon: path.join(__dirname, 'assets', 'img', 'icon.png'),
                title: '1:1 Yüz Bul',
            });
            mainWindow.setTitle('1:1 Yüz Bul');
            mainWindow.loadFile(path.join(__dirname, 'index.html'));

        }

    },*/
   
    {
        label:"Login Sayfası",
        click(item,loginWindows)
        {
            loginWindow = new BrowserWindow({
                height: 600,
                width: 800,
                webPreferences: {
                    nodeIntegration: true,
                    enableRemoteModule: true,
                    contextIsolation:false
                },
                icon: path.join(__dirname, 'assets', 'img', 'key.png'),
                title: 'Login',
            });
            loginWindow.setTitle('My App');
            
            loginWindow.loadFile(path.join(__dirname, 'fbul.html'));


        }
        

    },
    {
        label:"Yenile",
        role:"reload"
    },
    {
        label:"Çıkış",
        role:"quit"
    },
    
]

},
{
    label:"Geliştirici Seçenekleri",
    submenu:[
        {
            label:"Aç",
            click(item,focusedWindow){
                focusedWindow.toggleDevTools();


            }
             
        }

    ]

}


]

if(process.platform=="darwin"){
mainMenuTemplate.unshift({
label:app.getName(),
role:"TODO"

})

}
 
ipcMain.on("en:data",(err,value)=>{

    kisi_kaydet(value.name,value.image);

})
ipcMain.on("loginok",(err,value)=>{

    mainWindow = new BrowserWindow({

        webPreferences:{
            nodeIntegration:true,
            contextIsolation:false

        },
        icon: path.join(__dirname, 'assets/img/loft.jpg'),
           fullscreen:true
            
            

    });
mainWindow.loadURL(
url.format({ pathname:path.join(__dirname,"index.html"),


protocol:"file",
slashes:true,


})


    


)})



ipcMain.on("data:dvalue",(err,value)=>{
    

kisi_bul(value);

    
})


ipcMain.on("endata",(err,value)=>{

    console.log(value.name);

       

})

ipcMain.on("data:onedata",(err,value)=>{

    kisi_bul_bir(value.name,value.image);

})



function kisi_bul(b_64_image){
    console.log("----------------------------------------------------------imajgeldi")
var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
//data.append('TCKN', 'şşş');
data.append('b_64_image',b_64_image)

var config = {
  method: 'post',
  url: 'http://herenbas.com/sfapi/FaceMatchN',
  headers: { 
    'User-Agent': '', 
    'Authorization': 'Bearer token', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));

  let data = JSON.parse(JSON.stringify(response.data));
  mainWindow.webContents.send("data:mdata",JSON.stringify(data));
  loginWindow.webContents.send("data:mdata",JSON.stringify(data));


})
.catch(function (error) {
  console.log(error);
});




}
function kisi_bul_bir(tckn,b_64_image)
{
    var axios = require('axios');
    var FormData = require('form-data');
    var data = new FormData();
    data.append('TCKN', tckn);
    data.append('b_64_image',b_64_image)
    
    var config = {
      method: 'post',
      url: 'http://herenbas.com/fapi/FaceMatch',
      headers: { 
        'User-Agent': '', 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzkzODczNTgsImV4cCI6MTY4MTExNTM1OCwiaXNzIjoiS29kZGEgWWF6xLFsxLFtICIsImF1ZCI6Ind3dy5oZXJlbmJhcy5jb20ifQ.dEOldLq8eVsTyxqXHswphQDmoBhPU_9_XeY3iOLBbiQ', 
        ...data.getHeaders()
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      mainWindow.webContents.send("data:onedata",JSON.stringify(response.data));
    
    })
    .catch(function (error) {
      console.log(error);
    });


}
function kisi_kaydet(tckn,b64image)
{
    var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('TCKN', tckn);
data.append("b_64_image",b64image);

var config = {
  method: 'post',
  url: 'http://herenbas.com/fapi/FaceEnroll',
  headers: { 
    'User-Agent': '', 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2NzkzODczNTgsImV4cCI6MTY4MTExNTM1OCwiaXNzIjoiS29kZGEgWWF6xLFsxLFtICIsImF1ZCI6Ind3dy5oZXJlbmJhcy5jb20ifQ.dEOldLq8eVsTyxqXHswphQDmoBhPU_9_XeY3iOLBbiQ', 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));

  mainWindow.webContents.send("edata:enrolldata",JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}




