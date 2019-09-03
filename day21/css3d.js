// CSS3D framework (customized for this game, source: http://github.com/xem/CSS3Dframework)
// ---------------

C = {
  unit: "px",
  camX: 0,
  camY: 0,
  camZ: 0,
  camRX: 0,
  camRY: 0,
  camRZ: 0,
  sprite_count: 0,
  sprites: [],
  plane_count: 0,
  cube_count: 0,
  options: {},
  
  $: id => document.getElementById(id),
  
  init: o => {
    if(!o.css) o.css = "";
    if(!o.html) o.html = "";
    if(!o.g) o.g = "scene";
    if(!o.o) o.o = "center";
    if(o.o == "bottom") o.y -= o.h/2;
    if(!o.w) o.w = 0;
    if(!o.h) o.h = 0;
    if(!o.x) o.x = 0;
    if(!o.y) o.y = 0;
    if(!o.z) o.z = 0;
    if(!o.rx) o.rx = 0;
    if(!o.ry) o.ry = 0;
    if(!o.rz) o.rz = 0;
    if(!o.sx) o.sx = 1;
    if(!o.sy) o.sy = 1;
    if(!o.sz) o.sz = 1;
    C.options[o.n] = o;
  },
  
  group: o => {
    if(!o.d && !(o.d === 0)) o.d = o.h;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="group ${o.css}"style="position:absolute;width:${o.w}${C.unit};height:${o.d}${C.unit};background:${o.b};transform:${C.tr(o)}">`;
  },
  
  plane: o => {
    if(!o.n) o.n = `plane${C.plane_count++}`;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="plane ${o.css}"style="position:absolute;width:${o.w}${C.unit};height:${o.h}${C.unit};background:${o.b};background-position:${o.bp};transform-origin:${o.o};transform:${C.tr(o)}">${o.html}`;
    C.camera();
  },
  
  sprite: o => {
    if(!o.n) o.n = `sprite${C.sprite_count++}`;
    C.init(o);
    C.$(o.g).innerHTML += `<div id="${o.n}"class="sprite ${o.css}"style="position:absolute;width:${o.w}${C.unit};height:${o.h}${C.unit};background:${o.b};transform-origin:${o.o};transform:${C.tr(o)}">${o.html}`;
    C.sprites.push(o.n);
    C.camera();
  },

  cube: o => {
    if(!o.n) o.n = `cube${C.cube_count++}`;
    C.init(o);
    C.group(o);
    C.plane({g:o.n,x:o.w/2,y:o.d/2,w:o.w,h:o.d,b:o.b,css:"bottom"}); // bottom
    C.plane({g:o.n,y:o.d/2,w:o.d,h:o.h,b:o.b,rx:-90,ry:-90,o:"bottom",css:"left"}); // left
    C.plane({g:o.n,x:o.w,y:o.d/2,w:o.d,h:o.h,b:o.b3,rx:-90,ry:-90,o:"bottom",css:"right"}); // right
    C.plane({g:o.n,x:o.w/2,y:0,w:o.w,h:o.h,b:o.b2,rx:-90,o:"bottom",css:"back"}); // back
    C.plane({g:o.n,x:o.w/2,y:o.d,w:o.w,h:o.h,b:o.b2,rx:-90,o:"bottom",css:"front"}); // front
    C.plane({g:o.n,x:o.w/2,y:o.d/2,z:o.h,w:o.w,h:o.d,b:o.b,css:"top"}); // top
  },

  camera: o => {
    if(o && (o.x || o.x === 0)) C.camX = o.x;
    if(o && (o.y || o.y === 0)) C.camY = o.y;
    if(o && (o.z || o.z === 0)) C.camZ = o.z;
    if(o && (o.rx || o.rx === 0)) C.camRX = o.rx;
    if(o && (o.ry || o.ry === 0)) C.camRY = o.ry;
    if(o && (o.rz || o.rz === 0)) C.camRZ = o.rz;
    C.camX += ((Math.random() - .5)/1000);
    scene.style.transformOrigin = `${C.camX}${C.unit} ${C.camY}${C.unit}`;
    scene.style.transform = `translateX(${-C.camX}${C.unit})translateY(${-C.camY}${C.unit})translateZ(${-C.camZ}${C.unit})rotateX(${C.camRX}deg)rotateY(${C.camRY}deg)rotateZ(${C.camRZ}deg)`;
    
    for(var i in C.sprites){
      var s = C.$(C.sprites[i]);
      if(s){
        var t = s.style.transform.replace(/ *rotate.*\(.*?deg\)/g,"");
        s.style.transform = t + `rotateZ(${-C.camRZ}deg)rotateX(${-C.camRX}deg)`;
      }
    }
  },

  move: o => {
    //console.log(o.n, C.$(o.n));
    if(o.n){
      var obj = C.$(o.n);
      var opt = C.options[o.n];
      if(o.x || o.x === 0) opt.x = o.x;
      if(o.y || o.y === 0) opt.y = o.y;
      if(o.z || o.z === 0) opt.z = o.z;
      if(o.rx || o.rx === 0) opt.rx = o.rx;
      if(o.ry || o.ry === 0) opt.ry = o.ry;
      if(o.rz || o.rz === 0) opt.rz = o.rz;
      C.options[o.n] = opt;
      obj.style.transform = C.tr(opt);
    }
  },
  
  tr: o => `${o.o=="top left"?"":"translateX(-50%)translateY(-50%)"}translateX(${o.x}${C.unit})translateY(${o.y}${C.unit})translateZ(${o.z}${C.unit})rotateX(${o.rx}deg)rotateY(${o.ry}deg)rotateZ(${o.rz}deg)`
}
