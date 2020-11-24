import React from 'react';
import { Button, Modal, ModalBody, FormGroup, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
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
    var anio = '';
    var mes = '';
    var dia = '';

    if (document.getElementById('visitas').value === 1) {
      const body = { anio }
      await fetch(`http://localhost:5000/visxanio/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              barrios: result
            });
          }
        )
    } else if (document.getElementById('visitas').value === 2) {
      const body = { anio, mes }
      await fetch(`http://localhost:5000/visxmes/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              barrios: result
            });
          }
        )
    } else if (document.getElementById('visi').value === 3) {
      const body = { anio, mes, dia }
      await fetch(`http://localhost:5000/visxdia/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              barrios: result
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
            <FormGroup  >
              <InputGroup>
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

                  <Button color="primary" onClick={}><i class="fa fa-plus" /></Button>

                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </div>

        </div>




      </div>
    );
  }
}