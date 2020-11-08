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




// -------------------- Usuario ---------------------------------

  router.post('/usuario', async(req,res)=>{
    try{
        const { nickname, contra, idpersona, tipo_usu } = req.body;
        newTodo = await pool.query(
        `INSERT INTO usuario(idpersona, contraseña, tipousuario, nickname) VALUES(${idpersona},'${contra}','${tipo_usu}','${nickname}')`);
        res.send(newTodo);
    }catch(e){
        console.log(e);
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
         
>>>>>>> c6d25caa87b255b322a9a7791d8d5103f076df16
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
