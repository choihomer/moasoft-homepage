var express = require('express') ;
var router = express.Router() ;
const sqlconfig = require('./sqlConfig.js') ;
const sql = require('mssql') ;

async function ManagerLogin(param_id, param_pw){
    await sql.connect(sqlconfig.config) ;
    const querystr = `select * from user_Id where us_id = '${param_id}' and us_pw = '${param_pw}' and us_master = '관리자' `
    const result = await sql.query(querystr) ;
    return result ;
}

router.get('/',function(req, res,next){
    ManagerLogin(req.query.in_id, req.query.in_pw).then((result)=>{
        res.send(result.recordset) ;
    })
})
module.exports = router ;