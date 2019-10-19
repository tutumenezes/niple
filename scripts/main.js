(()=>{
    var niple = document.querySelector('#niple'),
        lastZ = 0,
        lastY = 0,
        minDiff = 2,
        tm = null,
        wip = 0,
        wipDivizor = 12;
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        fakeX = null;
        fakeY = null;
        audio = document.getElementsByTagName("audio")[0];
    
    
    function handleOrientation(event) {
        
        var absolute = event.absolute;
        var alpha    = event.alpha;
        var beta     = event.beta;
        var gamma    = event.gamma;
        
        if(Math.abs(lastZ - gamma) > minDiff){
            clearTimeout(tm);
            
            // telling the body about the direction for the animation
            if (gamma < 0) {
                document.body.setAttribute('data-moving', 'right');
            }
            if (gamma > 0) {
                document.body.setAttribute('data-moving', 'left');
            }

            // SUCCESS telling the body if the niple is on the correct position
            if (-3.5 < gamma && gamma < 3.5 && -3.5 < beta && beta < 3.5) {
                document.body.setAttribute('data-niple', 'true');  
                audio.play();              

            } else {
                document.body.setAttribute('data-niple', 'false');
            }
            
            console.log('gamma '+ event.gamma +' and beta '+ event.beta);

            
            // adding wipplash effect
            wip = (gamma - lastZ)/wipDivizor;
            
            // Moving the Niple
            //balloon.style.transform = 'translate(' + (gamma*10) + 'px),' + (beta*10) + 'px)';
            niple.style.transform = 'translate('+ (-gamma*4 + wip) +'%,'+ (beta*1.6 + wip) +'%)';
            

            tm = setTimeout(_=>{
                // ending the wipplash effect
                niple.style.transform = 'translate('+ (-gamma*4 - wip) +'%,'+ (beta*1.6 - wip) +'%)';
            }, 400);
            
            // and now we store the gamma
            lastZ = gamma;
        }
        
        if (Math.abs(lastY - beta) > minDiff) {
            // gatting farther or closer
            //niple.style.width = 100 /(beta-gamma) + '%';
            lastY = beta;
        }
    }

    window.addEventListener("deviceorientation", handleOrientation, true);
})();
