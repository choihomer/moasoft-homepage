var express = require('express') ;
var router = express.Router() ;
const sqlconfig = require('./sqlConfig.js') ;
const sql = require('mssql') ;

async function loadNotice(){
    await sql.connect(sqlconfig.config) ;
    const querystr = 'select TOP 5 * from notice_data order by mt_version desc '
    const result = await sql.query(querystr) ;
    return result ;
}
router.get('/',function(req, res,next){
    loadNotice().then((result)=>{
        res.send(result.recordset) ;
    })
})

module.exports = router ;