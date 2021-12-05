import React,{useState} from 'react';
import Axios from 'axios'
import { Container, FormWrap, Form, FormH1, FormLabel, FormInput, FormButton, Title } from './SettingsElements'
import {Col, Row} from 'antd'

export const Settings = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [refresh, setRefresh] = useState("");
    const [emailHead, setEmailHead] = useState("Elektroninio pašto keitimas");
    const [passwordHead, setPasswordHead] = useState("Slaptažodžio keitimas");
    const [refreshHead, setRefreshHead] = useState("Atsatyti profilį");
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const changePass = () => {
        Axios.post('http://localhost:3001/signin', {
            email: localStorage.getItem("email"),
            password: password
        }).then((res) => {
                if (password1 !== password2) {
                    setPasswordHead("Slaptažodžiai nesutampa");
                } else {
                    Axios.post('http://localhost:3001/sett/pass', {
                        email: localStorage.getItem("email"),
                        password: password1
                    }).then((response) => {
                            setPasswordHead("Slaptažodis pakeistas");
                        
                    }).catch(err => {
                        if(err.response.status === 404) {
                            setPasswordHead("Klaida, bandykite dar kartą");
                        }
                    })
                }
        }).catch(err => {
            if(err.response.status === 404) {
                setPasswordHead("Neteisingas slaptažodis")
            }
        })
    }

    const changeEmail = () => {
        if (!re.test(email)) {
            setEmailHead('Netinkamas email formatas')
        } else {
            Axios.post('http://localhost:3001/sett/email', {
                oldEmail: localStorage.getItem("token"),
                email: email
            }).then((res) => {
                    console.log(res.data)
                    localStorage.setItem("email", res.data)
            })
        }
    }

    const refreshAcc = () => {
        Axios.post('http://localhost:3001/signin', {
            email: localStorage.getItem("token"),
            password: refresh
        }).then((res) => {
                Axios.post('http://localhost:3001/sett/refresh', {
                email: localStorage.getItem("email"),
            }).then((res) => {
                    localStorage.setItem("email", email)
            })
        }).catch(err => {
            if(err.response.status === 404) {
                setRefreshHead("Neteisingas slaptažodis")
            }
        })
    }


    return (
        <>
        <Container>
        <Title> Nustatymai</Title>
        <Row>
        <Col sm={24} lg={8}>
            <FormWrap>

                <Form>
                    <FormH1>{emailHead}</FormH1>
                    <FormLabel>Elektroninis paštas: {localStorage.getItem("email")}</FormLabel>
                    <FormLabel>Naujas elektroninis paštas</FormLabel>
                    <FormInput type='email' required onChange={(e) => {
                                  setEmail(e.target.value)}}></FormInput>
                    <FormButton onClick={changeEmail} type="button">Keisti el. paštą</FormButton>
                </Form>
            </FormWrap>
            </Col>
            <Col sm={24} lg={8}>
            <FormWrap>
                <Form>
                    <FormH1>{passwordHead}</FormH1>
                    <FormLabel>Esamas slaptažodis</FormLabel>
                    <FormInput type='password' required onChange={(e) => {
                                  setPassword(e.target.value)}}></FormInput>
                    <FormLabel>Naujas slaptažodis</FormLabel>
                    <FormInput type='password' required onChange={(e) => {
                                  setPassword1(e.target.value)}}></FormInput>
                    <FormLabel>Pakartoti slaptažodi</FormLabel>
                    <FormInput type='password' required onChange={(e) => {
                                  setPassword2(e.target.value)}}></FormInput>              
                    <FormButton onClick={changePass} type="button">Keisti slaptažodį</FormButton>
                </Form>
            </FormWrap>
            </Col>
            <Col sm={24} lg={8}>
            <FormWrap>
                <Form>
                    <FormH1>{refreshHead}</FormH1>
                    <FormLabel>Atstačius profilį dings visos jūsų virtualios valiutos ir vertybiniai popieriai. Paskyra taps šviežia su pradine pinigų suma</FormLabel>
                    <FormLabel>Slaptažodis:</FormLabel>
                    <FormInput type='password' required onChange={(e) => {
                                  setRefresh(e.target.value)}}></FormInput>            
                    <FormButton onClick={refreshAcc} type="button">Atsatyti</FormButton>
                </Form>
            </FormWrap>
            </Col>
            </Row>
        </Container>
        </>
        
    )
}