var race = () => {
  timer += .015;
  time.innerHTML = timer.toFixed(2).replace(".",":");
  
  if(timer >= 0){
  
    // Do everything below 5 times per frame to avoid clipping through obstacles.
    for(times = 0; times < 5; times++){
      
      // Handle key inputs
      // .................
      
      if(carspeed > 1.5){
        carspeed = 1.5;
      }
      
      if(carspeed < -1.5){
        carspeed = -1.5;
      }
      
      if(!air){
        
        // Up (go forward)
        if(u && !onice){
          //if(carspeed < 0 && !collision) carspeed = 0;
          if(carspeed < (oob ? .4 : acc ? 1.5 : .7)){
            carspeed = carspeed + .002;
          }
          if(carspeed < -.7){
            carspeed += .1;
          }
          if(carspeed > .7){
            carspeed *= .999;
          }
          if(carrzd < -.5 || carrzd > .5){
            carspeed *= .991;
          }
          //console.log(carspeed, acc);
        }
        
        // Down (go back)
        else if(d && !onice){
          //if(carspeed > 0 && !collision) carspeed = 0;
          if(carspeed > (oob ? -.4 : acc ? -1.5 : -.7)){
            carspeed = carspeed - .002;
          }
          if(carspeed > .7){
            carspeed -= .1;
          }
          if(carspeed < -.7){
            carspeed *= .999;
          }
          if(carrzd < -5 || carrzd > .5){
            carspeed *= .991;
          }
          
        }
        
        // Idle: decelerate if the car speed is not zero
        else if(!onice){
          carspeed *= .99;
        }
        
        // Up + left or down + right: Z angle decreases
        if((l && u) || (r && d) ){
          carrzd -= onice ? .0001 : .01;
          if(carrzd > 0){
            carrzd = 0;
          }
          if(carrzd < -.8){
            carrzd = -.8;
          }
          carrz += carrzd;
          if(carrz < 0){
            carrz += 360;
          }
          
          if(carangledisplay > -15){
            carangledisplay -= onice? .0001 : .08;
          }
        }
        
        // Up + right or down + left: angle increases
        else if((r && u) || (l && d)){
          if(carrzd <0){
            carrzd = 0;
          }
          carrzd += onice ? .0001 : .01;
          if(carrzd > .8){
            carrzd = .8;
          }
          carrz += carrzd;
          if(carrz >= 360){
            carrz -= 360;
          }
          if(carangledisplay < 15){
            carangledisplay += onice ? .0001 : .08;
          }
        }
        
        // Idle
        else {
          carangledisplay *= .99;
          carrzd *= .99;
        }
      }
        
      // Update car position
      // ...................
      carx += carspeed * Math.sin(toRadians(carrz));
      cary -= carspeed * Math.cos(toRadians(carrz));
      
      if(collision){
        justslopes();
      }
      else {
        testcollision(); 
      }
    }
    
    if(collision){
      carspeed = speedduringcollision >= 0 ? -.2 : .2;
      collision -= .1;
      if(collision <= 0) collision = 0;
    }
  }
  
  // Move the car and the camera
  // ...........................
  //carz = vspeed;
    
  C.camera({x:carx, y:cary, z:carz, rz:-carrz + carangledisplay, rx:72, el:-620});
  
  C.move({n:"car",x:carx,y:cary,z:carz,rz:carrz});
  
  if(top.time){
    time.innerHTML = timer.toFixed(2).replace(".",":");
  }
  //speed.innerHTML = ~~(carspeed*10) + "km/h";
  
  /*log("coll",collision);
  log("carspeed",carspeed.toFixed(3));
  log("vspeed",vspeed);
  log("carrz",carrz);
  log("onice",onice);
  log("carrzd",carrzd);*/
  
  // Start = restart
  if($){
    init(track);
  }
  
}

