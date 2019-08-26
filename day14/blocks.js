// Blocks

// id, container, x, y, z, x angle, z angle
var draw_block = (n, c, x, y, z, rx, rz) => {
  
  //console.log(c == "scene");
  
  // If the block is placed on the scene: name based on its position.
  // If it's placed in the inventory: name = v + container name. 
  var name = (c == "scene") ? `road-${x}-${y}-${z}` : `v${c}`;
  
  // classname
  var cl = `block${n}`;
  
  // Group containing the block
  C.group({g:c,n:name,x:size*x+size/2,y:size*y+size/2,z:sizeh*z+1,o:"center",css:cl,rx:rx,rz:rz});

  // 0-3: basic road / turn
  if(n < 4){
    C.plane({g:name,w:size*.8,h:size*.8,b:"#d90",o:"center",css:cl});
  }
  
  // 1: start
  if(n == 1){
    C.plane({g:name,w:size,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 95px, #000 95px),linear-gradient(#6c4 50px,transparent 50px)",o:"center",html:"start"});
  }
  
  // 2: end
  else if(n == 2){

    C.plane({g:name,w:size,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 95px, #000 95px),linear-gradient(#d22 50px,transparent 50px)",o:"center",html:"end"});
  }
  
  // 3: checkpoint
  else if(n == 3){
    C.plane({g:name,w:size,h:size,z:sizeh,rx:-88,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 95px, #000 95px),linear-gradient(#5ae 50px,transparent 50px)",o:"center"});
  }
  
  // 4: jumper
  else if(n == 4){
    C.plane({g:name,w:size*.8,h:size*.7,y:.2*size,z:sizeh/4,rx:-20,b:"#d00",o:"center"});
    C.plane({g:name,w:size*.8,h:size*.2,y:-10,rx:-90,z:sizeh*.2,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
    
  // 5: slope short
  else if(n == 5){
    C.plane({g:name,z:sizeh/2,w:size*.8,h:size*1.2,o:"center",b:"#d90",rx:-23});
    C.plane({g:name,w:size*.8,h:sizeh,y:-50,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }

  // 6: slope long "up"
  else if(n == 6){
    C.plane({g:name,w:size*.8,h:size*1.05,z:sizeh*.36,o:"center",b:"#d90",rx:-20});
    C.plane({g:name,y:-size,z:sizeh*.84,w:size*.8,h:size*1.05,o:"center",b:"#d90",rx:-5});
    C.plane({g:name,w:size*.8,h:sizeh,y:-size-50,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
  
  // 7: slope long "down"
  else if(n == 7){
    C.plane({g:name,w:size*.8,h:size*1.05,z:sizeh*.2,o:"center",b:"#d90",rx:-5});
    C.plane({g:name,y:-size,z:sizeh*.66,w:size*.8,h:size*1.05,o:"center",b:"#d90",rx:-20});
    C.plane({g:name,w:size*.8,h:sizeh,y:-size-50,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }

  // 8: accelerator
  else if(n == 8){
    C.plane({g:name,z:1,w:size*.8,h:size,o:"center",css:"acc",rz:180});
  }
  
  // 9: accelerator slope down
  else if(n == 9){
    C.plane({g:name,w:size*.8,h:size*1.2,z:sizeh/2,o:"center",css:"acc",rx:-23});
    C.plane({g:name,w:size*.8,h:sizeh,y:-50,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
  }
  
  if(z > 0){
    for(var i = 0; i < z; i++){
      console.log(i);
      C.plane({g:name,w:size*.8,h:sizeh,y:-40,z:sizeh*(-z+i) + sizeh/2,rx:-90,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
      C.plane({g:name,w:size*.8,h:sizeh,y:40,z:sizeh*(-z+i) + sizeh/2,rx:-90,b:"linear-gradient(90deg,#000 5px,transparent 5px, transparent 75px, #000 75px)",o:"center"});
    }
  }
}
