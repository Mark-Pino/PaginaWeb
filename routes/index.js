var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personal', function(req, res, next) {
  res.render('personal');
});

router.get('/nosotros', function(req, res, next) {
  res.render('nosotros');
});

router.get('/contactos', function(req, res, next) {
  res.render('contactos');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/checklogin', function(req, res, next) {
  email=req.body.email;
  password=req.body.password;
  console.log(email);
  dbConn.query("SELECT * FROM trabajador WHERE email='"+email+"' AND password='"+password+"'",function(err,rows){
    if(err){
      req.flash('error',err);
      console.log(err);
    }else{
      if(rows.length){
        console.log(rows);
        req.session.idu=rows[0]["id"];
        req.session.email=rows[0]["email"];
        req.session.loggedin = true;
        res.redirect('/dashboard');
      }else{
        req.flash('error','El usuario no existe...');
        res.redirect('/login');
      }
    }
  });

  
});

//Dashboard
router.get('/dashboard', function(req, res, next) {
   //if(!req.session.loggedin){
   //  res.redirect('/login');
   //}else{
     res.locals.idu=req.session.idu;
     res.locals.email=req.session.email;
     res.locals.loggedin=req.session.loggedin;

     var queries = [
      "SELECT COUNT(cli_id) as cantidad FROM clientes",
      "SELECT SUM(cli_id) as total FROM clientes"
    ];
    
     //dbConn.query('SELECT SUM(saldo) as total FROM clientes',function(err,rows) {
     dbConn.query(queries.join(';'),function(err,rows) {
      //console.log(rows[0].total);
      if(err) throw err;
      //console.log(rows[0][0].cantidad);
      res.render('dashboard',{dataCantidad:rows[0][0].cantidad,dataSaldo:rows[1][0].total});
     });
     
   //}
});

//Usuarios
router.get('/usuarios', (req, res)=>{
  dbConn.query('SELECT * FROM trabajador', (error, results)=>{
     if(error){
         throw error;
     }else{
         res.render('usuarios/index', {results:results});
     }
  });
});

  //Crear Usuario
  router.get('/crearUsuarios', (req, res)=>{
    res.render('usuarios/crear');
  });

  //Editar Usuario
  router.get('/editarUsuarios/:id', (req, res)=>{
    const id = req.params.id;
    dbConn.query('SELECT * FROM trabajador WHERE id = ?', [id], (error, results)=>{
      if(error){
        throw error;
    }else{
        res.render('usuarios/editar', {user:results[0]});
    }
    })

  });

  //Eliminar Usuario
  router.get('/eliminarUsuarios/:id', (req, res, next)=>{
    let id = req.params.id;
    dbConn.query('DELETE FROM trabajador WHERE id = ' + id, function(error, results){
      if(error){
          throw error;
        }else{
          res.redirect('../../usuarios');
        }
    })
  });

//Sotck
router.get('/stock', (req, res)=>{
  dbConn.query('SELECT * FROM productos', (error, results)=>{
     if(error){
         throw error;
     }else{
         res.render('stock/index', {results:results});
     }
  })
})

  //Crear Stock
  router.get('/crearStock', (req, res)=>{
    res.render('stock/crear');
  })

  //Editar Sotck
  router.get('/editarStock/:prod_id', (req, res)=>{
    const prod_id = req.params.prod_id;
    dbConn.query('SELECT * FROM productos WHERE prod_id = ?',[prod_id], (error, results)=>{
      if(error){
        throw error;
    }else{
        res.render('stock/editar', {userpro:results[0]});
    }
    })

  });

  //Eliminar Stock
  router.get('/eliminarStock/:prod_id', (req, res, next)=>{
    let prod_id = req.params.prod_id;
    dbConn.query('DELETE FROM productos WHERE prod_id = ' + prod_id, function(error, results){
      if(error){
          throw error;
        }else{
          res.redirect('../../stock');
        }
    })
  });

//Pacientes
router.get('/pacientes', (req, res)=>{
  dbConn.query('SELECT * FROM clientes', (error, results)=>{
     if(error){
         throw error;
     }else{
         res.render('pacientes/index', {results:results});
     }
  })
})

  //Crear Pacientes
  router.get('/crearPacientes', (req, res)=>{
    res.render('pacientes/crear');
  })

  //Editar Pacientes
  router.get('/editarPacientes/:cli_id', (req, res)=>{
    const cli_id = req.params.cli_id;
    dbConn.query('SELECT * FROM clientes WHERE cli_id = ?',[cli_id], (error, results)=>{
      if(error){
        throw error;
    }else{
        res.render('pacientes/editar', {usercli:results[0]});
    }
    })

  });

  //Eliminar Pacientes
  router.get('/eliminarPacientes/:cli_id', (req, res, next)=>{
    let cli_id = req.params.cli_id;
    dbConn.query('DELETE FROM clientes WHERE cli_id = ' + cli_id, function(error, results){
      if(error){
          throw error;
        }else{
          res.redirect('../../pacientes');
        }
    })
  });
//Atencion
  router.get('/crearAtencion/:cli_id', (req, res)=>{
    const cli_id = req.params.cli_id;
    dbConn.query('SELECT * FROM clientes WHERE cli_id = ?',[cli_id], (error, results)=>{
      if(error){
        throw error;
    }else{
        res.render('atencion/crear', {usercli:results[0]});
    }
    })
  });

//CRUD
const crud = require('../controllers/crud');
const { json } = require('body-parser');
router.post('/saveUsuarios', crud.saveUsuarios)
router.post('/savePacientes', crud.savePacientes)
router.post('/saveAtencion', crud.saveAtencion)
router.post('/saveStock', crud.saveStock)
router.post('/updateUsuarios', crud.updateUsuarios)
router.post('/updateStock', crud.updateStock)
router.post('/updatePacientes', crud.updatePacientes)

module.exports = router;
