// Game loop
// ---------

setInterval(()=> {
  
  // Menu
  //if(mode == 0){
    
  //}
  
  // Editor mode:
  if(mode == 1){
    editor();
  }
  
  // Race mode:
  else if(mode == 2){
    race();
    
    // Back to editor
    if(P){
      mode=1;init(track); play(musics.editor[0],musics.editor[1],1100,16600)
    }
  }
  
  // score
  else if(mode == 3){
    //console.log(timer);
    if($){
      mode = 2;
      init(track);
    }
    
    // Back to editor
    if(P){
      mode=1;init(track); play(musics.editor[0],musics.editor[1],1100,16600)
    }
  }
  
  // Reset 
  S = _ = U = L = D = R = P = 0;
  
},16);
