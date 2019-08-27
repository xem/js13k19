// Blocks

// id, container, x, y, z, x angle, z angle, fixed
var draw_block = (n, c, x, y, z, rx, rz, f) => {
  
  //console.log(c == "scene");
  
  // If the block is placed on the scene: name based on its position.
  // If it's placed in the inventory: name = v + container name. 
  var name = (c == "scene") ? `road-${x}-${y}-${z}` : `v${c}`;
  
  // classname
  var cl = `block${n}`;
  
  // Group containing the block
  C.group({g:c,n:name,x:size*x+size/2,y:size*y+size/2,z:sizeh*z+1,o:"center",css:cl,rx:rx,rz:rz});

  // 0-3: basic road / turn / flafs
  if(n < 4){
    C.plane({g:name,w:size*.8,h:size*.8,b:"#d90",o:"center",css:cl});
  }
  
  // 0: basic road / turn
  if(n == 0){
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        linkable: {u: 1, r: 1, d: 1, l: 1},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogate: 0,
        angle: 0,
        equation: "false",
      };
    }
  }
  
  // 1: start
  else if(n == 1){
    C.plane({g:name,w:size*.8,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 75px, #000 75px),linear-gradient(#6c4 50px,transparent 50px)",o:"center",html:"start"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogate: 0,
        angle: rz,
        equation: "false",
      };    
      
      // Make the top side linkable
      if(rz == 0){
        space[x][y][z].linkable.u  = 1;
      }
      else if(rz == 90){
        space[x][y][z].linkable.r  = 1;
      }
      else if(rz == 180){
        space[x][y][z].linkable.d  = 1;
      }
      else if(rz == 270){
        space[x][y][z].linkable.l  = 1;
      }
    }
  }
  
  // 2: end
  else if(n == 2){

    C.plane({g:name,w:size*.8,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 75px, #000 75px),linear-gradient(#d22 50px,transparent 50px)",o:"center",html:"end"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogate: 0,
        angle: rz,
        equation: "false",
      };    
      
      // Make the bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.d  = 1;
      }
      else if(rz == 90){
        space[x][y][z].linkable.l  = 1;
      }
      else if(rz == 180){
        space[x][y][z].linkable.u  = 1;
      }
      else if(rz == 270){
        space[x][y][z].linkable.r  = 1;
      }
    }
  }
  
  // 3: checkpoint
  else if(n == 3){
    C.plane({g:name,w:size*.8,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 75px, #000 75px),linear-gradient(#5ae 50px,transparent 50px)",o:"center"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogate: 0,
        angle: rz,
        equation: "false",
      };    
      
      // Make the top and bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.u  = 1;
        space[x][y][z].linkable.d  = 1;
      }
      else if(rz == 90){
        space[x][y][z].linkable.r  = 1;
        space[x][y][z].linkable.l  = 1;
      }
      else if(rz == 180){
        space[x][y][z].linkable.u  = 1;
        space[x][y][z].linkable.d  = 1;
      }
      else if(rz == 270){
        space[x][y][z].linkable.l  = 1;
        space[x][y][z].linkable.r  = 1;
      }
    }
  }
  
  // 4: jumper
  else if(n == 4){
    C.plane({g:name,w:size*.8,h:size*.7,y:.2*size,z:sizeh/4,rx:-20,b:"#d00",o:"center"});
    C.plane({g:name,w:size*.8,h:size*.2,y:-10,rx:-90,z:sizeh*.2,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
    
  // 5: slope short
  else if(n == 5){
    C.plane({g:name,z:sizeh/2,w:size*.8,h:size*1.2,o:"center",b:"#d90",rx:-23});
    C.plane({g:name,w:size*.8,h:sizeh,y:-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }

  // 6: slope long "up"
  else if(n == 6){
    C.plane({g:name,w:size*.8,h:size*1.05,z:sizeh*.36,o:"center",b:"#d90",rx:-20});
    C.plane({g:name,y:-size,z:sizeh*.84,w:size*.8,h:size*1.05,o:"center",b:"#d90",rx:-5});
    C.plane({g:name,w:size*.8,h:sizeh,y:-size-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
    C.plane({g:name,w:size*.8,h:sizeh*.6,y:-40,rx:-90,z:sizeh*.3,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
  
  // 7: slope long "down"
  else if(n == 7){
    C.plane({g:name,w:size*.8,h:size*1.05,z:sizeh*.2,o:"center",b:"#d90",rx:-5});
    C.plane({g:name,y:-size,z:sizeh*.66,w:size*.8,h:size*1.05,o:"center",b:"#d90",rx:-20});
    C.plane({g:name,w:size*.8,h:sizeh,y:-size-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
    C.plane({g:name,w:size*.8,h:sizeh*.2,y:-40,rx:-90,z:sizeh*.1,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }

  // 8: accelerator
  else if(n == 8){
    C.plane({g:name,z:1,w:size*.8,h:size,o:"center",css:"acc",rz:180});
  }
  
  // 9: accelerator slope down
  else if(n == 9){
    C.plane({g:name,w:size*.8,h:size*1.2,z:sizeh/2,o:"center",css:"acc",rx:-23});
    C.plane({g:name,w:size*.8,h:sizeh,y:-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
  
  if(z > 0){
    //for(var i = 0; i < z; i++){
      console.log(i);
      
      // poles (except on jumpers and rounded roads)
      if(n != 4 && space[x][y][z].flat.u + space[x][y][z].flat.r + space[x][y][z].flat.d + space[x][y][z].flat.l == 4){
        
        C.plane({g:name,w:size*.8,h:sizeh*z,y:-40,z:sizeh*(-z/2),rx:-90,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
        C.plane({g:name,w:size*.8,h:sizeh*z,y:40,z:sizeh*(-z/2),rx:-90,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
      }
    //}
  }
}
