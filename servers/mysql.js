const mysql = require('mysql');
const client = mysql.createConnection({
  host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'ego',
     port: 3306

});

function sqlFn(sql,arr,callback){
  client.query(sql,arr,function(error,result){
    if(error){
      console.log(error);
      return;
    }
    // 回调函数
    callback(result)
  })
}

module.exports = sqlFn;