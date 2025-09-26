// ItemAluguel.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'



const FormContrato = () => {

    return (
        <div className="container-fluid">
                <Card className='m-4'>
                    <Card.Header>Contrato: </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nome do Contratante:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Endereço:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Número:</Form.Label>
                                <Form.Control type="text" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Bairro:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>
                                    <Form.Label>Lista de Brinquedo:</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option value="1">Pix</option>
                                        <option value="2">Débito</option>
                                        <option value="3">Crédito</option>
                                    </Form.Select>
                                </Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tempo:</Form.Label>
                                <Form.Control type="text" />

                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Valor:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                             <Button variant="primary">Adicionar</Button>

                             <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tolerância Máxima:</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                             <Button variant="primary">Salvar Contrato</Button>
                             
                        </Form>
                    </Card.Body>

                </Card>
        </div>
    );
};

export default FormContrato;