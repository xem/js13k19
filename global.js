// Global vars
// -----------

// HTML ids
//window.b = b;
//window.scene = scene;

// General
var mode = 1; // 0: menu, 1: editor, 2: race
var world = 0 // 0: snow, 1: desert, 2: castle
var puzzle = 0; // Current puzzle
var race = 0; // Current race
var size = 100; // block size in px (width, depth)
var sizeh = 50 // block height in px

// Keyboard
var s = 0, u = 0, l = 0, d = 0, r = 0; // hold (space / up / left / down / right)
var S = 0, U = 0, L = 0, D = 0, R = 0; // press
var _ = 0, $ = 0; // press suppr, enter key

// Camera
var cx = 25;
var cy = 25;
var cz = 30;
var crx = 55;
var cry = 0;
var crz = 0;

// Car
var carx = 10 * size + size/2;
var cary = 16 * size + size/2;
var carrz = 0;
var carspeed = 0;
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
var roads = []; // road blocks
var roadlinks = []; // links between road blocks

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

// Race
var ev; // eval

// Temp vars
var i, j, k, x, y, z;
var block;
var times;
