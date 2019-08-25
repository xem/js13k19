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
    b.innerHTML += `<div id=menu>Camera<br>
    <div id=gridup>⇑</div> <div id=griddown>⇓</div> <div id=gridrl>↶</div> <div id=gridrr>↷</div><br>⎯<br>Block<br><div id=blockrl>↶</div> <div id=blockrr>↷</div><br><br><p>Add: <b>space+wasd</b> Remove: <b>Del</b><br>Play: <b>Enter</b></p>⎯<br><div id=blockc style=width:120px>Clear all</div>`;
    b.innerHTML += `<div id=parts>`;
    
    // inventory
    for(i = 0; i < 10; i ++){
      selected = 0;
      parts.innerHTML += `<div class="part ${i==0?"selected":""}" id=part${i} onclick=select(${i})><div class=visual id=visual${i}></div><div class=remaining id=qty${i}>`;
    }
    
    // Grid
    gridz = 0;
    C.plane({n:"grid",w:size*20,h:size*20,o:"top left"});
    
    // Roads
    roads = [ // [x,y,z,type,angle,fixed]
      [5, 5, 0, 1, 0, 1], // start
      [7, 6, 0, 0, 0, 1], // road
      [9, 5, 0, 2, 0, 1], // end
      [11, 6, 0, 3, 0, 1], // checkpoint
      [13, 5, 0, 4, 0, 1], // jumper
      [4, 8, 0, 5, 90, 1], // slope
      [7, 9, 0, 6, 90, 1], // slope up
      [9, 8, 0, 7, 90, 1], // slope down
      [11, 9, 0, 8, 0, 1], // accelerator
      [13, 8, 0, 9, 90, 1], // accelerator down
    ];
    
    for(i of roads){
      if(i){
        space[i[0]][i[1]][i[2]] = {fixed: 1, type: i[3], angle: i[4], u: 0, r: 0, d: 0, l: 0, barriers: {u: 0, r: 0, d: 0, l: 0}};

        // Draw current road block
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4]);
        
        // Place cursor on start flag
        if(i[3] == 1){ 
          cursorx = i[0];
          cursory = i[1];
          gridz = i[2];
        }
      }
    }
    
    // Road links
    roadlinks = [];
    
    // Inventory
    inventory = [ // [type, quantity, remaining]
      [1, 1, 1], // start
      [2, 1, 1], // end
      [0, 20, 20], // road 
      [3, 20, 20], // checkpoint 
      [4, 20, 20], // jumper 
      [5, 20, 20], // slope short 
      [6, 20, 20], // slope long "up" 
      [7, 20, 20], // slope long "down" 
      [8, 20, 20], // accelerator 
      [9, 20, 20], // accelerator slope down 
    ];
    
    for(i in inventory){
      j = inventory[i];
      C.$(`qty${i}`).innerHTML = `${j[2]}/${j[1]}`;
      //C.plane({g:`visual${i}`,w:20,h:20,b:"#d90",rx:45,rz:45});
      draw_block(j[0],`visual${i}`,((j[0]==6||j[0]==7) ? -.7 : -.5),((j[0]==6||j[0]==7) ? -.2 : -.5),-25,45,((j[0]==5||j[0]==9) ? 210 : 30));
    }
    
    //cz = -300;
    //setTimeout(()=>C.camera({rx:.1}),100);
    
    // Cursor
    //cursorx = cursory = 10;
    C.group({n:"cursor",w:size*1.2,h:size*1.2,x:cursorx*size+size/2, y:cursory*size+size/2, z:gridz*sizeh,o:"center"})
    //C.camera({x:cursorx*20+10,y:cursory*20+10,z:-300,rx:20});
    
    
    select(0);
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
      if(roads[i]){
        roadlinks.push([roads[i],roads[i+1]]);
      }
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