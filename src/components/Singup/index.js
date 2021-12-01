import React, {useState} from 'react'
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton, } from './SingupElements'
import Axios from 'axios'

export const Signup = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [title, setTitle] = useState("Registracija");

    const signup = () => {
        if (password !== password2) {
            setTitle("Slaptažodžiai nesutampa");
        } else if (!re.test(email)) {
            setTitle("Netinkamas el. pašto formatas");
        } else {
            console.log("AAAAAA")
            Axios.post('http://localhost:3001/signup', {
                name: name,
                email: email,
                password: password
            }).then((response) => {
                if(response.status === 200) {
                  window.location = "/signin";
                }
            }).catch(err => {
                if(err.response.status === 404) {
                    setTitle("El. paštas jau naudojamas");
                }
            })
        }
    }

    return (
        <>
          <Container>
              <FormWrap>
                  <Icon to='/'>Elektroniniai Mainai</Icon>
                      <FormContent>
                          <Form>
                              <FormH1>{title}</FormH1>
                              <FormLabel hmtlFor='for'>Vardas</FormLabel>
                              <FormInput type='text' required onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Elektroninis paštas</FormLabel>
                              <FormInput type='email' required onChange={(e) => {
                                  setEmail(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Slaptažodis</FormLabel>
                              <FormInput type='password' required onChange={(e) => {
                                  setPassword(e.target.value)
                              }}/>
                               <FormLabel hmtlFor='for'>Pakartoti slaptažodį</FormLabel>
                                <FormInput type='password' required onChange={(e) => {
                                  setPassword2(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={signup}>Registruotis</FormButton>
                          </Form>
                      </FormContent>
              </FormWrap>
          </Container>  
        </>
    )
}
