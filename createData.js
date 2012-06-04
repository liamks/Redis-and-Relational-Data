var fs = require('fs'),
    englishWords = fs.readFileSync('wordsEn.txt', 'utf8').split('\n');



function createPost( postID ){
  return {
    title : englishWords[postID].replace(/\r/gm,' ').slice(0,100)
  }
}

function createComment( postID, j ){
  var comment = [englishWords[postID + 1 + j], englishWords[postID + 2 + j], englishWords[postID + 3 + j]]
  return {
    post_id : postID, 
    comment : comment.join(' ').replace(/[\r']/gm,' ').slice(0,100)
  }
}

function createData(){
  var posts = [], comments = [];
  for (var i = 0; i < 10000; i++) {
    posts.push( createPost( i ) );

    for( var j = 0; j < 10; j++){
      comments.push( createComment(i, j) );
    }

  };

  return {
    posts : posts,
    comments : comments
  }
}


exports.getData = function(){
  return createData();
}