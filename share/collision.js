var testcollision = () => {
  
  
  
  
  //collision = 0;
  var x,y,z,cellinfo,ev;
  
  // Get cell info
  [x,y,z] = [~~(carx/size),~~(cary/size),~~(carz/sizeh)];
  try{cellinfo = space[x][y][z];}catch(e){}
  //console.log(cellinfo, carz);
  //console.log(cellinfo.inbounds);
  
  onice = 0;
  
  
  //console.log(0, cellinfo);

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
    
    // Ice
    if(track.ice){
      for(i of track.ice){
        if(carx >= i[0]*size && carx <= (i[0]*size + i[2]*size) && cary >= i[1]*size && cary <= (i[1]*size + i[3]*size)){
          onice = 1;
          //console.log("onice")
        }
      }
    }
  }
  
  // Test collision
  else {
    
    // Fall on the road
    if(air){
      
      //console.log(cellinfo.fall
      // Apply gravity and fall on the ground or the current block
      ev = +(eval(cellinfo.fall));
      
      //console.log(carz, cellinfo.fall, ev);
      if(carz > ev){
        air = 1;
        if(vspeed += .01);
        carz -= vspeed;
        if(carz < ev){
          carz = ev;
          vspeed = 0;
          air = 0;
          oob = 0;
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
    
      //log(JSON.stringify(cellinfo));
      //log(cellinfo.barriers.u, cellinfo.flat.u, (cary%size))
      
      // Barriers, only if block is on the ground
      // up
      if(carz < 10 && cellinfo.barriers.u && cellinfo.flat.u && (cary%size) < 20){
        //log("u");
        collision = 1;
        //console.log(1);
        //console.log(cellinfo);
        speedduringcollision = carspeed;
      }
        
      // right
      else if(carz < 10 && cellinfo.barriers.r && cellinfo.flat.r && (carx%size) > 80){
        //log("r");
        collision = 1;
        //console.log(2);
        speedduringcollision = carspeed;
      }
        
      // down
      else if(carz < 10 && cellinfo.barriers.d && cellinfo.flat.d && (cary%size) > 80){
        //log("d");
        collision = 1;
        //console.log(3);
        speedduringcollision = carspeed;
      }
        // left
      else if(carz < 10 && cellinfo.barriers.l && cellinfo.flat.l && (carx%size) < 20){
        //log("l");
        collision = 1;
        //console.log(4);
        speedduringcollision = carspeed;
      }
      // oob to not-oob
      else {
        oob = 0;
      }

      // Checkpoint
      if(cellinfo.id == 3){
        if(cellinfo.passed == 0){
          cellinfo.passed = 1;
          checkpoints--;
          //console.log(checkpoints);
        }
      }
      
      // End
      if(cellinfo.id == 2){
        if(
          (cellinfo.angle == 0 && (cary%size)<50)
          ||(cellinfo.angle == 90 && (carx%size)>50)
          ||(cellinfo.angle == 180 && (cary%size)>50)
          ||(cellinfo.angle == 270 && (carx%size)<50)
        ){
          if(checkpoints == 0){
            //console.log("end");
            mode = 3;
            init(track);
            //play(musics.menu[0],musics.menu[0],7100,7100)
          }
        }
      }
      
      // Accelerator
      if(cellinfo.id == 8 || cellinfo.id == 10){
        //console.log(cellinfo.angle, carspeed, carrz);
        
        // acc up
        if(cellinfo.angle == 0){

          // car in the same direction as the road: accelerate
          if(
            carrz > 270 || carrz < 90
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        
        // acc right
        else if(cellinfo.angle == 90){

          // car in the same direction as the road: accelerate
          if(
            carrz > 0 && carrz < 180
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        // acc down
        else if(cellinfo.angle == 180){

          // car in the same direction as the road: accelerate
          if(
            carrz > 90 && carrz < 270
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        // acc up
        else if(cellinfo.angle == 270){

          // car in the same direction as the road: accelerate
          if(
            carrz > 180 && carrz < 360
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }

      }
      
      else if(cellinfo.id == 9){
        //console.log(cellinfo.angle, carspeed, carrz);
        
        // acc up
        if(cellinfo.angle == 90){

          // car in the same direction as the road: accelerate
          if(
            carrz > 270 || carrz < 90
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        
        // acc right
        else if(cellinfo.angle == 270){

          // car in the same direction as the road: accelerate
          if(
            carrz > 0 && carrz < 180
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        // acc down
        else if(cellinfo.angle == 0){

          // car in the same direction as the road: accelerate
          if(
            carrz > 90 && carrz < 270
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }
        
        // acc up
        else if(cellinfo.angle == 90){

          // car in the same direction as the road: accelerate
          if(
            carrz > 180 && carrz < 360
          ){
            carspeed += .01;
            acc = 1;
          }

          // else, decelerate
          else {
            carspeed -= .01;
            acc = 1;
          }
        }

      }
      
      else {
         acc = 0;
      }
      
      
      // Inbounds equation (curves, trees)
      //console.log(cellinfo.inbounds, carz);
      if(cellinfo.inbounds && carz == 0){
        ev = eval(cellinfo.inbounds);
        //console.log(cellinfo.inbounds, ev);
        if((oob && ev) || (!oob && !ev)){
          collision = 1;
          //console.log(5);
          speedduringcollision = carspeed;
        }
      }
      
      // Drive on slopes
      ev = +(eval(cellinfo.fall));
      //console.log(cellinfo.fall, cary, ev);
      if(carz >= ev - (z == 0 ? 5 : 20)){
        if(ev > 0 && carz > 0){
          vspeed = carz - (ev + 2);
        }
        if(ev > 0){
          carz = ev+2;
        }
        else {
          carz = 0;
        }
      }
      else if(carz == 0 && ev < 15){
        collision = 1;
        //console.log(6);
        speedduringcollision = carspeed;
      }
      else {
        oob = 1;
      }
    }
  }
};

  
  
var justslopes = () => {
  
  
  
  //collision = 0;
  var x,y,z,cellinfo,ev;
  
  // Get cell info
  [x,y,z] = [~~(carx/size),~~(cary/size),~~(carz/sizeh)];
  try{cellinfo = space[x][y][z];}catch(e){}
  //console.log(cellinfo, carz);
  //console.log(cellinfo.inbounds);
  
  if(cellinfo){    
    // Drive on slopes
    ev = +(eval(cellinfo.fall));
    if(carz >= ev - (z == 0 ? 5 : 20)){
      if(carz > 0 && ev > 0){
        carz = ev+2;
      }
    }
    else {
      oob = 1;
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
