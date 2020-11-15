const keys = require('./keys/keys.js')
const { Pool } = require('pg');
const cors = require("cors");
const express = require("express")
const router = express();


const pool = new Pool({
    connectionString:keys.posgresqlURI,
    ssl: {
      rejectUnauthorized: false
    }
  });
  

//middleware
router.use(cors());
router.use(express.json());

//exportar route

module.exports = router;

//crear todo

// ------------ Crear Doctor -------------------------------

router.post('/doctor', async(req,res)=>{
    try{
        const { idpersona, identidadsalud, iduniversidad } = req.body;
        newTodo = await pool.query(
        `INSERT INTO doctor(idperona, identidadsalud, iduniversidad) VALUES(${idpersona}, ${identidadsalud}, ${iduniversidad})`);
        res.send(newTodo);
    }catch(e){
        console.log('sigue intentando');
    }

});

// ------------ Actualizar Doctor -------------------------------

router.put('/doctor/:id',async (req,res)=>{
    try{
        const { id } = req.params;
     const { identidadsalud, iduniversidad} = req.body;
   await pool.query(
     `UPDATE doctor SET  identidadsalud = ${identidadsalud}, iduniversidad= ${iduniversidad}
     WHERE iddoctor = ${id}`
   );
   res.json('ACTUALIZADO');
    }catch(e){
     console.log("F");
    }
 });
// ------------ Borrar Doctor -------------------------------

router.delete('/doctor/:iddoc', async (req,res)=>{
    try{
        const { iddoc } = req.params;
        await pool.query(`DELETE FROM doctor WHERE iddoctor = ${iddoc}`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});



//------------- Universidades ------------------------------

router.get('/universidades/',async (req,res)=>{
    try{
        const arreglo = await pool.query(`SELECT * FROM universidades ORDER BY nombreuni`);
        res.send(arreglo.rows);
    }catch(e){
        console.log("no hay universidades");
    }
});


// ------------ Si esta persona es Doctor ------------------

router.get('/doctor/:idper',async (req,res)=>{
    try{
        const { idper } = req.params;
        const arreglo = await pool.query(`SELECT * FROM doctor WHERE idperona = ${idper}`);
        res.send(arreglo.rows);
    }catch(e){
        console.log("upppsss paila le dio error");
    }
});

// ------------ Eps ----------------------------------------

router.get('/eps/',async (req,res)=>{
    try{
        const arreglo = await pool.query(`SELECT * FROM eps ORDER BY nombreeps`);
        res.send(arreglo.rows);
    }catch(e){
        console.log("ninguna eps es buena");
    }
});

// ------------ Info Doctor --------------------------------

router.get('/doctores', async(req,res)=>{
    try{
        const arreglo = await pool.query(`select iddoctor, idpersona, per.nombre, apellido, idtipo, tipodocument, numerodoc,
        fechanaci, id_barrio, b.nombre as barrio, uni.iduniversidad, nombreuni, ideps, nombreeps
        from doctor d 
        join persona per on d.idperona = per.idpersona 
        join barrio b on per.barrio = b.id_barrio
        join tipodocumento ti on per.tipodoc = ti.idtipo
        join universidades uni on d.iduniversidad = uni.iduniversidad
        join eps e on d.identidadsalud = e.ideps`);
        res.send(arreglo.rows);
    } catch(e){
        console.log("MIS COJONES");
    } 
});



router.get('/doctorinfo/:iddoctor', async(req,res)=>{
    try{
        const { iddoctor } = req.params;
        const arreglo = await pool.query(`select iddoctor, idpersona, per.nombre, apellido, idtipo, tipodocument, numerodoc,
        fechanaci, id_barrio, b.nombre as barrio, uni.iduniversidad, nombreuni, ideps, nombreeps
        from doctor d 
        join persona per on d.idperona = per.idpersona 
        join barrio b on per.barrio = b.id_barrio
        join tipodocumento ti on per.tipodoc = ti.idtipo
        join universidades uni on d.iduniversidad = uni.iduniversidad
        join eps e on d.identidadsalud = e.ideps
        where iddoctor = ${iddoctor}`);
        res.send(arreglo.rows[0]);
    } catch(e){
        console.log("MIS COJONES");
    } 
});



// ------------ Usuario Doctor(Trae Su Persona) ------------

router.get('/usudoctor/:idusu', async(req,res)=>{
    try{
        const { idusu } = req.params;
        const arreglo = await pool.query(`select idusuario, u.idpersona, per.nombre, apellido, tipodocument, numerodoc, b.nombre as barrio, iddoctor, nombreuni as univer, nombreeps as eps
        from usuario u 
        join persona per on u.idpersona = per.idpersona 
        join barrio b on per.barrio = b.id_barrio
        join tipodocumento ti on per.tipodoc = ti.idtipo
        join doctor d on u.idpersona = d.idperona
        join universidades uni on d.iduniversidad = uni.iduniversidad
        join eps e on d.identidadsalud = e.ideps
        where idusuario = ${idusu}`);
        res.send(arreglo.rows[0]);
    } catch(e){
        console.log("MIS COJONES");
    } 
});

// ------------  Usuario * Persona ------------------------- 

router.get('/usuariopersox/:idper', async(req,res)=>{
    try{
        const { idper } = req.params;
        const arreglo = await pool.query(`SELECT  per.idpersona,idusuario,contraseña,nickname,tipousuario,
        nombre,apellido,tipodoc,numerodoc,barrio,fechanaci
		FROM usuario usu
		INNER JOIN persona per
		ON usu.idpersona=per.idpersona
		WHERE (per.idpersona= ${idper})`);
        res.send(arreglo.rows);
    } catch(e){
        console.log("MIS COJONES");
    } 
});

// -------------------- Usuario ---------------------------------

  router.post('/usuario', async(req,res)=>{
    try{
        const { nickname, contra, idpersona, tipo_usu } = req.body;
        newTodo = await pool.query(
        `INSERT INTO usuario(idpersona, contraseña, tipousuario, nickname) VALUES(${idpersona},'${contra}','${tipo_usu}','${nickname}')`);
        res.send(newTodo);
    }catch(e){
        console.log('F :asdasd');
    }
      
  });

 


router.delete('/usuario/:nick', async (req,res)=>{
    try{
        const { nick } = req.params;
        await pool.query(`DELETE FROM usuario WHERE nickname = '${nick}'`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});




router.put('/usuario/:id',async (req,res)=>{
   try{
       const { id } = req.params;
    const { nickname, contra, tipo_usu, idpersona } = req.body;
  await pool.query(
    `UPDATE usuario SET nickname = '${nickname}', contraseña  = '${contra}', tipousuario = '${tipo_usu}', idpersona = ${idpersona}
    WHERE idusuario = ${id}`
  );
  res.json('ACTUALIZADO');
   }catch(e){
    console.log("F");
   }
});



router.get('/usuario/:nick',async (req,res) =>{
    try{
        const { nick } = req.params;
        const arreglo = await pool.query(`SELECT * FROM usuario WHERE nickname = '${nick}'`);
        res.send(arreglo.rows);
    } catch(e){
        console.log("MIS COJONES");
    } 
});


router.get('/usuario2/:id',async (req,res) =>{
    try{
        const { id } = req.params;
        const arreglo = await pool.query(`SELECT * FROM usuario WHERE idpersona = '${id}'`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});

//--------------------- Persona --------------------------


router.post('/persona', async(req,res)=>{
    try{
        const { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci} = req.body;
        newTodo = await pool.query(
        `INSERT INTO persona ( nombre, apellido, tipodoc, numerodoc, barrio, fechanaci) 
        VALUES('${nombre}','${apellido}',${tipodoc},'${numerodoc}',${barrio},'${fechanaci}')`);
        res.send(newTodo);
    }catch(e){
        console.log(e);
    }

      
  });

 


router.delete('/persona/:idpersona', async (req,res)=>{
    try{
        const { idpersona } = req.params;
        await pool.query(`DELETE FROM persona WHERE idpersona = ${idpersona}`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});




router.put('/persona/:idpersona',async (req,res)=>{
   try{
       const { idpersona } = req.params;
    const { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci } = req.body;
  await pool.query(
    `UPDATE persona SET nombre = '${nombre}', apellido  = '${apellido}', tipodoc = ${tipodoc},
     numerodoc = '${numerodoc}', barrio = ${barrio}, fechanaci = '${fechanaci}'
    WHERE idpersona = ${idpersona}`
  );
  res.json('ACTUALIZADO');
   }catch(e){
    console.log("F");
   }
});



router.get('/persona/:idpersona',async (req,res) =>{
    try{
        const { idpersona } = req.params;
        const arreglo = await pool.query(`SELECT * FROM persona WHERE idpersona = ${idpersona}`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});


router.get('/personaiden/:numerodoc',async (req,res) =>{
    try{
        const { numerodoc } = req.params;
        const arreglo = await pool.query(`SELECT * FROM persona WHERE numerodoc = '${numerodoc}'`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});


router.get('/persona/',async (req,res) =>{
    try{
        
        const arreglo = await pool.query(`SELECT * FROM persona ORDER BY idpersona `);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});


// -------------------- Email -----------------------

router.post('/email', async(req,res)=>{
    try{
        const { email, idpersona } = req.body;
        newTodo = await pool.query(
        `INSERT INTO email (email, idpersona) VALUES('${email}',${idpersona})`);
        res.json("INSERTADO 7W7");
    }catch(e){
        console.log(e);
    }
      
  });

 


router.delete('/email/:idemail', async (req,res)=>{
    try{
        const { idemail } = req.params;
        await pool.query(`DELETE FROM email WHERE idemail = ${idemail}`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});




router.put('/email/:idemail',async (req,res)=>{
   try{
       const { idemail } = req.params;
    const { email, idpersona } = req.body;
  await pool.query(
    `UPDATE email SET email = '${email}', idpersona  = ${idpersona}
    WHERE idemail = ${idemail}`
  );
  res.json('ACTUALIZADO');
   }catch(e){
    console.log("F");
   }
});



router.get('/email/:idpersona',async (req,res) =>{
    try{
        const { idpersona } = req.params;
        const arreglo = await pool.query(`SELECT * FROM email WHERE idpersona = ${idpersona}`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});

router.get('/emailhay/:idpersona/:email',async (req,res) =>{
    try{
        const { idpersona, email } = req.params;
        const arreglo = await pool.query(`SELECT * FROM email 
        WHERE idpersona = ${idpersona} and email ILIKE '${email}'`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("Email no encontrado");
    } 
});

router.delete('/emaildel/:idpersona/:email', async (req,res)=>{
    try{
        const { idpersona, email } = req.params;
        await pool.query(`DELETE FROM email WHERE idpersona = ${idpersona} and email ILIKE '${email}'`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});


// ------------------------- Telefono --------------------

router.post('/telefono', async(req,res)=>{
    try{
        const { telefono, idpersona } = req.body;
        newTodo = await pool.query(
        `INSERT INTO telefono (telefono, idpersona) VALUES('${telefono}',${idpersona})`);
        res.json("INSERTADO 7W7");
    }catch(e){
        console.log(e);
    }
      
  });

 


router.delete('/telefono/:idtelefono', async (req,res)=>{
    try{
        const { idtelefono } = req.params;
        await pool.query(`DELETE FROM telefono WHERE idtelefono = ${idtelefono}`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});




router.put('/telefono/:idtelefono',async (req,res)=>{
   try{
       const { idtelefono } = req.params;
    const { telefono, idpersona } = req.body;
  await pool.query(
    `UPDATE telefono SET telefono = '${telefono}', idpersona  = ${idpersona}
    WHERE idtelefono = ${idtelefono}`
  );
  res.json('ACTUALIZADO');
   }catch(e){
    console.log("F");
   }
});



router.get('/telefono/:idpersona',async (req,res) =>{
    try{
        const { idpersona } = req.params;
        const arreglo = await pool.query(`SELECT * FROM telefono WHERE idpersona = ${idpersona}`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    } 
});

router.get('/telhay/:idpersona/:telefono',async (req,res) =>{
    try{
        const { idpersona, telefono } = req.params;
        const arreglo = await pool.query(`SELECT * FROM telefono 
        WHERE idpersona = ${idpersona} and telefono = '${telefono}'`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("Telefono no encontrado");
    } 
});

router.delete('/teldel/:idpersona/:telefono', async (req,res)=>{
    try{
        const { idpersona, telefono } = req.params;
        await pool.query(`DELETE FROM telefono WHERE idpersona = ${idpersona} and telefono = '${telefono}'`);
        res.json('ELIMINADO');
    }
    catch(err){
        console.error(err);
    }
});


//-------------------------- Barrio ----------------------


router.get('/barrio/:id_barrio',async (req,res) =>{
    try{
        const { id_barrio } = req.params;
        const arreglo = await pool.query(`SELECT * FROM barrio WHERE id_barrio = ${id_barrio}`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    }
});

router.get('/barrio/',async (req,res) =>{
    try{
        const arreglo = await pool.query(`SELECT * FROM barrio ORDER BY nombre`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    }
});


//-------------------------- tipoDocumento ----------------------


router.get('/tipodoc/:idtipo',async (req,res) =>{
    try{
        const { idtipo } = req.params;
        const arreglo = await pool.query(`SELECT * FROM tipodocumento WHERE idtipo = ${idtipo}`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    }
});

router.get('/tipodoc/',async (req,res) =>{
    try{
        const arreglo = await pool.query(`SELECT * FROM tipodocumento ORDER BY idtipo`);
        res.send(arreglo.rows);
         
    } catch(e){
        console.log("MIS COJONES");
    }
});

// ------------------------- Medicamentos ----------------

router.get('/medicamentos/',async (req,res)=>{
    try{
        const arreglo = await pool.query(`SELECT * FROM medicamentos ORDER BY idmedicamento`);
        res.send(arreglo.rows);
    }catch(e){
        console.log("F Medica");
    }
});

// ------------------------- Conexion --------------------

module.exports = router;
router.listen(5000, () => {
    console.log("server has started on port 5000");
  });


/*



const getPacientes = async () =>{
    try{
        const res = await pool.query('SELECT * FROM pacientes');
        console.log(res.rows);
         
    } catch(e){
        console.log(e);
    }
}

*/


//insertarPaciente();
//editarPaciente();
//deletePacientes();
//getPacientes();


 /*const insertarPaciente = async(req,res) =>{
    try{
        const text = 'INSERT INTO pacientes(nombre, apellido, numid) VALUES($1, $2, $3) ';
    const values = ['Pablito3','Clavo3','674378'];
    res = await pool.query(text,values);
    console.log('epa');
    }catch(e){
        console.log(e);
    }
    

}*/

/*
const editarPaciente = async()=>{
    try{
        const text = 'UPDATE pacientes SET nombre = $1, apellido = $2  WHERE numid = $3';
    const values = ['Andres','Moreno','908'];
    res = await pool.query(text,values);
    console.log('F mani');
    }catch{
        console.log(e);
    }
}
*/

/*const deletePacientes=async()=>{
    
    try{
        const text = 'DELETE FROM pacientes WHERE numid = $1';
    const values = ['5555'];

    res = await pool.query(text,values);
    console.log('F');
    }catch{
        console.log(e);
    }

}*/
