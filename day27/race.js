var race = () => {
  timer += .015;
  time.innerHTML = timer.toFixed(2).replace(".",":");

  delog();
  log("oob", oob);
  
  if(timer >= 0){
  
    // Do everything below 5 times per frame to avoid clipping through obstacles.
    for(times = 0; times < 5; times++){
      
      // Handle key inputs
      // .................
      
      if(!air){
        
        // Up (go forward)
        if(u){
          //if(carspeed < 0 && !collision) carspeed = 0;
          if(carspeed < (oob ? .4 : acc ? 1.5 : .7)){
            carspeed += .002;
          }
          if(carspeed > 1.5){
            carspeed = 1.5;
          }
          //console.log(carspeed, acc);
        }
        
        // Down (go back)
        else if(d){
          //if(carspeed > 0 && !collision) carspeed = 0;
          if(carspeed > (oob ? -.4 : acc ? -105 : -.7)){
            carspeed -= .002;
          }
          if(carspeed < -1.5){
            carspeed = -1.5;
          }
        }
        
        // Idle: decelerate if the car speed is not zero
        else{
          carspeed *= .99;
        }
        
        // Up + left or down + right: Z angle decreases
        if((l && u) || (r && d) ){
          carrz -= .8;
          if(carangledisplay > -15){
            carangledisplay -= .5;
          }
        }
        
        // Up + right or down + left: angle increases
        else if((r && u) || (l && d)){
          carrz += .8;
          if(carangledisplay < 15){
            carangledisplay += .5;
          }
        }
        
        // Idle
        else {
          carangledisplay *= .99;
        }
      }
        
      // Update car position
      // ...................
      carx += carspeed * Math.sin(toRadians(carrz));
      cary -= carspeed * Math.cos(toRadians(carrz));
        
      
      // Compute car's front and back points
      // ...................................
      
      // Coordinates (range 0 - 400)
      //var f = [carx + 2 * Math.sin(toRadians(carrz)), cary - 2 * Math.cos(toRadians(carrz)),0];
      //var b = [carx + -2 * Math.sin(toRadians(carrz)), cary - -2 * Math.cos(toRadians(carrz)),0];
      
      // Cell (range 0 - 20)
      //fcell = [~~(f[0]/size),~~(f[1]/size),0];
      //bcell = [~~(b[0]/size),~~(b[1]/size),0];
      
      // Cell info
      
      
      // Collisions / position
      // .....................
      
      // Compute if the car is on the road or oob (in the snow), and handle collisions with barriers.
      
      //oob = 0;
      //delog();
      
      
      //[x,y,z] = fcell;
      //try{fcellinfo = space[x][y][z];}catch(e){}
      
      
      // Forward
      if(carspeed >= 0){
        
        //if(carz == 0){
        //  if(oob && 
        //}
        
        
        //testcollision(fcell,fcellinfo);
      }
      
      // Backward
      else {
        //testcollision(bcell,bcellinfo);
      }
      
      // Save front and back cells
      // .........................
      
      //frontcell = fcell;
      //backcell = bcell;
      
      
      if(collision){
        justslopes();
      }
      else {
        testcollision(); 
      }
    }
    
    if(collision){
      carspeed = speedduringcollision >= 0 ? -.1 : .1;
      collision -= .1;
      if(collision <= 0) collision = 0;
    }

    
  }
  
  
  // Move the car and the camera
  // ...........................
  //carz = vspeed;
    
  C.camera({x:carx, y:cary, z:carz, rz:-carrz + carangledisplay, rx:75, el:-550});
  
  C.move({n:"car",x:carx,y:cary,z:carz,rz:carrz});
  
  time.innerHTML = timer.toFixed(2).replace(".",":");
  //speed.innerHTML = ~~(carspeed*10) + "km/h";
  
  log("coll",collision);
  log("carspeed",carspeed.toFixed(3));
  log("vspeed",vspeed);
  
}