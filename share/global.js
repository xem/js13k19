// Global vars
// -----------

// HTML ids
window.b = b;

// Keyboard
window.s = window.u = window.l = window.d = window.r = 0; // hold (space / up / left / down / right)
window.S = window.U = window.L = window.D = window.R = 0; // press
window._ = window.$ = window.P = 0; // press suppr, enter, esc

// General
window.mode = 0; // 0: menu, 1: editor, 2: race
window.world = 0 // 0: snow, 1: desert, 2: castle
var puzzle = 0; // Current puzzle
var race = 0; // Current race
var size = 100; // block size in px (width, depth)
var sizeh = 50 // block height in px
var unlock = 0;

// Camera
var cx = 0;
var cy = 0;
var cz = 0;
var crx = 82;
var cry = 0;
var crz = 0;

// Car
var carx = 10 * size + size/2;
var cary = 16 * size + size/2;
var carrz = 0;
var carrzd = 0;
var carspeed = 0;
var caracc = 0;
var front = [0,0,0]
var back = [0,0,0]; // front/back side coordinates (range: 0 - 400)
var frontcell = [0,0];
var backcell = [0,0]; // front/back side cell (range: 0 - 20)
var oob = 0;
var collision = 0;
var speedduringcollision = 0;

// Car's front/back vars used in the game loop
var fcell
var bcell;
var fcellinfo;
var bcellinfo;

// Current race data
var space = []; // 3D space
var roads = []; // road blocks (summary)
var roadlinks = []; // links between road blocks (summary)
var ice = [];
var vspeed = 0;

/*
// Format:

space[x][y][z] = {
  fixed: 0,
  free: 0,
  id: 0,
  linkable: { u: [x, y-1, z], r: [x+1, y, z], d: [x, y+1, z], l: [x-1, y, z]},
  links: { u: 1, r: 1, d: 0, l: 0 },
  flat: { u: 1, r: 1, d: 0, l: 0 },
  barriers: { u: 0, r: 0, d: 1, l: 1 },
  surrogate: 0,
  angle: 0,
  equation: `Math.hypot(x-${x},y-${y},z-${z})>size*.8`
}

roads[i] = [x, y, z, id, angle, fixed]

roadlinks[i] = [[x,y,z],[x2,y2,z2]]
*/

// Editor
var gridz = 0;
var gridrz = 0;
var gridrzreal = 0;
var cursorx = 0
var cursory = 0;
var cursorrz = 0;
var cursorrzreal = 0;
var selected = 0;
var rerender = 0;
var inventory = [];
var track = {};
var originaltrack = {};

// Race
var ev; // eval
var timer = 0;
var speeder = 0;
var carangledisplay = 0;
var air = 0;
var acc = 0;
var start = [];
var end = [];
var checkpoints = 0;
var onice = 0;

// Temp vars
var i, j, k, x, y, z;
var block;
var times;


// Music
var audiocontexts = [];
var intervals = [];
var timeout = 0;


onload =()=>{
  if(location.hash){
    mode=50;
    console.log(track=JSON.parse(atob(location.hash.slice(1))));
    init(JSON.parse(atob(location.hash.slice(1))));
    
    url.value = "https://js13kgames.com/games/back-on-track-mania/index.html#"+btoa(JSON.stringify({roads:track.roads,roadlinks:track.roadlinks,inventory:track.inventory,w:track.w}));
    
    if(!track.w || track.w == 0){
      snow.checked = true;
    }
    else {
      desert.checked = true;
    }
    
    if(track.ice && track.ice[0].length == 4){
       icex.value = track.ice[0][0];
       icexy.value = track.ice[0][1];
       icew.value = track.ice[0][2];
       iceh.value = track.ice[0][3];
    }
  }
}

oninput = onclick = () => {
  if(snow.checked) track.w = 0;
  if(desert.checked) track.w = 1;
  world = track.w;
  
  if(icex.value && icey.value && icew.value && iceh.value){
    track.ice = [[+icex.value,+icey.value,+icew.value,+iceh.value]];
  }
  else {
    track.ice = [];
  }
  
  track.inventory = [];
  
  if(road.value && road.value!="0"){track.inventory.push([0,+road.value,+road.value])}
  if(jump.value && jump.value!="0"){track.inventory.push([4,+jump.value,+jump.value])}
  if(slope.value && slope.value!="0"){track.inventory.push([5,+slope.value,+slope.value])}
  if(longslope.value && longslope.value!="0"){track.inventory.push([6,+longslope.value,+longslope.value])}
  if(accel.value && accel.value!="0"){track.inventory.push([8,+accel.value,+accel.value])}
  if(accup.value && accup.value!="0"){track.inventory.push([9,+accup.value,+accup.value])}
  if(accdn.value && accdn.value!="0"){track.inventory.push([10,+accdn.value,+accdn.value])}
  
  url.value = "https://js13kgames.com/games/back-on-track-mania/index.html#"+btoa(JSON.stringify({roads:track.roads,roadlinks:track.roadlinks,inventory:track.inventory,w:track.w,ice:track.ice}));
  
  init(track);
}

test.onclick = () => {
  window.open(url.value);
}

tweet.onclick = () => {
  window.open("https://twitter.com/intent/tweet?text=" + encodeURI("I made a track for Back on Track (mania) by @MaximeEuziere and @d_nghia!\nPlay the game here: https://js13kgames.com/entries/back-on-track-mania\nPlay my track here: " + url.value));
}