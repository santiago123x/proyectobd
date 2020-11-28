import React, { Fragment } from 'react';
import './style.scss';
import { FormGroup, Table, Button, Form, Input, Label } from 'reactstrap';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';





export default class Medicamentos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Medicamento 1
      med1: '',
      med1lab1: null,
      med1lab2: null,
      med1lab3: null,
      med1lab4: null,
      totalMed1: null,
      //Medicamento 2
      med2: '',
      med2lab1: null,
      med2lab2: null,
      med2lab3: null,
      med2lab4: null,
      totalMed2: null,
      //Medicamento 3
      med3: '',
      med3lab1: null,
      med3lab2: null,
      med3lab3: null,
      med3lab4: null,
      totalMed2: null,
      //
      cantidad: null,
      descontar: null,

      inven: [],

    }
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await fetch(`/stock`)
      .then(response => response.json())
      .then((result) => {
        this.setState({
          med1: result[0].medicamento,
          med1lab1: result[0].cantidad,
          med1lab2: result[1].cantidad,
          med1lab3: result[2].cantidad,
          med1lab4: result[3].cantidad,
          med2: result[4].medicamento,
          med2lab1: result[4].cantidad,
          med2lab2: result[5].cantidad,
          med2lab3: result[6].cantidad,
          med2lab4: result[7].cantidad,
          med3: result[8].medicamento,
          med3lab1: result[8].cantidad,
          med3lab2: result[9].cantidad,
          med3lab3: result[10].cantidad,
          med3lab4: result[11].cantidad,
        });

        const total1 = this.state.med1lab1 + this.state.med1lab2 + this.state.med1lab3 + this.state.med1lab4
            this.setState({
              totalMed1: total1
            });
            const total2 = this.state.med2lab1 + this.state.med2lab2 + this.state.med2lab3 + this.state.med2lab4
            this.setState({
              totalMed2: total2
            });
            const total3 = this.state.med3lab1 + this.state.med3lab2 + this.state.med3lab3 + this.state.med3lab4

            this.setState({
              totalMed3: total3
            });
            let matrix = [];
            var x = 0;
            for (var i = 0; i < 3; i++) {
              let fila = [];
              for (var j = 0; j < 4; j++) {
                fila[j]= result[x].cantidad;
                x++
              }
              matrix[i] = fila;
            }
            this.setState({
              inven: matrix
            });
      });

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  async validaCantidad() {
    const medi = document.getElementById('medi').selectedIndex;
    const lab = document.getElementById('labo').selectedIndex;
    if (medi != 0) {
      if (lab != 0) {
        if (this.state.cantidad != null) {
          const medica = medi - 1
          const labo = lab - 1
          var exis = this.state.inven[medica][labo];
          const des = exis - this.state.cantidad;
          if (des >= 0){
            return true
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay Existencias Suficientes para realizar la Reserva.',
          })
          return false
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ingrese La Cantidad a Reservar.',
          })
          return false
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Seleccione el Laboratorio donde desea Reservar.',
        })
        return false
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione el Medicamento a Reservar.',
      })
      return false
    }
  }

  async descontar() {
    var x = await this.validaCantidad();
    if (x) {
      var cant = this.state.cantidad
      var idmed = document.getElementById('medi').selectedIndex 
      var idlab = document.getElementById('labo').selectedIndex
      var iddoc = this.props.idDoc
      var med = null

      if (idmed === 1) {
        med = this.state.med1
      }
      else if (idmed === 2) {
        med = this.state.med2
      }
      else if (idmed === 3) {
        med = this.state.med3
      }

      const body = { iddoc, idmed, cant, idlab }

      await fetch(`/pedido`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        })

      await Swal.fire({
        icon: 'success',
        title: `Se ha Realizado la Reserva de ${this.state.cantidad}`,
        text: `De ${med} del Lab#${idlab}`,
        showConfirmButton: false,
        timer: 2000
      })

      this.setear();
      this.componentDidMount();

    }
  }

  setear() {

    document.getElementById('op').selected = 'true';
    document.getElementById('opo').selected = 'true';
    document.getElementById('cantidad').value = null;

    this.setState({
      cantidad: null,
      descontar: null,

    })
  }

  render() {
    return (
      <Fragment >
        <div className="total">

          <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Medicamentos</h2></div>

          <div className="conteneTabla ">
            <div className='contieneTabla'>

              <div className='soli'>
                <div className='soliLabel'>
                  <Label className='font-weight-bold'>Solicitar Medicamentos</Label>
                </div>
                <Form>

                  <FormGroup className='soliM'>
                    <Input
                      id='medi'
                      type='select'
                      name='medi'

                    >
                      <option id='op' selected="true" disabled="disabled">Medicamentos</option>
                      <option >{this.state.med1}</option>
                      <option >{this.state.med2}</option>
                      <option >{this.state.med3}</option>

                    </Input>
                  </FormGroup>
                  <FormGroup className='soliL'>
                    <Input
                      id='labo'
                      name='labo'
                      type='select'
                    >
                      <option id='opo' selected="true" disabled="disabled">Laboratorios</option>
                      <option >Laboratorio #1</option>
                      <option >Laboratorio #2</option>
                      <option >Laboratorio #3</option>
                      <option >Laboratorio #4</option>
                    </Input>
                  </FormGroup>
                  <FormGroup className='soliL'>
                    <Input
                      id='cantidad'
                      type='number'
                      name='cantidad'
                      placeholder='Cantidad'
                      className="form-control"
                      value={this.state.cantidad}
                      onChange={this.handleChange}
                    >


                    </Input>
                  </FormGroup>
                  <Button className='soliB font-weight-bold' size="md" onClick={() => this.descontar()} color='primary'>Solicitar</Button>
                </Form>
              </div>
              <Table className='tabla text-center' striped bordered hover>
                <thead>
                  <tr>
                    <th className='font-weight-bold'>Medicamentos</th>
                    <th className='font-weight-bold'>Laboratorio # 1</th>
                    <th className='font-weight-bold'>Laboratorio # 2</th>
                    <th className='font-weight-bold'>Laboratorio # 3</th>
                    <th className='font-weight-bold'>Laboratorio # 4</th>
                    <th className='font-weight-bold'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='font-weight-bold'>{this.state.med1}</td>
                    <td>{this.state.med1lab1}</td>
                    <td>{this.state.med1lab2}</td>
                    <td>{this.state.med1lab3}</td>
                    <td>{this.state.med1lab4}</td>
                    <td>{this.state.totalMed1}</td>
                  </tr>
                  <tr>
                    <td className='font-weight-bold'>{this.state.med2}</td>
                    <td>{this.state.med2lab1}</td>
                    <td>{this.state.med2lab2}</td>
                    <td>{this.state.med2lab3}</td>
                    <td>{this.state.med2lab4}</td>
                    <td>{this.state.totalMed2}</td>
                  </tr>
                  <tr>
                    <td className='font-weight-bold'>{this.state.med3}</td>
                    <td>{this.state.med3lab1}</td>
                    <td>{this.state.med3lab2}</td>
                    <td>{this.state.med3lab3}</td>
                    <td>{this.state.med3lab4}</td>
                    <td>{this.state.totalMed3}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>





        </div>
      </Fragment>
    );
  }
}
