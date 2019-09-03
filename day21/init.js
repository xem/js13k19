// Initialization (called when switching modes)
// --------------

var init = (track = {}) => {
  
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
    <div id=gridup>⇑</div> <div id=griddown>⇓</div> <div id=gridrl>↶</div> <div id=gridrr>↷</div><br>⎯<br>Block<br><div id=blockrl>↶</div> <div id=blockrr>↷</div><br><br><p>Add: <b>space+wasd</b> Remove: <b>Del</b><br>Play: <b>Enter</b></p>⎯<br><div id=blockc style=width:120px>Clear all</div><div id=exp>Export</div> <div id=load>Load</div>`;
    b.innerHTML += `<div id=parts>`;
    
    // inventory
    for(i = 0; i < 12; i ++){
      selected = 0;
      parts.innerHTML += `<div class="part ${i==0?"selected":""}" id=part${i} onclick=select(${i})><div class=visual id=visual${i}></div><div class=remaining id=qty${i}>`;
    }
    
    // Grid
    gridz = 0;
    C.plane({n:"grid",w:size*20,h:size*20,o:"top left"});
    
    // Roads
    /*roads = [ // [x,y,z,type,angle,fixed]
      [5, 10, 0, 1, 0, 1], // start
      [9, 10, 0, 2, 90, 1], // end
      [3, 7, 0, 3, 0, 1], // checkpoint
      [5, 7, 0, 4, 0, 1], // jumper
      [7, 7, 0, 8, 0, 1], // accelerator
      [9, 7, 0, 5, 0, 1], // slope
      [11, 7, 0, 6, 0, 1], // slope up
      [13, 7, 0, 7, 0, 1], // slope down
      [15, 7, 0, 9, 0, 1], // accelerator down
      //[10, 10, 0, 0, 0, 1], // road
    ];*/
    
    roads = track.roads || [];
    
    for(i of roads){
      if(i){
        /*space[i[0]][i[1]][i[2]] = {
          fixed: 1,
          free: 0,
          id: i[3],
          linkable: {},
          links: {},
          flat: {u: 1, r: 1, d: 1, l: 1 },
          barriers: {u: 0, r: 0, d: 0, l: 0},
          surrogate: 0,
          angle: i[4], u: 0, r: 0, d: 0, l: 0,
          equation: "false"
        };*/

        // Draw current road block
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4],1);
        
        // Place cursor on start flag
        if(i[3] == 1){ 
          cursorx = i[0];
          cursory = i[1];
          gridz = i[2];
        }
      }
    }
    
    // Road links
    roadlinks = track.roadlinks || [];
    
    /*[
      //[[9,10,0],[10,10,0]],
      //[[10,10,0],[11,10,0]],
    ];*/
    
    // Inventory
    inventory = [ // [id, quantity, remaining]
      [0, 60, 60], // road 
      [1, 1, 1], // start
      [2, 1, 1], // end
      [3, 20, 20], // checkpoint 
      [4, 20, 20], // jumper 
      [5, 20, 20], // slope short 
      [6, 20, 20], // slope long "up" 
      [7, 20, 20], // slope long "down" 
      [8, 20, 20], // accelerator 
      [9, 20, 20], // accelerator slope down
      [10, 20, 20], // trees
      [11, 20, 20], // rocks
    ];
    
    for(i in inventory){
      j = inventory[i];
      C.$(`qty${i}`).innerHTML = `${j[2]}/${j[1]}`;
      //C.plane({g:`visual${i}`,w:20,h:20,b:"#d90",rx:45,rz:45});
      draw_block(j[0],`visual${i}`,((j[0]==6||j[0]==7) ? -.7 : -.5),((j[0]==6||j[0]==7) ? -.2 : -.4),((j[0]==6||j[0]==7) ? -25 : -15),50,30);
    }
    
    // Ice
    ice = [
      //[5,5,8,8], // x,y,w,h
      //[11,11,5,6]
    ];
    
    for(i of ice){
      C.plane({x:i[0]*size,y:i[1]*size,w:i[2]*size,h:i[3]*size,css:"ice",o:"top left",bp: (-i[0]*size) + C.unit +  " " + (-i[1] * size) + C.unit});
    }
    
    //cz = -300;
    //setTimeout(()=>C.camera({rx:.1}),100);
    
    // Cursor
    //cursorx = cursory = 10;
    C.group({n:"cursor",w:size*1.2,h:size*1.2,x:cursorx*size+size/2, y:cursory*size+size/2, z:gridz*sizeh,o:"center"})
    //C.camera({x:cursorx*20+10,y:cursory*20+10,z:-300,rx:20});
    
    
    select(0);
    rerender = 1;
    
    links();
    
    for(i of roads){
      if(i){
        barriers(i)
      }
    }
    
    turns();
    
    equations();
    
    ui();
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
      /*[10,15,0],
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
      [11,14,0],*/
    ];
    
    for(i of roads){
      
      if(i){
        space[i[0]][i[1]][i[2]] = {
          fixed: 1,
          free: 0,
          id: i[3],
          linkable: {},
          links: {},
          flat: {u: 1, r: 1, d: 1, l: 1 },
          barriers: {u: 0, r: 0, d: 0, l: 0},
          surrogate: 0,
          angle: i[4], u: 0, r: 0, d: 0, l: 0,
          equation: "false"
        };

        // Draw current road block
        draw_block(i[3],"scene",i[0],i[1],i[2],0,i[4]);
      }
    }
    
    // Road links (semi-automatic for now)
    roadlinks = [
      [[11,10,0],[11,11,0]],
      //[[11,10,0],[12,10,0]],
      //[[15,10,0],[15,11,0]],
      //[[11,14,0],[10,14,0]]
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
