// Blocks

// id, container, x, y, z, x angle, z angle, fixed
var draw_block = (n, c, x, y, z, rx, rz, f) => {
  
  var color = world ? "#999":"#d90";
  
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
    C.plane({g:name,w:size*.8,h:size*.8,b:color,o:"center",css:cl});
  }
  
  // 0: basic road / turn
  if(n == 0){
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: [x,y-1,z], r: [x+1,y,z], d: [x,y+1,z], l: [x-1,y,z]},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: 0,
        fall: `${z*sizeh}`,
        inbounds: ""
      };
    }
  }
  
  // 1: start
  else if(n == 1){
    C.plane({g:name,w:size*.8,h:sizeh,z:sizeh/2,rx:-88,b:"linear-gradient(90deg, #666 5px, transparent 5px, transparent 75px, #666 75px),linear-gradient(#6c4 22px,transparent 22px)",o:"center",html:"start"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: rz,
        fall: `${z*sizeh}`,
        inbounds: ""
      };
      
      start = [x,y,z];
      
      
      // Make the top side linkable
      if(rz == 0){
        space[x][y][z].linkable.u = [x,y-1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      else if(rz == 180){
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z];
      }
      
      
    }
  }
  
  // 2: end
  else if(n == 2){

    C.plane({g:name,w:size*.8,h:sizeh,z:sizeh/2,rx:-88,b:"linear-gradient(90deg, #666 5px, transparent 5px, transparent 75px, #666 75px),linear-gradient(#d22 25px,transparent 22px)",o:"center",html:"end"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: rz,
        fall: `${z*sizeh}`,
        inbounds: ""
      };
      
      // Make the bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.d = [x,y+1,z];
        space[x][y][z].linkable.u = [x,y-1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      else if(rz == 180){
        space[x][y][z].linkable.d = [x,y+1,z];
        space[x][y][z].linkable.u = [x,y-1,z];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
    }
  }
  
  // 3: checkpoint
  else if(n == 3){
    C.plane({g:name,w:size*.8,h:sizeh,z:sizeh/2,rx:-88,b:"linear-gradient(90deg, #666 5px, transparent 5px, transparent 75px, #666 75px),linear-gradient(#5ae 25px,transparent 22px)",o:"center"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: rz,
        fall: `${z*sizeh}`,
        inbounds: "",
        passed: 0
      };

      checkpoints++;
      
      // Make the top and bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.r = [x+1,y,z];
        space[x][y][z].linkable.l = [x-1,y,z];
      }
      else if(rz == 180){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z];
      }      
    }
  }
  
  // 4: jumper
  else if(n == 4){
    
    C.plane({g:name,w:size*.8,h:106,z:18,rx:-20,b:"#d00",o:"center"});
    C.plane({g:name,w:size*.8,h:size*.2,y:-10,rx:-90,z:sizeh*.2,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 0, r: 0, d: 0, l: 0},
        surrogates: 0,
        surrogate_of: 0,
        slope: 1,
        angle: rz,
        fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
        inbounds: ""
      };    
      
      // Make the bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.l = [x-1,y,z];
      }
      else if(rz == 180){
        space[x][y][z].linkable.u = [x,y-1,z];
      }
      else if(rz == 270){
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      
            
      //linkable: {u: [x,y-1,z], r: [x+1,y,z], d: [x,y+1,z], l: [x-1,y,z]},
    }

  }
    
  // 5: slope short
  else if(n == 5){
      
      C.plane({g:name,z:sizeh/2,w:size*.8,h:112,o:"center",b:color,rx:-26.5});
      C.plane({g:name,w:size*.8,h:44,y:-40,rx:-90,z:22,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      
      if(c == "scene"){
        space[x][y][z] = {
          fixed: f,
          free: 0,
          id: n,
          inventoryid: selected,
          linkable: {u: 0, r: 0, d: 0, l: 0},
          links: { u: 0, r: 0, d: 0, l: 0 },
          flat: { u: 1, r: 1, d: 1, l: 1},
          barriers: {u: 1, r: 1, d: 1, l: 1},
          surrogates: [[x, y, z+1]],
          surrogate_of: 0,
          slope: 1,
          angle: rz,
          fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
          inbounds: ""
        };

        //console.log(space[x][y][z]);
        
        // Make the front (higher) and bottom side linkable
        if(rz == 0){
          space[x][y][z].linkable.u = [x,y-1,z+1];
          space[x][y][z].linkable.d = [x,y+1,z];
        }
        else if(rz == 90){
          space[x][y][z].linkable.l = [x-1,y,z];
          space[x][y][z].linkable.r = [x+1,y,z+1];
        }
        else if(rz == 180){
          space[x][y][z].linkable.u = [x,y-1,z];
          space[x][y][z].linkable.d = [x,y+1,z+1];
        }
        else if(rz == 270){
          space[x][y][z].linkable.l = [x-1,y,z+1];
          space[x][y][z].linkable.r = [x+1,y,z];
        }
      
        // Block the cell above
        space[x][y][z+1] = {
          fixed: f,
          free: 0,
          id: n,
          inventoryid: selected,
          linkable: {u: 0, r: 0, d: 0, l: 0},
          links: { u: 0, r: 0, d: 0, l: 0 },
          flat: { u: 1, r: 1, d: 1, l: 1},
          barriers: {u: 1, r: 1, d: 1, l: 1},
          surrogates: 0,
          surrogate_of: [x, y, z],
          slope: 1,
          angle: rz,
          fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
          inbounds: ""
        };
      }
  }

  // 6: slope long
  else if(n == 6 || n == 7){
    
      C.plane({g:name,w:size*.8,h:207.5,y:-50,z:25,o:"center",b:color,rx:-14});
      
      //C.plane({g:name,y:-size,z:sizeh/4,w:size*.8,h:107,o:"center",b:"#color",rx:-26.5});
      
      //C.plane({g:name,w:size*.8,h:sizeh,y:-size-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      
      C.plane({g:name,w:size*.8,h:22,y:-40,rx:-90,z:11,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      
      if(c == "scene"){
      
        space[x][y][z] = {
          fixed: f,
          free: 0,
          id: n,
          inventoryid: selected,
          linkable: {u: 0, r: 0, d: 0, l: 0},
          links: { u: 0, r: 0, d: 0, l: 0 },
          flat: { u: 1, r: 1, d: 1, l: 1},
          barriers: {u: 1, r: 1, d: 1, l: 1},
          surrogates: [[x,y,z+1]],
          surrogate_of: 0,
          slope: 1,
          angle: rz,
          fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh}+(carx%size)/4` : rz == 180 ? `${z*sizeh}+(cary%size)/4` : `${z*sizeh}+(100-(carx%size))/4`,
          inbounds: ""
        };
        
        // Make the back side linkable, also create the surrogate with front side linkable
        var X=0,Y=0,Z=0;
        if(rz == 0){
          space[x][y][z].linkable.u = [x,y-2,z+1];
          space[x][y][z].linkable.d = [x,y+1,z];
          space[x][y][z].surrogates.push([X=x,Y=y-1,Z=z]);
        }
        else if(rz == 90){
          space[x][y][z].linkable.l = [x-1,y,z];
          space[x][y][z].linkable.r = [x+2,y,z+1];
          space[x][y][z].surrogates.push([X=x+1,Y=y,Z=z]);
        }
        else if(rz == 180){
          space[x][y][z].linkable.u = [x,y-1,z];
          space[x][y][z].linkable.d = [x,y+2,z+1];
          space[x][y][z].surrogates.push([X=x,Y=y+1,Z=z]);
        }
        else if(rz == 270){
          space[x][y][z].linkable.l = [x-2,y,z+1];
          space[x][y][z].linkable.r = [x+1,y,z];
          space[x][y][z].surrogates.push([X=x-1,Y=y,Z=z]);
        }
        
        space[x][y][z].surrogates.push([X,Y,Z+1]);
        
        //console.log(rz,X,Y,Z);
        //console.log(cursorx,cursory,gridz);
        //console.log(X,Y,Z);
        
        // Abort if one of the surrogates spots is not free
        if(space[X][Y][Z] || space[X][Y][Z+1]){
          //console.log("collision");
          C.$(name).remove();
          space[x][y][z] = 0;
          cursor.style.background = "#e668";
        }
        
        else {
      
          // surrogate 
          space[X][Y][Z] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x,y,z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh+25}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh+25}+(carx%size)/4` : rz == 180 ? `${z*sizeh+25}+(cary%size)/4` : `${z*sizeh+25}+(100-(carx%size))/4`,
            inbounds: ""
          };
          
          // Block the cells above
          space[x][y][z+1] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x, y, z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh}+(carx%size)/4` : rz == 180 ? `${z*sizeh}+(cary%size)/4` : `${z*sizeh}+(100-(carx%size))/4`,
            inbounds: ""
          };
          
          space[X][Y][Z+1] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x, y, z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh+25}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh+25}+(carx%size)/4` : rz == 180 ? `${z*sizeh+25}+(cary%size)/4` : `${z*sizeh+25}+(100-(carx%size))/4`,
            inbounds: ""
          };
        }
      }
  }
  
  // 7: slope long "down"
  /*else if(n == 7){

      C.plane({g:name,w:size*.8,h:103,z:7,o:"center",b:"#color",rx:-8});
      C.plane({g:name,y:-size,z:32,w:size*.8,h:105,o:"center",b:"#color",rx:-20});
      
      
      C.plane({g:name,w:size*.8,h:sizeh,y:-size-40,rx:-90,z:sizeh*.4,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      C.plane({g:name,w:size*.8,h:sizeh*.2,y:-40,rx:-90,z:sizeh*.1,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      
      if(c == "scene"){
        space[x][y][z] = {
          fixed: f,
          free: 0,
          id: n,
          inventoryid: selected,
          linkable: {u: 0, r: 0, d: 0, l: 0},
          links: { u: 0, r: 0, d: 0, l: 0 },
          flat: { u: 1, r: 1, d: 1, l: 1},
          barriers: {u: 1, r: 1, d: 1, l: 1},
          surrogates: [[x,y,z+1]],
          surrogate_of: 0,
          slope: 1,
          angle: rz,
          fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh}+(carx%size)/4` : rz == 180 ? `${z*sizeh}+(cary%size)/4` : `${z*sizeh}+(100-(carx%size))/4`,
          inbounds: ""
        };
        
        // Make the back side linkable, also create the surrogate with front side linkable
        var X=0,Y=0,Z=0;
        if(rz == 0){
          space[x][y][z].linkable.u = [x,y-2,z+1];
          space[x][y][z].linkable.d = [x,y+1,z];
          space[x][y][z].surrogates.push([X=x,Y=y-1,Z=z]);
        }
        else if(rz == 90){
          space[x][y][z].linkable.l = [x-1,y,z];
          space[x][y][z].linkable.r = [x+2,y,z+1];
          space[x][y][z].surrogates.push([X=x+1,Y=y,Z=z]);
        }
        else if(rz == 180){
          space[x][y][z].linkable.u = [x,y-1,z];
          space[x][y][z].linkable.d = [x,y+2,z+1];
          space[x][y][z].surrogates.push([X=x,Y=y+1,Z=z]);
        }
        else if(rz == 270){
          space[x][y][z].linkable.l = [x-2,y,z+1];
          space[x][y][z].linkable.r = [x+1,y,z];
          space[x][y][z].surrogates.push([X=x-1,Y=y,Z=z]);
        }
        space[x][y][z].surrogates.push([X,Y,Z+1]);
      
        // Abort if one of the surrogates spots is not free
        if(space[X][Y][Z] || space[X][Y][Z+1]){
          //console.log("collision");
          C.$(name).remove();
          space[x][y][z] = 0;
          if(window.cursor)cursor.style.background = "#e668";
        }
        
        else {
          
          // surrogate 
          space[X][Y][Z] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x, y, z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh+25}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh+25}+(carx%size)/4` : rz == 180 ? `${z*sizeh+25}+(cary%size)/4` : `${z*sizeh+25}+(100-(carx%size))/4`,
            inbounds: ""
          };
          
          // Block the cells above
          space[x][y][z+1] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x, y, z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh}+(carx%size)/4` : rz == 180 ? `${z*sizeh}+(cary%size)/4` : `${z*sizeh}+(100-(carx%size))/4`,
            inbounds: ""
          };
          
          space[X][Y][Z+1] = {
            fixed: 1,
            free: 0,
            id: n,
            inventoryid: selected,
            linkable: {u: 0, r: 0, d: 0, l: 0},
            links: { u: 0, r: 0, d: 0, l: 0 },
            flat: { u: 1, r: 1, d: 1, l: 1},
            barriers: {u: 0, r: 0, d: 0, l: 0},
            surrogates: 0,
            surrogate_of: [x, y, z],
            slope: 1,
            angle: rz,
            fall: rz == 0 ? `${z*sizeh+25}+(100-(cary%size))/4` : rz == 90 ? `${z*sizeh+25}+(carx%size)/4` : rz == 180 ? `${z*sizeh+25}+(cary%size)/4` : `${z*sizeh+25}+(100-(carx%size))/4`,
            inbounds: ""
          };
        }
      }

  }*/

  // 8: accelerator
  else if(n == 8){
    C.plane({g:name,w:size*.8,h:size,o:"center",css:"acc2"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogate: 0,
        slope: 0,
        angle: rz,
        fall: `${z*sizeh}`,
        inbounds: ""
      };    
      
      // Make the top and bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      else if(rz == 180){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
    }
  }
  
  // 9: accelerator slope down
  else if(n == 9){
      
    C.plane({g:name,w:size*.8,h:112,z:sizeh/2,o:"center",css:"acc",rx:-26.5});
    C.plane({g:name,w:size*.8,h:44,y:-40,rx:-90,z:22,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: [[x,y,z+1]],
        surrogate_of: 0,
        slope: 1,
        angle: rz,
        fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
        inbounds: ""
      };    
      
      // Make the front (higher) and bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.u = [x,y-1,z+1];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z+1];
      }
      else if(rz == 180){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z+1];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z+1];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      
      // Block the cell above
      space[x][y][z+1] = {
        fixed: 1,
        free: 0,
        id: n,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: [x, y, z],
        slope: 1,
        angle: rz,
        fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
        inbounds: ""
      };
    }
  }
  
  // 10: accelerator slope up
  else if(n == 10){
    C.plane({g:name,w:size*.8,h:112,z:sizeh/2,o:"center",css:"acc2",rx:-26.5});
    C.plane({g:name,w:size*.8,h:44,y:-40,rx:-90,z:22,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: [[x,y,z+1]],
        surrogate_of: 0,
        slope: 1,
        angle: rz,
        fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
        inbounds: ""
      };    
      
      // Make the front (higher) and bottom side linkable
      if(rz == 0){
        space[x][y][z].linkable.u = [x,y-1,z+1];
        space[x][y][z].linkable.d = [x,y+1,z];
      }
      else if(rz == 90){
        space[x][y][z].linkable.l = [x-1,y,z];
        space[x][y][z].linkable.r = [x+1,y,z+1];
      }
      else if(rz == 180){
        space[x][y][z].linkable.u = [x,y-1,z];
        space[x][y][z].linkable.d = [x,y+1,z+1];
      }
      else if(rz == 270){
        space[x][y][z].linkable.l = [x-1,y,z+1];
        space[x][y][z].linkable.r = [x+1,y,z];
      }
      
      // Block the cell above
      space[x][y][z+1] = {
        fixed: 1,
        free: 0,
        id: n,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: 0,
        surrogate_of: [x, y, z],
        slope: 1,
        angle: rz,
        fall: rz == 0 ? `${z*sizeh}+(100-(cary%size))/2` : rz == 90 ? `${z*sizeh}+(carx%size)/2` : rz == 180 ? `${z*sizeh}+(cary%size)/2` : `${z*sizeh}+(100-(carx%size))/2`,
        inbounds: ""
      };
    }
  }
  
  /*// 11: road with hole
  else if(n == 11){
    C.plane({g:name,w:size*.8,h:size,o:"center",css:"hole"});
    
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 0, r: 0, d: 0, l: 0},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: 0,
        fall: "",
        inbounds: ""
      };
    }
  }*/
  
  // 12: tree
  else if(n == 12){
    if(c=="scene" || c == "vcursor"){
      C.sprite({g:name,w:size,h:size,y:0,z:0,rx:-90,html:world?"🌵":"🌲",css:"tree",o:"bottom"});
    }
    else {
      C.plane({g:name,w:size,h:size,y:0,z:-20,rx:-80,html:world?"🌵":"🌲",css:"tree",o:"bottom"});
    }
    if(c == "scene"){
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 0, r: 0, d: 0, l: 0},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: 0,
        fall: "",
        inbounds: `dist2([carx,cary],[${x*size+size/2},${y*size+size/2}])>20**2`
      };
      
      space[x][y][z+1] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 0, r: 0, d: 0, l: 0},
        surrogates: 0,
        surrogate_of: 0,
        slope: 0,
        angle: 0,
        fall: "",
        inbounds: `dist2([carx,cary],[${x*size+size/2},${y*size+size/2}])>20**2`
      };
        
    }
  }
  
  // 13: rock
  /*else if(n == 13){
    if(c == "scene"){
      
      C.cube({g:name,w:100,h:sizeh*z+sizeh,z:-sizeh*z-1,d:100,b:"#aaa",b2:"#777",b3:"#999"});
      
      space[x][y][z] = {
        fixed: f,
        free: 0,
        id: n,
        inventoryid: selected,
        linkable: {u: 0, r: 0, d: 0, l: 0},
        links: { u: 0, r: 0, d: 0, l: 0 },
        flat: { u: 1, r: 1, d: 1, l: 1},
        barriers: {u: 1, r: 1, d: 1, l: 1},
        surrogates: [],
        surrogate_of: 0,
        slope: 0,
        angle: 0,
        fall: "",
        inbounds: ""
      };
        
      for(var Z = 0; Z < z; Z++){
        space[x][y][Z] = {
          fixed: f,
          free: 0,
          id: n,
          inventoryid: selected,
          linkable: {u: 0, r: 0, d: 0, l: 0},
          links: { u: 0, r: 0, d: 0, l: 0 },
          flat: { u: 1, r: 1, d: 1, l: 1},
          barriers: {u: 1, r: 1, d: 1, l: 1},
          surrogates: 0,
          surrogate_of: [x,y,z],
          slope: 0,
          angle: 0,
          fall: "",
          inbounds: ""
        };
        
        space[x][y][z].surrogates.push([x,y,Z]);
      }
    }
    else {
      C.cube({g:name,w:100,h:sizeh,d:100,b:"#aaa",b2:"#777",b3:"#999"});
    }
  }*/
  
  if(z > 0){
    //for(var i = 0; i < z; i++){
      //console.log(i);
      
      // poles (except on jumpers and basic roads)
      if(n != 4 && n != 0 && n<11){
        
        C.plane({g:name,w:size*.8,h:sizeh*z,y:-40,z:sizeh*(-z/2),rx:-90,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
        C.plane({g:name,w:size*.8,h:sizeh*z,y:40,z:sizeh*(-z/2),rx:-90,b:"linear-gradient(90deg,#666 5px,transparent 5px, transparent 75px, #666 75px)",o:"center"});
      }
    //}
  }
}
