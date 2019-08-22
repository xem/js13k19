// Initialization (called when switching modes)
// --------------

var init = (puzzle) => {
  
  // Reset the space data
  for(i=0;i<20;i++){
    space[i] = [];
    for(j=0;j<20;j++){
      space[i][j] = [];
    }
  }

  // Reset CSS3D base in the page's body
  b.innerHTML = "<textarea id=deb rows=6 cols=99></textarea><div id=viewport><div id=camera><div id=scene>";
  
  // Editor mode:
  if(mode == 1){
    
    b.className = "editor";
    
    // UI
    
    // menu
    b.innerHTML += `<div id=menu>Camera
    <div id=gridup>^^</div><div id=griddown>vv</div><div id=gridrl><<</div><div id=gridrr>>></div>Block<div id=blocku>^</div><div id=blockd>v</div><div id=blockl><</div><div id=blockr>></div><div id=blockrl><<</div><div id=blockrr>>></div>Actions<div id=actionp>Place here</div><div id=actionr>Remove</div><div id=actionc>Clear all</div>`;
    b.innerHTML += `<div id=parts>`;
    
    // inventory
    for(i = 0; i < 8; i ++){
      selected = 0;
      parts.innerHTML += `<div class="part ${i==0?"selected":""}" id=part${i} onclick=select(${i})><div class=visual id=visual${i}></div><div class=remaining id=qty${i}>`;
    }
    
    // Grid
    gridz = 0;
    C.plane({n:"grid",w:size*20,h:size*20,o:"top left"});
    //for(i = 0; i < 20; i++){
      //for(j = 0; j < 20; j++){
        //C.plane({g:"grid",n:`cell${i}-${j}`,w:20,h:20,x:20*i,y:20*j,css:"cell",o:"top left",b:'#def'});
      //}
    //}
    
    // Data (hardcoded for now)
    
    inventory = [ // [type, quantity, remaining]
      [1, 1, 1], // start
      [2, 1, 1], // end
      [0, 20, 20], // road 
    ];
    
    roads = [ // [x,y,z,type,angle]
      [8, 13, 0, 1, 0], // start
      [12, 6, 0, 2, 90], // end
    ];
    
    for(i of roads){
      
      space[i[0]][i[1]][i[2]] = {type: i[3], angle: i[4], u: 0, r: 0, d: 0, l: 0, barriers: {u: 0, r: 0, d: 0, l: 0}};

      // Block #0: basic road
      if(i[3] == 0){      
        C.plane({n:`road-${i[0]}-${i[1]}-${i[2]}`,x:size*i[0]+size/2,y:size*i[1]+size/2,z:.2,w:size*.8,h:size*.8,b:"#d90",o:"center",css:"block0 z0"});
      }
      
      // Block #1: start
      else if(i[3] == 1){
        
        // group
        C.group({n:`road-${i[0]}-${i[1]}-${i[2]}`,x:size*i[0]+size/2,y:size*i[1]+size/2,z:i[2]*size+.2,o:"center",css:"block1 z0",rz:i[4]});
        
        // road
        C.plane({g:`road-${i[0]}-${i[1]}-${i[2]}`,w:size*.8,h:size*.8,b:"#d90"});
        
        // Start flag
        C.plane({g:`road-${i[0]}-${i[1]}-${i[2]}`,w:size,h:size,z:size/2,rx:-85,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 95px, #000 95px),linear-gradient(#6c4 50px,transparent 50px)",o:"center",html:"start"});
        cursorx = i[0];
        cursory = i[1];
        gridz = i[2];
      }
      
      // block #2: end
      else if(i[3] == 2){
        
        // group
        C.group({n:`road-${i[0]}-${i[1]}-${i[2]}`,x:size*i[0]+size/2,y:size*i[1]+size/2,z:i[2]*size+.2,o:"center",css:"block1 z0",rz:i[4]});
        
        // road
        C.plane({g:`road-${i[0]}-${i[1]}-${i[2]}`,w:size*.8,h:size*.8,b:"#d90"});
        
        // Start flag
        C.plane({g:`road-${i[0]}-${i[1]}-${i[2]}`,w:size,h:size,z:size/2,rx:-85,b:"linear-gradient(90deg, #000 5px, transparent 5px, transparent 95px, #000 95px),linear-gradient(#d22 50px,transparent 50px)",o:"center",html:"end"});
      }
    }
    
    for(i in inventory){
      j = inventory[i];
      C.$(`qty${i}`).innerHTML = `${j[2]}/${j[1]}`;
      C.plane({g:`visual${i}`,w:20,h:20,b:"#d90",rx:45,rz:45});
    }
    
    //cz = -300;
    //setTimeout(()=>C.camera({rx:.1}),100);
    
    // Cursor
    //cursorx = cursory = 10;
    C.plane({n:"cursor",w:size*1.2,h:size*1.2,x:cursorx*size+size/2, y:cursory*size+size/2, z:gridz*size, b:"#9f8",o:"center"})
    //C.camera({x:cursorx*20+10,y:cursory*20+10,z:-300,rx:20});
    
    
    
    rerender = 1;
    
  }
  
  // Race mode:
  else if(mode == 2){
    
    b.className = "race";

    // Place the camera
    C.camera({x:cx,y:cy,z:cz,rx:crx});
    
    // Create the car
    C.group({n:"car",w:0,h:0,rz:90})

      // car body
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:4,d:2,h:.75,z:.4});
      C.cube({g:"car",b:"#a33",b2:"#922",b3:"#c44",w:2,d:2,h:.55,z:1.15});

      // wheel
      C.plane({g:"car",b:"#555",w:.8,h:.8,rx:90,x:1,y:1.1,z:.58,css:"circle"});
      C.plane({g:"car",b:"#555",w:.8,h:.8,rx:90,x:1,y:-1.1,z:.58,css:"circle"});
      C.plane({g:"car",b:"#555",w:.8,h:.8,rx:90,x:-1,y:1.1,z:.58,css:"circle"});
      C.plane({g:"car",b:"#555",w:.8,h:.8,rx:90,x:-1,y:-1.1,z:.58,css:"circle"});

      // wheel depth
      C.plane({g:"car",b:"#555",w:.3,h:.78,rx:90,ry:90,x:1,y:.95,z:.58});
      C.plane({g:"car",b:"#555",w:.3,h:.78,rx:90,ry:90,x:1,y:-.95,z:.58});
      C.plane({g:"car",b:"#555",w:.3,h:.78,rx:90,ry:90,x:-1,y:.95,z:.58});
      C.plane({g:"car",b:"#555",w:.3,h:.78,rx:90,ry:90,x:-1,y:-.95,z:.58});
      
    // Create the road (hardcoded for now)
    roads = [
      [10,16,0],
      [10,15,0],
      [10,14,0],
      [10,13,0],
      [9,13,0],
      [8,13,0],
      [8,12,0],
      [7,12,0],
      [7,11,0],
      [6,11,0],
      [6,10,0],
      [7,10,0],
      [8,10,0],
      [9,10,0],
      [10,10,0],
      [11,10,0],
      [11,9,0],
      [11,11,0],
      [12,10,0],
      [14,10,0],
      [15,10,0],
      [16,10,0],
      [16,11,0],
      [15,11,0],
      [15,12,0],
      [15,13,0],
      [15,14,0],
      [14,14,0],
      [13,14,0],
      [12,14,0],
      [11,14,0],
    ];
    
    for(i of roads){
      
      // Block #0: basic road
      space[i[0]][i[1]][i[2]] = {type: 0, u: 0, r: 0, d: 0, l: 0, barriers: {u: 0, r: 0, d: 0, l: 0}};
      
      C.plane({n:`road-${i[0]}-${i[1]}-${i[2]}`,x:size*i[0],y:size*i[1],z:.2,w:size,h:size,b:"#d90",o:"top left",css:"block0 z0"});
      //C.plane({n:`barrier1-${i[0]}-${i[1]}-${i[2]}`,x:20*i[0],y:20*i[1],z:.5,w:20,h:20,o:"top left",css:"barrier0-1 z0"});
      //C.plane({n:`barrier2-${i[0]}-${i[1]}-${i[2]}`,x:20*i[0],y:20*i[1],z:.6,w:20,h:20,o:"top left",css:"barrier0-2 z0"});
      //C.plane({n:`barrier3-${i[0]}-${i[1]}-${i[2]}`,x:20*i[0],y:20*i[1],z:.8,w:20,h:20,o:"top left",css:"barrier0-3 z0"});
    }
    
    // Road links (semi-automatic for now)
    roadlinks = [
      [[11,10,0],[11,11,0]],
      [[11,10,0],[12,10,0]],
      [[15,10,0],[15,11,0]],
      [[11,14,0],[10,14,0]]
    ];
    for(i = 1; i < roads.length - 1; i++){
      roadlinks.push([roads[i],roads[i+1]]);
    }
        
    // Draw links between road blocks
    links();
    
    // Add barriers on the sides of blocks who need them
    for(i of roadlinks){
      barriers(i[0]);
      barriers(i[1]);
    }
    
    // Round the road block that have 2 consecutibe links only
    turns();
    
    // Compute the equation of every road block
    equations();
  }
}

init();