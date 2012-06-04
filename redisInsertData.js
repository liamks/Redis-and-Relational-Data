var redis = require('redis').createClient(),
    data = require('./createData').getData();



var post, multi = redis.multi();


for (var i = 0; i < data.posts.length; i++) {
  post = data.posts[i];
  multi.hmset( String(i+1), post )
};

var comment, key;

for (var i = 0; i < data.comments.length; i++) {
  comment = data.comments[i];
  key = comment.post_id + '-comments'
  multi.zadd( key, Date.now(), comment.comment );
};


multi.exec(function(e,d){
  console.log('Done')
})