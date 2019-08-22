// Inputs (source: https://xem.github.io/articles/jsgamesinputs.html)
// ------ 

// Keyboard
var u = 0, l = 0, d = 0, r = 0;
onkeydown = onkeyup = e => top['lld*rlurdu'[e.which % 32 % 17]] = e.type[5];


// Editor
gridup.onclick = () => {
  if(gridz < 10) gridz++;
  C.move({n:"grid", z: gridz * 20})
  C.camera({z:-300+gridz*20})
}

griddown.onclick = () => {
  if(gridz) gridz--;
  C.move({n:"grid", z: gridz * 20})
  C.camera({z:-300+gridz*20})
}

gridrl.onclick = () => {
  gridrz += 90;
  C.camera({rz:gridrz})
}

gridrr.onclick = () => {
  gridrz -= 90;
  C.camera({rz:gridrz})
}