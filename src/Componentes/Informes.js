import React from 'react';
import './InterfazDoc/style.scss';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell, Sector, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const datas = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];
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
      edades: []

    };


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

  render() {
    return (
      <div className="total">

        <div className="header mt-2 text-center " id="login"><h2 className="Titulo m-2 " >Informes</h2></div>

        <div className="conteneT mt-2">


          <h4 className="text-center mb-2" >Contagiados por Barrio</h4>
          <ResponsiveContainer height='85%'>
            <PieChart width={800} height={800} className="col-5 mt-4">

              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.data01}
                cx='50%'
                cy='50%'
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
          </ResponsiveContainer>




          <div style={{ display: 'none' }}>
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

        </div>




      </div>
    );
  }
}