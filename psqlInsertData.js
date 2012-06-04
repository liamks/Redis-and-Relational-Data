/*
create table posts ( 
  id serial primary key, 
  title varchar(100) 
);

create table comments ( 
  id serial primary key, 
  post_id integer not null, 
  comment varchar(100), 
  foreign key(post_id) references posts(id) 
);

*/
var pg = require('pg'),
    createData = require('./createData');



var cs = "pg://ldk:@localhost:5432/ldk"

var client = new pg.Client(cs)
client.connect()

var data = createData.getData()


function insertPost(post){
  return ["INSERT INTO posts(title) VALUES('",
    post.title,
    "');"].join('');
}

function insertComment( comment ){
  return [
    "INSERT INTO comments(post_id, comment) VALUES(",
    comment.post_id + 1,
    ",'",
    comment.comment,
    "');"
  ].join('')
}


// for (var i = 0; i < data.posts.length; i++) {

//   client.query( insertPost(data.posts[i]) );
// };

for (var i = 0; i < data.comments.length; i++) {

  client.query( insertComment(data.comments[i]));
};


