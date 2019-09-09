// Game loop
// ---------

setInterval(()=> {
  
  // Editor mode:
  if(mode == 1){
    editor();
  }
  
  // Race mode:
  else if(mode == 2){
    race();
  }
  
  // Reset keypresses
  S = _ = U = L = D = R = 0;
  
},16);
