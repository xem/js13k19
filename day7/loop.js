// Game loop
// ---------

setInterval(()=> {
  
  // Race mode:
  if(mode == 2){
  
    // Do everything below 5 times per frame to avoid clipping through obstacles.
    for(var times = 0; times < 5; times++){
    
      delog();
      log("oob", oob);
      
      // Handle key inputs
      // .................
      
      // Up (go forward)
      if(u){
        //if(carspeed < 0 && !collision) carspeed = 0;
        carspeed += .002;
        if(carspeed > (oob ? .2 : .4)) carspeed = (oob ? .2 : .4);
      }
      
      // Down (go back)
      else if(d){
        //if(carspeed > 0 && !collision) carspeed = 0;
        carspeed -= .0015;
        if(carspeed < (oob ? -.15 : -.3)) carspeed = (oob ? -.15 : -.3);
      }
      
      // Idle: decelerate if the car speed is not zero
      else{
        carspeed *= .99;
      }
      
      // Up + left or down + right: Z angle decreases
      if((l && (u)) || (r && (d))){
        carrz -= .7;
      }
      
      //else if((l && carspeed >= 0) || (r && carspeed < 0)){
      //  carrz -= .7;
      //}
      
      // Up + right or down + left: angle increases
      else if((r && (u)) || (l && (d))){
        carrz += .7;
      }
      
      //else if((r && carspeed >= 0) || (l && carspeed < 0)){
      //  carrz += .7;
      //}
      
      // Update car position
      // ...................

      carx += carspeed * Math.sin(toRadians(carrz));
      cary -= carspeed * Math.cos(toRadians(carrz));
      
      
      // Compute car's front and back points
      // ...................................
      
      // Coordinates (range 0 - 400)
      var f = [carx + 2 * Math.sin(toRadians(carrz)), cary - 2 * Math.cos(toRadians(carrz)),0];
      var b = [carx + -2 * Math.sin(toRadians(carrz)), cary - -2 * Math.cos(toRadians(carrz)),0];
      
      // Cell (range 0 - 20)
      fcell = [~~(f[0]/20),~~(f[1]/20),0];
      bcell = [~~(b[0]/20),~~(b[1]/20),0];
      
      // Cell info
      
      
      // Collisions / position
      // .....................
      
      // Compute if the car is on the road or oob (in the snow), and handle collisions with barriers.
      
      //oob = 0;
      //delog();
      
      // Forward
      if(carspeed >= 0){
        testcollision(f,fcell,fcellinfo);
      }
      
      // Backward
      else {
        testcollision(b,bcell,bcellinfo);
      }
      
      // Save front and back cells
      // .........................
      
      frontcell = fcell;
      backcell = bcell;
    }
    
    if(collision){
      carspeed = speedduringcollision >= 0 ? -.05 : .05;
      collision -= .1;
      if(collision <= 0) collision = 0;
    }
  }

  // Move the car and the camera
  // ...........................
  
  C.camera({x:carx,y:cary,rz:-carrz});
  C.move({n:"car",x:carx,y:cary,rz:carrz + 90});
  
},33);