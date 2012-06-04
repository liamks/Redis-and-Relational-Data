
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
var pg = require('pg').native;

var cs = "pg://ldk:@localhost:5432/ldk"

var client = new pg.Client(cs)
client.connect()



var completed = 0, queries = [], start = Date.now();


for (var i = 1; i < 10001; i++) {
  (function(i){
   queries[i] = client.query("select * from posts, comments where posts.id=$1 AND posts.id=comments.post_id;", [i])
   queries[i].on('row', function(row){ });
   
   queries[i].on('end', function(){ 
    completed += 1 
    if(completed === 10000){
      client.end();
      console.log("End: " + (Date.now() - start))
    }
  })

 })(i)
};





