// Game loop
// ---------

setInterval(()=> {
  
  // Race mode:
  if(mode == 2){
  
    // Do everything below 5 times per frame to avoid clipping through obstacles.
    for(var times = 0; times < 5; times++){
    
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
      if((l && (u || carspeed > .01)) || (r && d)){
        carrz -= .7;
      }
      
      // Up + right or down + left: angle increases
      else if((r && (u || carspeed > .01)) || (l && d)){
        carrz += .7;
      }
      
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
      
      // Compute if the car is on the road, oob (in the snow), and collisions with barriers.
      //oob = 0;
      delog();
      
      // Forward
      if(carspeed >= 0){
        
        [x,y,z] = fcell;
        try{fcellinfo = space[x][y][z];}catch(e){}
        
        // No cell info : oob
        if(!fcellinfo){
          oob = 1;
        }
        
        // No links (ie. no barriers): inbounds
        else if(fcellinfo.u + fcellinfo.r + fcellinfo.d + fcellinfo.l == 0){
          oob = 0;
        }
        
        // 1 link or more: it depends
        else {
          
          // Check every flat (unrounded) barrier:
          
          // up
          if(fcellinfo.barriers.u && fcellinfo.flat.u && (f[1]%20) < 1){
            collision = 1;
          }
          
          // right
          else if(fcellinfo.barriers.r && fcellinfo.flat.r && (f[0]%20) > 19){
            collision = 1;
            speedduringcollision = carspeed;
          }
          
          // down
          else if(fcellinfo.barriers.d && fcellinfo.flat.d && (f[1]%20) > 19){
            collision = 1;
            speedduringcollision = carspeed;
          }
          // left
          else if(fcellinfo.barriers.l && fcellinfo.flat.l && (f[0]%20) < 1){
            collision = 1;
            speedduringcollision = carspeed;
          }
          
          // Then use the oob equation
          //if(!oob){
            [x,y,z] = f;
            var ev = eval(fcellinfo.equation);
            if(ev == !oob){
              collision = 1;
              speedduringcollision = carspeed;
              oob = !ev;
            }
          //}
        }
      }
      
      // Backward
      else {
      
        [x,y,z] = bcell;
        try{bcellinfo = space[x][y][z];}catch(e){}
        
        // No cell info : oob
        if(!bcellinfo){
          oob = 1;
        }
        
        // No links (ie. no barriers): inbounds
        else if(bcellinfo.u + bcellinfo.r + bcellinfo.d + bcellinfo.l == 0){
          oob = 0;
          speedduringcollision = carspeed;
        }
        
        // 1 link or more: it depends
        else {
          
          // Check every flat (unrounded) barrier:
          
          // up
          if(bcellinfo.barriers.u && bcellinfo.flat.u && (b[1]%20) < 1){
            collision = 1;
            speedduringcollision = carspeed;
          }
          
          // right
          else if(bcellinfo.barriers.r && bcellinfo.flat.r && (b[0]%20) > 19){
            collision = 1;
            speedduringcollision = carspeed;
          }
          
          // down
          else if(bcellinfo.barriers.d && bcellinfo.flat.d && (b[1]%20) > 19){
            collision = 1;
            speedduringcollision = carspeed;
          }
          // left
          else if(bcellinfo.barriers.l && bcellinfo.flat.l && (b[0]%20) < 1){
            collision = 1;
            speedduringcollision = carspeed;
          }
          
          // Then use the oob equation
          //if(!oob){
            [x,y,z] = b;
            var ev = eval(bcellinfo.equation);

            if(ev == !oob){
              collision = 1;
              speedduringcollision = carspeed;
              oob = !ev;
            }
          //}
        }
      
      }
      
      // Save front and back cells
      // .........................
      
      frontcell = fcell;
      backcell = bcell;
    }
    
    if(collision){
      carspeed = speedduringcollision >= 0 ? -.1 : .1;
      collision -= .1;
      if(collision <= 0) collision = 0;
    }
  }

  // Move the car and the camera
  // ...........................
  
  C.camera({x:carx,y:cary,rz:-carrz});
  C.move({n:"car",x:carx,y:cary,rz:carrz + 90});
  
},33);