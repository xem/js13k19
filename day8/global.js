// Global vars
// -----------

// General
var mode = 1; // 0: menu, 1: editor, 2: race
var world = 0 // 0: snow, 1: desert, 2: castle
var puzzle = 0; // Current puzzle
var race = 0; // Current race

// Camera
var cx = 25;
var cy = 25;
var cz = 30;
var crx = 55;
var cry = 0;
var crz = 0;

// Car
var carx = 10 * 20 + 10;
var cary = 16 * 20 + 10;
var carrz = 0;
var carspeed = 0;
var front = [0,0,0], back = [0,0,0]; // front/back side coordinates (range: 0 - 400)
var frontcell = [0,0], backcell = [0,0]; // front/back side cell (range: 0 - 20)
var oob = 0;
var collision = 0;
var speedduringcollision = 0;

// Car's front/back vars used in the game loop
var fcell, bcell;
var fcellinfo, bcellinfo;

// Current race data
var space = []; // 3D space
var roads = []; // road blocks
var roadlinks = []; // links between road blocks

// Editor
var gridz = 0;
var gridrz = 0;