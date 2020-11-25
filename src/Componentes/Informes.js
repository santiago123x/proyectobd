import React from 'react';
import { Button, Modal, ModalBody, FormGroup, InputGroup, Input, InputGroupAddon, Table, Collapse, Card, CardBody, ModalHeader, ModalFooter } from 'reactstrap';
import './InterfazDoc/style.scss';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Sector, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" className="font-weight-bold" font-size='23' fill="black"> {payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" className="font-weight-bold">{`Contagiados: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#555" className="font-weight-bold">
        {`(Promedio: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default class Informes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      barrios: [],
      data01: [],
      color: null,
      color2: [],
      edades: [],
      modalInser: true,
      visitas: [],
      visi: null,
      fechavisi: null,
      modal: false,
      obs: '',


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

  toggle(y) {
    /*
    const x = document.getElementById(y).style.display
    if (x === 'none') {
      document.getElementById(y).style.display = 'contents'
    }
    else {
      document.getElementById(y).style.display = 'none'
    }*/
    const observacion = y;
    this.setState({
      modal: !this.state.modal,
      obs: observacion
    })
  }

  cerrarM() {
    this.setState({
      modal: !this.state.modal,
      obs: '',
    })
  }

  colorRamdo() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    randomColor = "#" + ("000000" + randomColor).slice(-6);
    return randomColor;
  }



  color() {
    var color = Math.floor(Math.random() * 16777215).toString(16);
    color = "#" + ("000000" + color).slice(-6);
    color = `"background-color: ${color};"`;
    console.log(color);
    return color;
  }

  async visitas() {
    var fecha = this.state.fechavisi;
    var visita = this.state.visi;

    if (fecha !== null) {
      var anio = fecha.substr(0, 4);
      var mes = fecha.substr(5, 2);
      var dia = fecha.substr(8, 2);

      if (visita === '1') {

        await fetch(`http://localhost:5000/visxanio/${anio}/`)
          .then(res => res.json())
          .then(
            (result) => {
              console.log(result)
              this.setState({
                visitas: result
              });
            }
          )

      } else if (visita === '2') {

        await fetch(`http://localhost:5000/visxmes/${anio}/${mes}/`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                visitas: result
              });
            }
          )
      } else if (visita === '3') {

        await fetch(`http://localhost:5000/visxdia/${anio}/${mes}/${dia}/`)
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                visitas: result
              });
            }
          )
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Seleccione una opcion de busqueda',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione una fecha',
      })
    }

  }

  async componentDidMount() {

    await fetch(`http://localhost:5000/contxbarrio/`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            barrios: result
          });
        }
      )

    await fetch(`http://localhost:5000/pacxed/`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            edades: result
          });
        }
      )


    for (var i = 0; i < this.state.barrios.length; i++) {

      const barrio = {
        name: `${this.state.barrios[i].nombre}`,
        value: parseInt(this.state.barrios[i].count)
      }
      this.setState({
        data01: [...this.state.data01, barrio]
      }
      )
      this.setState({
        color2: [...this.state.color2, this.colorRamdo()]
      })
    }

    this.setState({
      color: this.colorRamdo()
    })

    console.log(this.state.color2)





  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  mostrarCPB() {
    document.getElementById('edades').style.display = 'none';
    document.getElementById('visitas').style.display = 'none';
    document.getElementById('pie').style.display = 'inline-block';

  }
  mostrarED() {
    document.getElementById('pie').style.display = 'none';
    document.getElementById('visitas').style.display = 'none';
    document.getElementById('edades').style.display = 'inline-block';

  }
  mostrarVI() {
    document.getElementById('pie').style.display = 'none';
    document.getElementById('edades').style.display = 'none';
    document.getElementById('visitas').style.display = 'inline-block';
  }
  render() {
    return (
      <div className="total">

        <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Informes</h2></div>

        <div className="conteneTI mt-2 text-center">
          <div className="btn-group-lg  pt-3 " role="group" aria-label="Basic example">
            <Button type="button" onClick={() => this.mostrarCPB()} className='mr-1 font-weight-bold' color="primary">Contagios por Barrio</Button>
            <Button type="button" onClick={() => this.mostrarED()} className='mr-1 font-weight-bold' color="primary">Contagios por edad</Button>
            <Button type="button" onClick={() => this.mostrarVI()} className='font-weight-bold' color="primary">Visitas Doctores</Button>
          </div>





          <div className='pie' id='pie'>
            <h4 className="text-center mb-2 mt-2 font-weight-bold" >Contagiados por Barrio</h4>

            <PieChart width={800} height={800} className="pr-2">

              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.data01}
                cx='50%'
                cy='35%'
                innerRadius={160}
                outerRadius={220}
                fill={this.colorRamdo()}
                dataKey="value" nameKey="name"
                onMouseEnter={this.onPieEnter}
              >
                {
                  this.state.data01.map((entry, index) => <Cell key={`cell-${index}`} fill={this.state.color2[index]} />)
                }
              </Pie>

            </PieChart>

          </div>




          <div style={{ display: 'none' }} id='edades'>
            <h4 className="text-center mb-5 mt-2 font-weight-bold" >Contagiados por Edad</h4>
            <AreaChart
              width={500}
              height={400}
              data={this.state.edades}
              margin={{
                top: 10, right: 30, left: 0, bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="anio" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="personas" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>

          <div style={{ display: 'none' }} id='visitas'>
            <h4 className="text-center mb-5 mt-2 font-weight-bold" >Informes de Visitas</h4>
            <FormGroup >
              <div className='row justify-content-md-center'>


                <InputGroup className='col-7' style={{ width: '50%' }}>
                  <Input id="visi"
                    className="form-control"
                    name="visi"
                    type="select"
                    bsSize="md"
                    value={this.state.visi}
                    onChange={this.handleChange}>

                    <option selected="true" disabled="disabled">Tipo de Busqueda</option>
                    <option value='1'>Por Año</option>
                    <option value='2'>Por Mes</option>
                    <option value='3'>Por Dia</option>

                  </Input>
                  <Input id="fechavisi"
                    className="form-control"
                    name="fechavisi"
                    type="date"
                    bsSize="md"
                    value={this.state.fechavisi}
                    onChange={this.handleChange}>


                  </Input>

                  <InputGroupAddon addonType="prepend">

                    <Button color="primary" onClick={() => this.visitas()}><i className="fa fa-search" aria-hidden="true"></i></Button>

                  </InputGroupAddon>
                </InputGroup>
              </div>
            </FormGroup>
            <Table className=' text-center' striped bordered hover>
              <thead>
                <tr id='tr-info'>
                  <th className='font-weight-bold'>Paciente</th>
                  <th className='font-weight-bold'>Doctor</th>
                  <th className='font-weight-bold'>Medicamento</th>
                  <th className='font-weight-bold'>Temperatura</th>
                  <th className='font-weight-bold'>Fecha</th>
                  <th className='font-weight-bold'>Hora</th>
                  <th className='font-weight-bold'>Observaciones</th>


                </tr>
              </thead>
              <tbody>
                {this.state.visitas.map((vis, index) => (
                  <tr className='font-weight-bold'>
                    <td>{vis.nombrepac}{' '}{vis.apellidopac}</td>
                    <td>{vis.nombredoc}{' '}{vis.apellidodoc}</td>
                    <td>{vis.medicamento}</td>
                    <td>{vis.temperatura}</td>
                    <td>{vis.to_char}</td>
                    <td>{vis.hora}</td>
                    <td> <Button onClick={() => this.toggle(vis.observaciones)} type="button">
                      <i className="fa fa-commenting" aria-hidden="true"></i>
                    </Button>

                    </td>


                  </tr>
                ))}



              </tbody>
            </Table>

            <Modal centered isOpen={this.state.modal} >
              <ModalHeader >
                Observaciones
              </ModalHeader>
              <ModalBody className='text-center text-justify'>
                {this.state.obs}
              </ModalBody>

              <ModalFooter>
                <Button onClick={() => this.cerrarM()} color='danger' type="button">Cerrar</Button>

              </ModalFooter>

            </Modal>
          </div>

        </div>




      </div>
    );
  }
}