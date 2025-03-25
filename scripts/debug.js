function refresh() {
    isHome = true;
    window.location.reload();
}

let isHome = true;

var idleTime = 0;
    $(document).ready(function () {
        // Increment the idle time counter every minute.
        var idleInterval = setInterval(timerIncrement, 10000); // 10 segundos

        // Zero the idle timer on mouse movement.
        $(this).mousemove(function (e) {
            idleTime = 0;
            console.log(idleTime)
        });
        $(this).keypress(function (e) {
            idleTime = 0;
            console.log(idleTime)
        });
    });

    function timerIncrement() {
        idleTime = idleTime + 1;
        console.log(idleTime)
        if (idleTime > 3 && !isHome) { // 40 segundos
            refresh()
        }
    }


$( "#navigateToCamera" ).on( "click", async function() {
    isHome = false;
    $(` .background-container .slide-in,
        .home #home-title, 
        .home .snippy .slide-in, 
        .home .cta, 
        .home .footer` ).removeClass( "slide-in" ).addClass( "slide-out" );
    $(` section.pic `).addClass( "active" );
    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    setTimeout(tirarFoto, 8250);
});

$( "#print" ).on( "click", async function() {
    printPic()
    $(` section.pic `).addClass( "slide-out" );
    $(` .background-container > img `).removeClass( "slide-out" ).addClass( "slide-in" );
    $(` section.outboard `).addClass( "active" );
    setTimeout(refresh, 5000);
});

function printPic() {
    let dateStamp = new Date().toLocaleString();
    console.log(dateStamp)
    var link = document.createElement('a');
    link.download = dateStamp +'.jpeg';
    link.href = picData;
    link.click();
    
}


$( "#tryAgain" ).on( "click", async function() {
    $(` section.pic `).addClass( "retake" );
    setTimeout( function(){
        tirarFoto()
        $(` section.pic `).removeClass( "retake" );
        $(` .pic.active .operations `).css('animation-delay', '0s');
    }, 4000);
});

let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");

let fileInput = document.querySelector("#send-file");


function tirarFoto() {                      //Largura Inicio // Altura Inicio // Largura Inicio + 800 // Altura Inicio + 800
    canvas.getContext('2d').drawImage(video, 0, 0, 1067, 800);
    let image_data_url = canvas.toDataURL('image/png');
    // data url of the image

     domtoimage.toJpeg(document.getElementById('pic-frame'), { quality: 1 })
        .then(function (dataUrl) {
            picData = dataUrl;
        });  
    };
