import React, { Fragment } from "react";
import { Button, Form, Label, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, ButtonGroup } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

import { CrearPersona } from '../Login/index';


export default class CrearDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            match: props.idusu,
            admin: [],
            personas: [],
            persona: null,
            //Modals
            modalInserD: false,
            modalInserP: false,
            modalActuD: false,
            //
            nombrePa: '',
            selecdoc: null,
            selecpa: null,
            listDoc: [],
            //Info Modal Doc
            universidad: null,
            universidades: [],
            eps: null,
            epss: [],
            //
            //Actu Modal Doc
            nombreAD: '',
            apellidoAD: '',
            tipoD_AD: null,
            idenAD: '',
            barrioAD: null,
            fechaAD: null,
            emailAD: [],
            emailBAD: [],
            telAD: [],
            telBAD: [],
            uniAD: null,
            epsAD: null,
            idPerDoc: null,
            //Direccion Doc
            viaPD: null,
            numViaPD: '',
            numViaSD: '',
            numCasaD: '',
            tipoInmD: null,
            comTipoInmD: '',
            bloqueIntD: null,
            comBloqueIntD: '',
            idDirecDoc: null,
            //Hay Email y Tell
            hayEmail: false,
            hayTel: false,
            //Barrios y TiposID
            barrios: [],
            tiposDOC: [],

            // Selects Direccion
            selViaP: [],
            selTipoInm: [],
            selBloqueInt: [],
            //Info Modal Pac
            numIP: null,
            geoPLA: '',
            geoPLO: '',
            docSelP: '',
            ciudadP: '',
            selCiudades: [],
            //
            haydoc: false,
            haypac: false

        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    // Inicializacion

    async componentDidMount() {

        await fetch('http://localhost:5000/persona/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        personas: result
                    });

                }
            )

        await fetch('http://localhost:5000/doctores/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        listDoc: result
                    });

                }
            )

        await fetch('http://localhost:5000/universidades/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        universidades: result
                    });

                }
            )
        await fetch('http://localhost:5000/eps/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        epss: result
                    });

                }
            )

        await fetch('http://localhost:5000/tipodoc/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        tiposDOC: result
                    });
                }
            )

        await fetch('http://localhost:5000/barrio/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        barrios: result
                    });
                }
            )

        await fetch('http://localhost:5000/viap/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        selViaP: result
                    });
                }
            )

        await fetch('http://localhost:5000/inmueble/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        selTipoInm: result
                    });
                }
            )

        await fetch('http://localhost:5000/bloque/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        selBloqueInt: result
                    });
                }
            )

        await fetch('http://localhost:5000/ciudades/')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        selCiudades: result
                    });
                }
            )

    }

    // Crear Doctores y Pacientes

    async hayDoctor() {
        await fetch(`http://localhost:5000/doctor/${this.state.persona}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        haydoc: false
                    });
                } else {
                    this.setState({
                        haydoc: true
                    });
                }

            });
    }

    async hayPaciente() {
        await fetch(`http://localhost:5000/paciente/${this.state.persona}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        haypac: false
                    });
                } else {
                    this.setState({
                        haypac: true
                    });
                }

            });
    }


    async crearPac() {

        const nombre = this.state.personas[document.getElementById('persona').selectedIndex - 1].nombre;
        const apellido = this.state.personas[document.getElementById('persona').selectedIndex - 1].apellido;
        var idpersona = this.state.persona;
        var numintegrantes = this.state.numIP;
        var latitud = this.state.geoPLA;
        var longitud = this.state.geoPLO;
        var iddoctor = this.state.docSelP;
        var ciudadcontagio = this.state.ciudadP;
        var hoy = new Date();
        var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        var idusu = this.state.match;
        var idpaciente = null;
        console.log(idusu)
        const body = { idpersona, numintegrantes, ciudadcontagio }
        console.log(body)

        
        await fetch(`http://localhost:5000/paciente/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        await fetch(`http://localhost:5000/paciente/${idpersona}`)
            .then(response => response.json())
            .then(result => {
                idpaciente = result[0].idpaciente;
            });


        const bodyG = { idpaciente, latitud, longitud }

        await fetch(`http://localhost:5000/geoloca/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyG)
            });

        const bodyD = { idpaciente, iddoctor }

        await fetch(`http://localhost:5000/atencion/`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyD)
        });

        const bodyR = { idusu, idpaciente, fecha, hora }
        console.log(bodyR)

        await fetch(`http://localhost:5000/registropac/`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyR)
            });

        await Swal.fire({
            icon: 'success',
            title: `Se ha agregado el Paciente ${nombre} ${apellido}`,
            text: 'Registre los Parientes de este Paciente',
            showConfirmButton: false,
            timer: 2500
        });

        this.cancelarP();
        

    }

    async crearDoctor() {

        const indexU = document.getElementById('universidad').selectedIndex - 1;
        const indexE = document.getElementById('eps').selectedIndex - 1;

        if (indexU >= 0 && indexE >= 0) {
            var idpersona = this.state.persona;
            var identidadsalud = this.state.eps;
            var iduniversidad = this.state.universidad;
            const nombre = this.state.personas[document.getElementById('persona').selectedIndex - 1].nombre;
            const apellido = this.state.personas[document.getElementById('persona').selectedIndex - 1].apellido;
            var hoy = new Date();
            var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
            var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
            var idusu = this.state.match;
            var iddoc = null;

            const body = { idpersona, identidadsalud, iduniversidad }


            await fetch(`http://localhost:5000/doctor/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            await fetch(`http://localhost:5000/id_doctor/`)
                .then(response => response.json())
                .then(result => {
                    iddoc = result[0].iddoctor;
                })


            const bodyR = { idusu, iddoc, fecha, hora }


            await fetch(`http://localhost:5000/registrodoc/`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyR)
                });
            await Swal.fire({
                icon: 'success',
                title: `Se ha agregado el Doctor ${nombre} ${apellido}`,
                showConfirmButton: false,
                timer: 1500
            })
            this.cancelarD();
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una Universidad y una Eps Valida.',
            })
        }
    }

    //Actualizar Doctor

    async actuDoc() {


        const id = document.getElementById('docSelec').value;
        var nombre = this.state.nombreAD;
        var apellido = this.state.apellidoAD;
        var tipodoc = this.state.tipoD_AD;
        var numerodoc = this.state.idenAD;
        var barrio = this.state.barrioAD;
        var fechanaci = this.state.fechaAD;
        var iduniversidad = this.state.uniAD;
        var identidadsalud = this.state.epsAD;
        var idpersona = this.state.idPerDoc;
        // Direccion
        var idviaprincipal = this.state.viaPD;
        var numeroviap = this.state.numViaPD;
        var numerovias = this.state.numViaSD;
        var numerocasa = this.state.numCasaD;
        var idtipoinmueble = this.state.tipoInmD;
        var idbloqueinterior = this.state.bloqueIntD;
        var numeroinmueble = this.state.comTipoInmD;
        var numerobloque = this.state.comBloqueIntD;
        var iddireccion = this.state.idDirecDoc;


        const body = { nombre, apellido, tipodoc, numerodoc, barrio, fechanaci }


        await fetch(`http://localhost:5000/persona/${idpersona}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

        const bodyD = { identidadsalud, iduniversidad }


        await fetch(`http://localhost:5000/doctor/${id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyD)
            });


        // Direccion
        if (idtipoinmueble === 'Tipo de Inmueble') {
            idtipoinmueble = null;

        }
        if (idbloqueinterior === 'Bloque o Interior') {
            idbloqueinterior = null;

        }

        const bodyDirec = { idviaprincipal, numeroviap, numerovias, numerocasa, idtipoinmueble, idbloqueinterior, numeroinmueble, numerobloque }


        fetch(`http://localhost:5000/direccion/${iddireccion}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyDirec)

            });



        //Email inser

        for (var i = 0; i < this.state.emailAD.length; i++) {
            await this.hayEmail(idpersona, this.state.emailAD[i])
            if (!this.state.hayEmail) {

                var email = this.state.emailAD[i]
                const body = { email, idpersona }

                await fetch(`http://localhost:5000/email`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }
        }

        //Email Delet

        for (var i = 0; i < this.state.emailBAD.length; i++) {
            await this.hayEmail(idpersona, this.state.emailAD[i])
            if (this.state.hayEmail) {

                var email = this.state.emailBAD[i]

                await fetch(`http://localhost:5000/emaildel/${idpersona}/${email}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },

                    });
            }
        }

        //Tel Inser

        for (var i = 0; i < this.state.telAD.length; i++) {
            await this.hayTel(idpersona, this.state.telAD[i])
            if (!this.state.hayTel) {

                var telefono = this.state.telAD[i]
                const body = { telefono, idpersona }

                await fetch(`http://localhost:5000/telefono`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
            }
        }

        //Tel Delete

        for (var i = 0; i < this.state.telBAD.length; i++) {
            await this.hayTel(idpersona, this.state.telBAD[i])
            if (this.state.hayTel) {

                var telefono = this.state.telBAD[i]

                await fetch(`http://localhost:5000/teldel/${idpersona}/${telefono}`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },

                    });
            }
        }

        await Swal.fire({
            icon: 'success',
            title: `Se ha Actualizado el Doctor ${nombre} ${apellido}`,
            showConfirmButton: false,
            timer: 2000
        });

        this.cancelarActuD();
        window.location.reload();


    }

    // Hay Email y Tel

    async hayEmail(idp, email) {

        await fetch(`http://localhost:5000/emailhay/${idp}/${email}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        hayEmail: false
                    });
                } else {
                    this.setState({
                        hayEmail: true
                    });
                }
            });
    }

    async hayTel(idp, tel) {
        await fetch(`http://localhost:5000/telhay/${idp}/${tel}`)
            .then(response => response.json())
            .then(result => {
                if (result.length === 0) {
                    this.setState({
                        hayTel: false
                    });
                } else {
                    this.setState({
                        hayTel: true
                    });
                }
            });
    }

    //Cargar Datos ActuDoc

    async cargarDatosActuDoc() {
        const id = document.getElementById('docSelec').value;

        await fetch(`http://localhost:5000/doctorinfo/${id}`)
            .then(response => response.json())
            .then((result) => {

                this.setState({
                    nombreAD: result.nombre,
                    apellidoAD: result.apellido,
                    idenAD: result.numerodoc,
                    tipoD_AD: result.idtipo,
                    barrioAD: result.id_barrio,
                    uniAD: result.iduniversidad,
                    epsAD: result.ideps,
                    fechaAD: result.fechanaci.substr(0, 10),
                    idPerDoc: result.idpersona,

                });


            });

        await fetch(`http://localhost:5000/email/${this.state.idPerDoc}`)
            .then(response => response.json())
            .then((result) => {

                for (var i = 0; i < result.length; i++) {

                    this.setState({
                        emailAD: [...this.state.emailAD, result[i].email]
                    })
                }
            });



        await fetch(`http://localhost:5000/telefono/${this.state.idPerDoc}`)
            .then(response => response.json())
            .then((result) => {

                for (var i = 0; i < result.length; i++) {
                    this.setState({
                        telAD: [...this.state.telAD, result[i].telefono]
                    })
                }
            });

        await fetch(`http://localhost:5000/direccion/${this.state.idPerDoc}`)
            .then(response => response.json())
            .then((result) => {

                this.setState({
                    viaPD: result.idviaprincipal,
                    numViaPD: result.numeroviap,
                    numViaSD: result.numerovias,
                    numCasaD: result.numerocasa,
                    tipoInmD: result.idtipoinmueble,
                    comTipoInmD: result.numeroinmueble,
                    bloqueIntD: result.idbloqueinterior,
                    comBloqueIntD: result.numerobloque,
                    idDirecDoc: result.iddireccion,
                });


            });

    }



    // Eliminar Doctor

    async borrarDoctor() {
        const id = document.getElementById('docSelec').value;
        Swal.fire({
            title: 'Esta Seguro ?',
            text: "No se podra Recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`http://localhost:5000/doctor/${id}`, {
                    method: 'DELETE',
                    headers: { "Content-Type": "application/json" }
                })
                await Swal.fire({
                    icon: 'success',
                    title: `Se ha Eliminado el Doctor`,
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload();
            }
        })

    }


    // ---------------- Email --------------------

    async agregarEmail(x) {
        var { value: email } = await Swal.fire({
            title: 'Ingrese su Email',
            input: 'email',
            inputLabel: 'Su Correo Electronico es : ',
            showCancelButton: true,
            inputPlaceholder: 'Email'

        })
        if (email && x === 'D') {
            var corritos = this.state.emailAD
            corritos.push(email)
            this.setState({
                emailAD: corritos
            });

            Swal.fire(`Email Ingresado: ${email}`)
        }
        if (email === 'P') {
            var corritos = this.state.emailAD
            corritos.push(email)
            this.setState({
                emailAD: corritos
            });

            Swal.fire(`Email Ingresado: ${email}`)
        }
    }

    borrarEmailAD() {

        var valor = document.getElementById('emailAD').value;
        var corritos = []
        corritos.push(valor)
        this.setState({
            emailBAD: [...this.state.emailBAD, corritos],
            emailAD: this.state.emailAD.filter(mail => mail !== valor)
        });
    }


    // ---------------- Telefono --------------------


    tiene_letras(texto) {
        var letras = 'abcdefghyjklmnñopqrstuvwxyz!"}#$%&+)@.,-{/(=?¡';
        texto = texto.toLowerCase();
        for (var i = 0; i < texto.length; i++) {
            if (letras.indexOf(texto.charAt(i), 0) !== -1) {
                return false;
            }
        }
        return true;
    }
    async agregarTel(x) {
        var { value: tel } = await Swal.fire({
            title: 'Ingrese su Telefono',
            input: 'text',
            inputLabel: 'Su Telefono es : ',
            inputPlaceholder: 'Telefonos',
            showCancelButton: true,
            inputValidator: (value) => {
                return new Promise((resolve) => {
                    if ((value.length === 10 || value.length === 7) && this.tiene_letras(value)) {
                        resolve()
                    } else {
                        resolve('Debe tener 10(Celular) o 7(Fijo)  Digitos y estos deben ser Numeros')
                    }
                }

                )
            }
        })
        if (tel && tel.length <= 10 && x === 'D') {
            var corritos = this.state.telAD
            corritos.push(tel)
            this.setState({
                telAD: corritos
            });

            Swal.fire(`Telefono Ingresado: ${tel}`)
        }
        if (tel && tel.length <= 10 && x === 'P') {
            var corritos = this.state.telefonoAD
            corritos.push(tel)
            this.setState({
                telAD: corritos
            });

            Swal.fire(`Telefono Ingresado: ${tel}`)
        }
    }

    borrarTelAD() {
        var valor = document.getElementById('telAD').value;
        var corritos = []
        corritos.push(valor)
        this.setState({
            telBAD: [...this.state.telBAD, corritos],
            telAD: this.state.telAD.filter(tele => tele !== valor)
        });
    }

    // Validaciones y Modals

    async validaM(x) {

        const index = document.getElementById('persona').selectedIndex - 1;

        if (index >= 0) {
            await this.hayDoctor();
            await this.hayPaciente();

            if (x === 'P') {
                if (!this.state.haypac) {
                    this.modalPaciente();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Esta Persona ya es un Paciente.',
                    });
                }
            }
            else {
                if (!this.state.haydoc) {
                    this.modalDoctor();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Esta Persona ya es un Doctor.',
                    })
                }
            }
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione una Persona.',
            })
        }
    }

    async validaActuD(x) {
        const index = document.getElementById('docSelec').selectedIndex - 1;

        if (index >= 0 && x === 'A') {
            await this.cargarDatosActuDoc();
            this.modalActuD();
            document.getElementById('tipoD_AD').value = this.state.tipoD_AD;
            document.getElementById('barrioAD').value = this.state.barrioAD;
            document.getElementById('epsAD').value = this.state.epsAD;
            document.getElementById('uniAD').value = this.state.uniAD;
            document.getElementById('fechaAD').value = this.state.fechaAD;
            document.getElementById('viaPD').value = this.state.viaPD;
            if (this.state.tipoInmD !== null) {
                document.getElementById('tipoInmD').value = this.state.tipoInmD;
            }
            if (this.state.bloqueIntD !== null) {
                document.getElementById('bloqueIntD').value = this.state.bloqueIntD;
            }

        }
        else if (index >= 0 && x === 'D') {
            this.borrarDoctor();
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Seleccione un Doctor.',
            })
        }
    }

    validaInmBlo() {
        const tipoInm = document.getElementById('tipoInmD').selectedIndex;
        const comTipoInm = document.getElementById('comTipoInmD').value;
        const bloqueInt = document.getElementById('bloqueIntD').selectedIndex;
        const comBloqueInt = document.getElementById('comBloqueIntD').value;

        if (tipoInm === 0 && comTipoInm === '') {
            if (bloqueInt === 0 && comBloqueInt === '') {
                return true
            }
            else if (bloqueInt !== 0 && comBloqueInt !== '') {
                return true
            }
        }
        else if (tipoInm !== 0 && comTipoInm !== '') {
            if (bloqueInt === 0 && comBloqueInt === '') {
                return true
            }
            else if (bloqueInt !== 0 && comBloqueInt !== '') {
                return true
            }
        } else {
            return false
        }

    }

    // Valida Actu campos

    superValidacionActuDoc() {
        const nom = document.getElementById('nombreAD').value.trim();
        const apell = document.getElementById('apellidoAD').value.trim();
        const tipod = document.getElementById('tipoD_AD').selectedIndex;
        const doc = document.getElementById('idenAD').value.trim();
        const barr = document.getElementById('barrioAD').selectedIndex;
        const fecha = document.getElementById('fechaAD').value;
        const uni = document.getElementById('uniAD').selectedIndex;
        const eps = document.getElementById('epsAD').selectedIndex;
        const viaP = document.getElementById('viaPD').selectedIndex;
        const numViaP = document.getElementById('numViaPD').value;
        const numViaS = document.getElementById('numViaSD').value;
        const numCasa = document.getElementById('numCasaD').value;

        var ft = new Date(fecha)
        ft.setDate(ft.getDate() + 1);
        if (nom !== "" && nom.length <= 20) {
            document.getElementById('snombreAD').style.display = 'none';
            if (apell !== "" && apell.length <= 30) {
                document.getElementById('sapellidoAD').style.display = 'none';
                if (tipod !== 0) {
                    document.getElementById('stipoD_AD').style.display = 'none';
                    if (doc !== "" && doc.length <= 30) {
                        document.getElementById('sidenAD').style.display = 'none';
                        if (barr !== 0) {
                            document.getElementById('sbarrioAD').style.display = 'none';
                            if (ft <= new Date()) {
                                document.getElementById('sfechaAD').style.display = 'none';
                                if (uni !== 0) {
                                    document.getElementById('suniAD').style.display = 'none';
                                    if (eps !== 0) {
                                        document.getElementById('sepsAD').style.display = 'none';
                                        if (viaP !== 0 && numViaP !== '' && numViaS !== '' && numCasa !== '') {
                                            document.getElementById('sdireccion').style.display = 'none';
                                            if (this.validaInmBlo()) {
                                                document.getElementById('sinm').style.display = 'none';
                                                this.actuDoc();
                                            } else {
                                                document.getElementById('sinm').style.display = 'contents';
                                            }
                                        } else {
                                            document.getElementById('sdireccion').style.display = 'contents';
                                        }

                                    } else {
                                        document.getElementById('sepsAD').style.display = 'contents';
                                    }
                                } else {
                                    document.getElementById('suniAD').style.display = 'contents';
                                }
                            } else {
                                document.getElementById('sfechaAD').style.display = 'contents';
                            }

                        } else {
                            document.getElementById('sbarrioAD').style.display = 'contents';
                        }
                    } else {
                        document.getElementById('sidenAD').style.display = 'contents';
                    }
                } else {
                    document.getElementById('stipoD_AD').style.display = 'contents';
                }
            } else {
                document.getElementById('sapellidoAD').style.display = 'contents';
            }
        } else {
            document.getElementById('snombreAD').style.display = 'contents';
        }
    }


    //Validacion Paciente Campos

    validaPaci() {
        const numIP = document.getElementById('numIP').value.trim();
        const geoPLA = document.getElementById('geoPLA').value.trim();
        const geoPLO = document.getElementById('geoPLO').value.trim();
        const docSelP = document.getElementById('docSelP').selectedIndex;
        const ciudadP = document.getElementById('ciudadP').selectedIndex;

        if (numIP !== '') {
            document.getElementById('snumIP').style.display = 'none';
            if (geoPLA !== '' && geoPLO !== '') {
                document.getElementById('sgeo').style.display = 'none';
                if (docSelP !== 0) {
                    document.getElementById('sdocSelP').style.display = 'none';
                    if (ciudadP !== 0) {
                        document.getElementById('sciudadP').style.display = 'none';
                        this.crearPac();
                    } else {
                        document.getElementById('sciudadP').style.display = 'contents';
                    }
                } else {
                    document.getElementById('sdocSelP').style.display = 'contents';
                }
            } else {
                document.getElementById('sgeo').style.display = 'contents';
            }
        } else {
            document.getElementById('snumIP').style.display = 'contents';
        }
    }


    modalPaciente() {

        this.setState({
            modalInserP: !this.state.modalInserP
        });

    }
    modalDoctor() {
        this.setState({
            modalInserD: !this.state.modalInserD
        });
    }

    modalActuD() {
        this.setState({
            modalActuD: !this.state.modalActuD
        });
    }
    cancelarActuD() {
        this.modalActuD();
        this.setState({
            nombreAD: '',
            apellido: '',
            tipoD_AD: null,
            idenAD: '',
            barrioAD: null,
            fechaAD: null,
            emailAD: [],
            telAD: [],
            uniAD: null,
            epsAD: null,
            idPerDoc: null,
            emailBAD: [],
            hayEmail: false,
            viaPD: null,
            numViaPD: '',
            numViaSD: '',
            numCasaD: '',
            tipoInmD: null,
            comTipoInmD: '',
            bloqueIntD: null,
            comBloqueIntD: '',
            idDirecDoc: null,

        })
    }

    cancelarP() {
        this.modalPaciente();
        this.setState({
            numIP: null,
            geoPLA: '',
            geoPLO: '',
            docSelP: null,
            ciudadP: null,
        })
    }
    cancelarD() {

        this.setState({ universidad: '' })
        this.setState({ eps: '' })
        this.modalDoctor();
    }


    render() {
        return (
            <Fragment>
                <div className="total">
                    <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Crear Doctor o Paciente</h2></div>
                    <div className="conteneT pt-1 mt-3">
                        <div className="conteneA mt-3">
                            <div className="mt-3" >

                                <Form className="contenido pt-3 mt-3 " >

                                    <div className="form pt-2 mt-2 mb-2 "  >
                                        <h4 className="ml-3 mr-3 mt-3 font-weight-bold">Crear</h4>
                                        <Label className="mt-4 font-weight-bold">Seleccione la Persona de la base de datos :</Label>

                                        <FormGroup className="selP ml-3 mr-3 mt-2 mb-3" >


                                            <Input className="mt-4" id="persona"

                                                className="form-control"
                                                name="persona"
                                                type="select"
                                                bsSize="md"

                                                onChange={this.handleChange} >
                                                <option selected="true" disabled="disabled">Personas</option>
                                                {this.state.personas.map(per => (
                                                    <option value={per.idpersona}>
                                                        {per.nombre}  {per.apellido} - {per.numerodoc}
                                                    </option>
                                                ))}

                                            </Input>


                                        </FormGroup>

                                        <div className="footer mt-3 mb-4">
                                            <Button className="mb-3 mr-2" size="lg" color='primary' onClick={() => this.validaM('P')} >
                                                Crear Paciente <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                                            </Button>
                                            <Button className="mb-3" size="lg" color='primary' onClick={() => this.validaM('D')} >
                                                Crear Doctor <i class="fa fa-user-md" aria-hidden="true"></i>
                                            </Button>
                                            <CrearPersona className="mb-4" />
                                        </div>

                                    </div>
                                </Form>
                            </div>
                            <div className="formD mt-4 ">
                                <div className="inputsFA mb-4">
                                    <h4 className="ml-3 mr-3 mt-4 mb-3 font-weight-bold">Actualizar o Borrar</h4>

                                    <FormGroup className="selP inputF mb-3 ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Pacientes: </Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" ><i class="fa fa-wrench" /></Button>
                                                    <Button color="primary" ><i class="fa fa-trash-o " /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input id="pacientesSelec"

                                                className="form-control"
                                                name="pacientesSelec"
                                                type="select"
                                                bsSize="md"

                                                selectedIndex={this.state.selecpa}
                                            >
                                                <option selected="true" disabled="disabled">Pacientes</option>



                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup className="selP inputF mb-3 ml-3 mr-3 mt-3 ">
                                        <Label className="font-weight-bold"> Lista de Doctores: </Label>
                                        <InputGroup>

                                            <Input id="docSelec"

                                                className="form-control"
                                                name="docSelec"
                                                type="select"
                                                bsSize="md"

                                                selectedIndex={this.state.selecdoc}
                                            >
                                                <option selected="true" disabled="disabled">Doctores</option>
                                                {this.state.listDoc.map(doc => (
                                                    <option value={doc.iddoctor}>
                                                        {doc.nombre} {doc.apellido} - {doc.numerodoc}
                                                    </option>
                                                ))}

                                            </Input>

                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.validaActuD('A')}><i class="fa fa-wrench" /></Button>
                                                    <Button color="primary" onClick={() => this.validaActuD('D')}><i class="fa fa-trash-o " /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </FormGroup>



                                </div>

                            </div>

                        </div>



                    </div>
                </div>

                {/* Modal Crear Paciente */}
                <Modal
                    size="md"
                    centered isOpen={this.state.modalInserP} id="insertar">
                    <ModalHeader>
                        <div><h3>Crear Paciente</h3></div>
                    </ModalHeader>
                    <ModalBody>

                        <Form>
                            <div id="regisM" className="contRegisM">
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="numIP"
                                            placeholder="Num Integrantes"
                                            className="form-control"
                                            name="numIP"
                                            bsSize="md"
                                            type="number"
                                            value={this.state.numIP}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="snumIP">Debe Ingresar un # de Integrantes</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Label className="font-weight-bold">Geolocalización</Label>
                                        <InputGroup>
                                            <Input id="geoPLA"
                                                placeholder="Latitud"
                                                className="form-control mr-1"
                                                name="geoPLA"
                                                bsSize="md"
                                                type="text"
                                                value={this.state.geoPLA}
                                                onChange={this.handleChange} />

                                            <Input id="geoPLO"
                                                placeholder="Longitud"
                                                className="form-control"
                                                name="geoPLO"
                                                bsSize="md"
                                                type="text"
                                                value={this.state.geoPLO}
                                                onChange={this.handleChange} />
                                        </InputGroup>
                                    </FormGroup>
                                    <p>Si no Conoce la Geolocalización <a href='https://www.google.com.co/maps/place/Cali,+Valle+del+Cauca/@3.395397,-76.6657539,11z/data=!3m1!4b1!4m5!3m4!1s0x8e30a6f0cc4bb3f1:0x1f0fb5e952ae6168!8m2!3d3.4516467!4d-76.5319854?hl=es&authuser=0' target='_blank' >Google Maps</a></p>
                                    <span className="span" id="sgeo">Debe Ingresar La Latitud y la Longitud</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup className="">
                                        <Label className="font-weight-bold"> Lista de Doctores: </Label>

                                        <Input id="docSelP"

                                            className="form-control"
                                            name="docSelP"
                                            type="select"
                                            bsSize="md"
                                            value={this.state.docSelP}
                                            onChange={this.handleChange}

                                        >
                                            <option selected="true" disabled="disabled">Doctores</option>
                                            {this.state.listDoc.map(doc => (
                                                <option value={doc.iddoctor}>
                                                    {doc.nombre} {doc.apellido} - {doc.numerodoc}
                                                </option>
                                            ))}

                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="sdocSelP">Debe Seleccionar un Doctor</span>
                                </div>

                                <div className="mb-3">
                                    <FormGroup className="">
                                        <Label className="font-weight-bold"> Ciudad de Contagio: </Label>

                                        <Input id="ciudadP"

                                            className="form-control"
                                            name="ciudadP"
                                            type="select"
                                            bsSize="md"
                                            value={this.state.ciudadP}
                                            onChange={this.handleChange}

                                        >
                                            <option selected="true" disabled="disabled">Ciudades</option>
                                            {this.state.selCiudades.map(ciu => (
                                                <option value={ciu.idciudad}>
                                                    {ciu.ciudad}
                                                </option>
                                            ))}


                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="sciudadP">Debe Seleccionar una Ciudad</span>
                                </div>

                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="success" onClick={() => this.validaPaci()} >Crear</Button>
                        <Button color="danger" onClick={() => this.cancelarP()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>


                {/* Modal Crear Doctor */}
                <Modal
                    size="md"
                    centered isOpen={this.state.modalInserD} id="insertar">
                    <ModalHeader>
                        <div><h3>Crear Doctor</h3></div>
                    </ModalHeader>
                    <Form>
                        <ModalBody>

                            <FormGroup className=" mb-3 ml-3 mr-3 mt-3 ">
                                <Label className="font-weight-bold"> Universidad: </Label>
                                <InputGroup>

                                    <Input id="universidad"

                                        className="form-control"
                                        name="universidad"
                                        type="select"
                                        bsSize="md"
                                        onChange={this.handleChange}

                                    >
                                        <option selected="true" disabled="disabled">Universidad</option>
                                        {this.state.universidades.map(uni => (
                                            <option value={uni.iduniversidad}>
                                                {uni.nombreuni}
                                            </option>
                                        ))}

                                    </Input>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup className=" mb-3 ml-3 mr-3 mt-3 ">
                                <Label className="font-weight-bold"> Eps: </Label>
                                <InputGroup>

                                    <Input id="eps"

                                        className="form-control"
                                        name="eps"
                                        type="select"
                                        bsSize="md"
                                        onChange={this.handleChange}
                                        selectedIndex={this.state.eps}
                                    >
                                        <option selected="true" disabled="disabled">Eps</option>
                                        {this.state.epss.map(ep => (
                                            <option value={ep.ideps}>
                                                {ep.nombreeps}
                                            </option>
                                        ))}

                                    </Input>
                                </InputGroup>
                            </FormGroup>

                        </ModalBody>
                        <ModalFooter >
                            <Button color="success" onClick={() => this.crearDoctor()} >Crear Doctor</Button>
                            <Button color="danger" onClick={() => this.cancelarD()}>Cancelar</Button>
                        </ModalFooter>
                    </Form>
                </Modal>

                {/* Modal Actu Doc */}

                <Modal
                    size="md"
                    centered isOpen={this.state.modalActuD} id="insertar">
                    <ModalHeader>
                        <div><h3>Actualizar Doctor</h3></div>
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <div id="regisM" className="contRegisM">
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="nombreAD"
                                            placeholder="Nombre"
                                            className="form-control"
                                            name="nombreAD"
                                            bsSize="md"
                                            type="text"
                                            value={this.state.nombreAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="snombreAD">Debe Ingresar un Nombre</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >

                                        <Input id="apellidoAD"
                                            placeholder="Apellido"
                                            className="form-control"
                                            name="apellidoAD"
                                            type="text"
                                            bsSize="md"
                                            value={this.state.apellidoAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="sapellidoAD">Debe Ingresar un Apellido</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="tipoD_AD"
                                            className="form-control"
                                            name="tipoD_AD"
                                            type="select"
                                            bsSize="md"
                                            onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Tipo de Documento</option>

                                            {this.state.tiposDOC.map(tipo => (

                                                <option value={tipo.idtipo}>
                                                    {tipo.tipodocument}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="stipoD_AD">Seleccione un Tipo de Documento valido</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >

                                        <Input id="idenAD"
                                            placeholder="Identificación"
                                            className="form-control"
                                            name="idenAD"
                                            type="text"
                                            bsSize="md"
                                            value={this.state.idenAD}
                                            onChange={this.handleChange} />
                                    </FormGroup>
                                    <span className="span" id="sidenAD">Debe Ingresar una Identificación Valida</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <Input id="barrioAD"
                                            placeholder="Barrio"
                                            className="form-control"
                                            name="barrioAD"
                                            type="select"
                                            bsSize="md"
                                            selectedIndex={this.state.barrioAD}
                                            onChange={this.handleChange}>
                                            <option selected="true" disabled="disabled">Barrios</option>
                                            {this.state.barrios.map(bar => (
                                                <option value={bar.id_barrio}>
                                                    {bar.nombre}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                    <span className="span" id="sbarrioAD">Seleccione un Barrio</span>
                                </div>

                                <div className="mb-3" >
                                    <FormGroup  >
                                        <div className="mensaje">
                                            <p className="oculto">Fecha de Nacimiento</p>
                                            <Input
                                                id="fechaAD"
                                                placeholder="date placeholder"
                                                className="form-control"
                                                name="fechaAD"
                                                bsSize="md"
                                                type="date"
                                                value={this.state.fechaN}
                                                onChange={this.handleChange}
                                            /> </div></FormGroup>
                                    <span className="span" id="sfechaAD">Debe Ingresar una Fecha Valida</span>
                                </div>
                                <div>
                                    <FormGroup className=" mb-3   mt-3 ">

                                        <InputGroup>

                                            <Input id="uniAD"

                                                className="form-control"
                                                name="uniAD"
                                                type="select"
                                                bsSize="md"
                                                onChange={this.handleChange}

                                            >
                                                <option selected="true" disabled="disabled">Universidad</option>
                                                {this.state.universidades.map(uni => (
                                                    <option value={uni.iduniversidad}>
                                                        {uni.nombreuni}
                                                    </option>
                                                ))}

                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <span className="span" id="suniAD">Seleccione una Universidad</span>
                                </div>
                                <div>
                                    <FormGroup className=" mb-3  mt-3 ">

                                        <InputGroup>

                                            <Input id="epsAD"

                                                className="form-control"
                                                name="epsAD"
                                                type="select"
                                                bsSize="md"
                                                onChange={this.handleChange}
                                                selectedIndex={this.state.epsAD}
                                            >
                                                <option selected="true" disabled="disabled">Eps</option>
                                                {this.state.epss.map(ep => (
                                                    <option value={ep.ideps}>
                                                        {ep.nombreeps}
                                                    </option>
                                                ))}

                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                    <span className="span" id="sepsAD">Seleccione una Entidad de Salud</span>
                                </div>
                                <div className="mb-3">
                                    <FormGroup  >
                                        <div className="mensajeD">
                                            <p className="ocultoD">Dirección</p>
                                            <InputGroup>
                                                <InputGroupAddon addonType="prepend">
                                                    <Input id="viaPD"

                                                        className="form-control bg-primary  text-white font-weight-bold"
                                                        name="viaPD"
                                                        type="select"
                                                        bsSize="md"
                                                        selectedIndex={this.state.viaPD}
                                                        onChange={this.handleChange}>
                                                        <option selected="true" disabled="disabled">Via Principal</option>
                                                        {this.state.selViaP.map(via => (
                                                            <option value={via.idviaprincipal}>
                                                                {via.nombrevia}
                                                            </option>
                                                        ))}
                                                    </Input>
                                                </InputGroupAddon>
                                                <Input id="numViaPD"

                                                    className="form-control"
                                                    name="numViaPD"
                                                    type="text"
                                                    bsSize="md"
                                                    value={this.state.numViaPD}
                                                    onChange={this.handleChange} />
                                                <h4 className='ml-1 mr-1 mt-1'> # </h4>
                                                <Input id="numViaSD"

                                                    className="form-control"
                                                    name="numViaSD"
                                                    type="text"
                                                    bsSize="md"
                                                    value={this.state.numViaSD}
                                                    onChange={this.handleChange} />
                                                <h4 className='ml-1 mr-1 mt-1'> -  </h4>
                                                <Input id="numCasaD"

                                                    className="form-control"
                                                    name="numCasaD"
                                                    type="text"
                                                    bsSize="md"
                                                    value={this.state.numCasaD}
                                                    onChange={this.handleChange} />
                                            </InputGroup>
                                        </div>
                                    </FormGroup>
                                    <span className="span" id="sdireccion">Debe Ingresar una Direccion Valida</span>
                                </div>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Input
                                                    id="tipoInmD"
                                                    type="select"

                                                    className="form-control bg-primary  text-white font-weight-bold"
                                                    name="tipoInmD"
                                                    bsSize="md"
                                                    selectedIndex={this.state.tipoInmD}
                                                    onChange={this.handleChange}
                                                >
                                                    <option>Tipo de Inmueble</option>
                                                    {this.state.selTipoInm.map(inm => (
                                                        <option value={inm.idtipoinmueble}>
                                                            {inm.nombreinmueble}
                                                        </option>
                                                    ))}

                                                </Input>
                                            </InputGroupAddon>
                                            <Input id="comTipoInmD"
                                                placeholder='Num'
                                                className="form-control"
                                                name="comTipoInmD"
                                                type="text"
                                                bsSize="md"
                                                value={this.state.comTipoInmD}
                                                onChange={this.handleChange} />

                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Input
                                                    id="bloqueIntD"
                                                    type="select"

                                                    className="form-control bg-primary  text-white font-weight-bold"
                                                    name="bloqueIntD"
                                                    bsSize="md"
                                                    selectedIndex={this.state.bloqueIntD}
                                                    onChange={this.handleChange}

                                                >
                                                    <option>Bloque o Interior</option>
                                                    {this.state.selBloqueInt.map(blo => (
                                                        <option value={blo.idbloqueinterior}>
                                                            {blo.nombrebloqueoint}
                                                        </option>
                                                    ))}

                                                </Input>
                                            </InputGroupAddon>
                                            <Input id="comBloqueIntD"
                                                placeholder='Num'
                                                className="form-control"
                                                name="comBloqueIntD"
                                                type="text"
                                                bsSize="md"
                                                value={this.state.comBloqueIntD}
                                                onChange={this.handleChange} />
                                        </InputGroup>
                                    </FormGroup>
                                    <span className="span" id="sinm">No debe dejar Campos Incompletos</span>
                                </div>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.agregarEmail('D')}><i class="fa fa-plus" /></Button>
                                                    <Button color="primary" onClick={() => this.borrarEmailAD()}><i class="fa fa-minus" /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input
                                                id="emailAD"
                                                type="select"
                                                placeholder="Email"
                                                className="form-control"
                                                name="emailAD"
                                                bsSize="md"

                                            >
                                                <option>Email</option>
                                                {this.state.emailAD.map(mail => (
                                                    <option >
                                                        {mail}
                                                    </option>
                                                ))}
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                <div className="mb-3" >
                                    <FormGroup >
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <ButtonGroup>
                                                    <Button color="primary" onClick={() => this.agregarTel('D')}><i class="fa fa-plus" /></Button>
                                                    <Button color="primary" onClick={() => this.borrarTelAD()}><i class="fa fa-minus" /></Button>
                                                </ButtonGroup>
                                            </InputGroupAddon>
                                            <Input
                                                id="telAD"
                                                placeholder="Telefono"
                                                className="form-control"
                                                name="telAD"
                                                bsSize="md"
                                                type="select">

                                                <option>Telefonos</option>
                                                {this.state.telAD.map(tel => (
                                                    <option >
                                                        {tel}
                                                    </option>
                                                ))}
                                            </Input>
                                        </InputGroup>
                                    </FormGroup>
                                </div>


                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter >
                        <Button color="success" onClick={() => this.superValidacionActuDoc()} >Actualizar</Button>
                        <Button color="danger" onClick={() => this.cancelarActuD()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </Fragment >
        );
    }

}