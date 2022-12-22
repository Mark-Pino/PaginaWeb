const dbConn=require('../lib/db');
const excelJS = require('exceljs');

//usuarios
exports.saveUsuarios=(req, rest)=>{
    const tra_nombre=req.body.tra_nombre;
    const tra_nro_documento=req.body.tra_nro_documento;
    const tra_ap_paterno=req.body.tra_ap_paterno;
    const tra_ap_materno=req.body.tra_ap_materno;
    const tra_direccion=req.body.tra_direccion;
    const tra_telefono=req.body.tra_telefono;
    const email=req.body.email;
    const password=req.body.password;
    /* console.log(tra_nombre +" - "+tra_nro_documento+" - "+tra_ap_paterno +" - "+tra_ap_materno +" - "+tra_direccion+" - "+tra_telefono+" - "+email+" - "+password); */
    dbConn.query('INSERT INTO trabajador SET ?' ,{tra_nombre:tra_nombre, tra_nro_documento:tra_nro_documento, tra_ap_paterno:tra_ap_paterno, tra_ap_materno:tra_ap_materno, tra_direccion:tra_direccion, tra_telefono:tra_telefono, email:email, password:password}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            rest.redirect('/usuarios');
        }
    }) 
}
exports.updateUsuarios = (req, res)=>{
    const id = req.body.id;
    const tra_nombre = req.body.tra_nombre;
    const tra_nro_documento = req.body.tra_nro_documento;
    const tra_ap_paterno = req.body.tra_ap_paterno;
    const tra_ap_materno = req.body.tra_ap_materno;
    const tra_direccion = req.body.tra_direccion;
    const tra_telefono = req.body.tra_telefono;
    const email = req.body.email;
    const password = req.body.password;
    dbConn.query('UPDATE trabajador SET ? WHERE id = ?',[{tra_nombre:tra_nombre, tra_nro_documento:tra_nro_documento, tra_ap_paterno:tra_ap_paterno, tra_ap_materno:tra_ap_materno, tra_direccion:tra_direccion, tra_telefono:tra_telefono, email:email, password:password}, id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/usuarios');
        }
    })
}

//clientes
exports.savePacientes=(req, rest)=>{
    const cli_nombre=req.body.cli_nombre;
    const cli_nro_documento=req.body.cli_nro_documento;
    const cli_peso=req.body.cli_peso;
    const cli_talla=req.body.cli_talla;
    const cli_apellidos=req.body.cli_apellidos;
    const cli_direccion=req.body.cli_direccion;
    const cli_telefono=req.body.cli_telefono;
    const cli_sexo=req.body.cli_sexo;
    const cli_tipo_persona=req.body.cli_tipo_persona;
    /* console.log(tra_nombre +" - "+tra_nro_documento+" - "+tra_ap_paterno +" - "+tra_ap_materno +" - "+tra_direccion+" - "+tra_telefono+" - "+email+" - "+password); */
    dbConn.query('INSERT INTO clientes SET ?' ,{cli_nombre:cli_nombre, cli_nro_documento:cli_nro_documento, cli_peso:cli_peso, cli_talla:cli_talla, cli_apellidos:cli_apellidos, cli_direccion:cli_direccion, cli_telefono:cli_telefono, cli_sexo:cli_sexo, cli_tipo_persona:cli_tipo_persona}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            rest.redirect('/pacientes');
        }
    }) 
}

exports.updatePacientes = (req, res)=>{
    const cli_id = req.body.cli_id;
    const cli_nombre=req.body.cli_nombre;
    const cli_nro_documento=req.body.cli_nro_documento;
    const cli_peso=req.body.cli_peso;
    const cli_talla=req.body.cli_talla;
    const cli_apellidos=req.body.cli_apellidos;
    const cli_direccion=req.body.cli_direccion;
    const cli_telefono=req.body.cli_telefono;
    const cli_sexo=req.body.cli_sexo;
    const cli_tipo_persona=req.body.cli_tipo_persona;
    dbConn.query('UPDATE clientes SET ? WHERE cli_id = ?',[{cli_nombre:cli_nombre, cli_nro_documento:cli_nro_documento, cli_peso:cli_peso, cli_talla:cli_talla, cli_apellidos:cli_apellidos, cli_direccion:cli_direccion, cli_telefono:cli_telefono, cli_sexo:cli_sexo, cli_tipo_persona:cli_tipo_persona}, cli_id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/pacientes');
        }
    })
}

//Stock
exports.saveStock=(req, rest)=>{
    const prod_nombre=req.body.prod_nombre;
    const prod_codigo=req.body.prod_codigo;
    const prod_marca=req.body.prod_marca;
    const prod_stock=req.body.prod_stock;
    const prod_cat_id=req.body.prod_cat_id;
    /* console.log(tra_nombre +" - "+tra_nro_documento+" - "+tra_ap_paterno +" - "+tra_ap_materno +" - "+tra_direccion+" - "+tra_telefono+" - "+email+" - "+password); */
    dbConn.query('INSERT INTO productos SET ?' ,{prod_nombre:prod_nombre, prod_codigo:prod_codigo, prod_marca:prod_marca, prod_stock:prod_stock, prod_cat_id:prod_cat_id}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            rest.redirect('/stock');
        }
    }) 
}
exports.updateStock = (req, res)=>{
    const prod_id = req.body.prod_id;
    const prod_nombre=req.body.prod_nombre;
    const prod_codigo=req.body.prod_codigo;
    const prod_marca=req.body.prod_marca;
    const prod_stock=req.body.prod_stock;
    const prod_cat_id=req.body.prod_cat_id;
    dbConn.query('UPDATE productos SET ? WHERE prod_id = ?',[{prod_nombre:prod_nombre, prod_codigo:prod_codigo, prod_marca:prod_marca, prod_stock:prod_stock, prod_cat_id:prod_cat_id}, prod_id], (error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/stock');
        }
    })
}

exports.saveAtencion=(req, rest)=>{
    const at_fecha=req.body.at_fecha;
    const at_numero=req.body.at_numero;
    const at_motivo=req.body.at_motivo;
    const at_observacion=req.body.at_observacion;
    const at_cli_id=req.body.at_cli_id;
    const at_tra_id=req.body.at_tra_id;
    /* console.log(tra_nombre +" - "+tra_nro_documento+" - "+tra_ap_paterno +" - "+tra_ap_materno +" - "+tra_direccion+" - "+tra_telefono+" - "+email+" - "+password); */
    dbConn.query('INSERT INTO atencion SET ?' ,{at_fecha:at_fecha, at_numero:at_numero, at_motivo:at_motivo, at_observacion:at_observacion, at_cli_id:at_cli_id, at_tra_id:at_tra_id}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            rest.redirect('/pacientes');
        }
    }) 
}

exports.saveAtencion=(req, rest)=>{
    const at_fecha=req.body.at_fecha;
    const at_numero=req.body.at_numero;
    const at_motivo=req.body.at_motivo;
    const at_observacion=req.body.at_observacion;
    const at_cli_id=req.body.at_cli_id;
    const at_tra_id=req.body.at_tra_id;
    /* console.log(tra_nombre +" - "+tra_nro_documento+" - "+tra_ap_paterno +" - "+tra_ap_materno +" - "+tra_direccion+" - "+tra_telefono+" - "+email+" - "+password); */
    dbConn.query('INSERT INTO atencion SET ?' ,{at_fecha:at_fecha, at_numero:at_numero, at_motivo:at_motivo, at_observacion:at_observacion, at_cli_id:at_cli_id, at_tra_id:at_tra_id}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            rest.redirect('/pacientes');
        }
    }) 
}

