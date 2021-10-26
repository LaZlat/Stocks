import React, {useState} from 'react'
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton, } from './SingupElements'
import Axios from 'axios'

export const Signup = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [h1Text, setH1Text] = useState("Sign Up HAHAHA");

    const signup = () => {
        if (password !== password2) {
            setH1Text("Slaptažodžiai nesutampa");
        } else if (!re.test(email)) {
            setH1Text("Netinkamas email formatas");
        } else {
            Axios.post('http://localhost:3001/signup', {
                name: name,
                email: email,
                password: password
            }).then((response) => {
                if(response.data.msg  !== "taken") {
                  window.location = "/signin";
                } else {
                  setH1Text("Email is already taken");
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
                              <FormH1>{h1Text}</FormH1>
                              <FormLabel hmtlFor='for'>Username</FormLabel>
                              <FormInput type='text' required onChange={(e) => {
                                  setName(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Email</FormLabel>
                              <FormInput type='email' required onChange={(e) => {
                                  setEmail(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Password</FormLabel>
                              <FormInput type='password' required onChange={(e) => {
                                  setPassword(e.target.value)
                              }}/>
                               <FormLabel hmtlFor='for'>Repeat password</FormLabel>
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
