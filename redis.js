var redis = require('redis').createClient();




var multi, completed = 0, start = Date.now();

for (var i = 1; i < 10001; i++) {
  multi = redis.multi();
  multi.hgetall( String(i) );
  multi.zrange( String(i) + '-comments', 0, -1 );
  multi.exec( function(e,d){
    completed += 1;
    if(completed === 10000){
      console.log("Done: " + String(Date.now() - start));
      redis.quit();
    }
  })

};