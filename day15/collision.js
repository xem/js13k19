var testcollision = (f,fcell,fcellinfo) => {

  // Get cell info
  [x,y,z] = fcell;
  try{fcellinfo = space[x][y][z];}catch(e){}

  // No cell info (i.e. no cell here): oob
  if(!fcellinfo){
    //log("noinfo");
    oob = 1;
  }

  // Cell has no links (ie. no barriers): inbounds
  else if(fcellinfo.links.u + fcellinfo.links.r + fcellinfo.links.d + fcellinfo.links.l == 0){
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
}
