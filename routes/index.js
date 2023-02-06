var express = require('express');
const { off } = require('../app');
var router = express.Router();



let db = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Painel administrativo' });
});


router.post('/auth', function(req, res, next) {
 let postData = req.body;

  if(postData.user == "" || !postData.user || postData.user.split('').length < 3){
    res.status(400).json({
      error: true,
      message: "Nome de usuário inválido!"
    })
    return;
  }

  if(postData.pass == "" || !postData.pass || postData.pass.split('').length< 3){
    res.status(400).json({
      error: true,
      message: "Senha inválida!"
    })
    return;
  }



  let sqlQuery = "SELECT * FROM `users`where user = '"+postData.user+"' and pass = MD5('"+postData.pass+"');";
  db.query(sqlQuery, (err, result, fields)=>{


    if(err){
      res.status(400).json({
        error: true,
        message:  "Runtime error"
      })
      return;
    }



    console.log(result)

    if( result.length == 0 ){
      res.status(401).json({
        error: true,
        message:  "Usuário ou senha inválidos!"
      });
      return;
    }else{
      res.json(result);
      
    }
  })
});
module.exports = router;
