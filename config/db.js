let mysql = require('mysql')
let con = mysql.createConnection({
    host      :'185.98.131.93',
    user      :'cpita559514',
    password  :'tREJTbRK',
    database  :'cpita559514_56jntcq'
  })
  con.connect()
module.exports = con