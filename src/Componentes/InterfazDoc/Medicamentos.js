import React, { Fragment } from 'react';
import './style.scss';
import { FormGroup, Table, Button, Form, Input, Label } from 'reactstrap';





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
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        await fetch(`http://localhost:5000/inventario2`)
            .then(response => response.json())
            .then((result) => {

                for (var i = 0; i < result.length; i++) {
                    if (result[i].idmedicamento === 1) {
                        this.setState({
                            med1: result[i].medicamento,
                            med1lab1: result[i].lab1,
                            med1lab2: result[i].lab2,
                            med1lab3: result[i].lab3,
                            med1lab4: result[i].lab4,


                        })
                        const total = this.state.med1lab1 + this.state.med1lab2 + this.state.med1lab3 + this.state.med1lab4
                        this.setState({
                            totalMed1: total
                        })
                    }
                    else if (result[i].idmedicamento === 2) {
                        this.setState({
                            med2: result[i].medicamento,
                            med2lab1: result[i].lab1,
                            med2lab2: result[i].lab2,
                            med2lab3: result[i].lab3,
                            med2lab4: result[i].lab4,


                        });
                        const total = this.state.med2lab1 + this.state.med2lab2 + this.state.med2lab3 + this.state.med2lab4
                        this.setState({
                            totalMed2: total
                        })
                    }
                    else if (result[i].idmedicamento === 3) {
                        this.setState({
                            med3: result[i].medicamento,
                            med3lab1: result[i].lab1,
                            med3lab2: result[i].lab2,
                            med3lab3: result[i].lab3,
                            med3lab4: result[i].lab4,

                        })
                        const total = this.state.med3lab1 + this.state.med3lab2 + this.state.med3lab3 + this.state.med3lab4

                        this.setState({
                            totalMed3: total
                        })
                    }
                }
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
                                            <option selected="true" disabled="disabled">Medicamentos</option>
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
                                            <option selected="true" disabled="disabled">Laboratorios</option>
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
                                    <Button className='soliB font-weight-bold' size="md" color='primary'>Solicitar</Button>
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
                                        <td >{this.state.med1lab1}</td>
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
