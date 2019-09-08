var testcollision = () => {
  
  
  
  //collision = 0;
  var x,y,z,cellinfo,ev;
  
  // Get cell info
  [x,y,z] = [~~(carx/size),~~(cary/size),~~(carz/sizeh)];
  try{cellinfo = space[x][y][z];}catch(e){}
  //console.log(cellinfo, carz);
  //console.log(cellinfo.inbounds);
  
  

  // No cell info (i.e. no cell here): oob
  if(!cellinfo){
    //log("noinfo");
    oob = 1;
    
    
    // Apply gravity and fall on the ground
    if(carz > 0){
      air = 1;
      if(vspeed += .01);
      carz -= vspeed;
      if(carz < 0){
        carz = 0;
        vspeed = 0;
        air = 0;
      }
      //console.log(1)
    }
  }
  
  // Test collision
  else {
    
    // Fall on the road
    if(air){
      
      
      // Apply gravity and fall on the ground or the current block
      ev = +(eval(cellinfo.fall));
      
      console.log(carz, cellinfo.fall, ev);
      if(carz > ev){
        air = 1;
        if(vspeed += .01);
        carz -= vspeed;
        if(carz < ev){
          carz = ev;
          vspeed = 0;
          air = 0;
        }
        if(carz < 0){
          carz = 0;
          vspeed = 0;
          air = 0;
        }
        //console.log(1)
      }
    }
    
    // Drive on the road
    else {
      
      // Drive on slopes
      ev = +(eval(cellinfo.fall));
      carz = ev;
    
      log(JSON.stringify(cellinfo));
      //log(cellinfo.barriers.u, cellinfo.flat.u, (cary%size))
      
      // Barriers, only if block is on the ground
      // up
      if(carz == 0 && cellinfo.barriers.u && cellinfo.flat.u && (cary%size) < 20){
        //log("u");
        collision = 1;
      }
        
      // right
      else if(carz == 0 && cellinfo.barriers.r && cellinfo.flat.r && (carx%size) > 80){
        //log("r");
        collision = 1;
        speedduringcollision = carspeed;
      }
        
      // down
      else if(carz == 0 && cellinfo.barriers.d && cellinfo.flat.d && (cary%size) > 80){
        //log("d");
        collision = 1;
        speedduringcollision = carspeed;
      }
        // left
      else if(carz == 0 && cellinfo.barriers.l && cellinfo.flat.l && (carx%size) < 20){
        //log("l");
        collision = 1;
        speedduringcollision = carspeed;
      }

      // Equation
      
      //log(JSON.stringify(cellinfo));
      else if(cellinfo.inbounds && cellinfo.inbounds != "true"){
        ev = eval(cellinfo.inbounds);
        if((oob && ev) || (!oob && !ev)){
          collision = 1;
          speedduringcollision = carspeed;
        }
      }
      
      // oob to not-oob
      else {
        oob = 0;
      }
    }
  }
};

  
  
  
  
  
  
  
  
  
  
  
  
  

  /*
  else if(fcellinfo.id == 0){
    
    if(!fcellinfo.links.u && !fcellinfo.links.r && !fcellinfo.links.d && !fcellinfo.links.l){
      //log("nolink");
      oob = 0;
    }

    // 1 link or more: it depends
    else {
      
      // If there's a non-square equation: assume inbounds
      // (i.e inbounds for now, the next tests will tell if we stay inbounds)
      if((fcellinfo.equation != "false" && !oob) || (fcellinfo.equation == "false" && oob)){
        //log("noeq");
        oob = 0;
      }
      
      // Check every flat (unrounded) barrier:
      
      // up
      if(fcellinfo.barriers.u && fcellinfo.flat.u && (f[1]%size) < size*.2){
        //log("u");
        collision = 1;
      }
      
      // right
      else if(fcellinfo.barriers.r && fcellinfo.flat.r && (f[0]%size) > size*.8){
        //log("r");
        collision = 1;
        speedduringcollision = carspeed;
      }
      
      // down
      else if(fcellinfo.barriers.d && fcellinfo.flat.d && (f[1]%size) > size*.8){
        //log("d");
        collision = 1;
        speedduringcollision = carspeed;
      }
      // left
      else if(fcellinfo.barriers.l && fcellinfo.flat.l && (f[0]%size) < size*.2){
        //log("l");
        collision = 1;
        speedduringcollision = carspeed;
      }
      
      // Then use the oob equation
      else if(fcellinfo.equation != "false" && !oob){
        //log("inbounds & eq");
        [x,y,z] = f;
        ev = eval(fcellinfo.equation);
        if(ev == 1){
          collision = 1;
          speedduringcollision = carspeed;
          //oob = 0;
        }
      }
      else if(fcellinfo.equation != "false" && oob){
        //log("oob & eq");
        [x,y,z] = f;
        ev = eval(fcellinfo.equation);
        if(ev == 0){
          collision = 1;
          speedduringcollision = carspeed;
          //oob = 1;
        }
      }
    }
  }*/
