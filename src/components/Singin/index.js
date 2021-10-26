import React, {useState} from 'react'
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton, Text } from './SigninElements'
import Axios from 'axios'

export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [h1Text, setH1Text] = useState("Sign In HAHAHA");

    const signin = () => {
        Axios.post('http://localhost:3001/signin', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response)
            if(response.data.id  !== 0) {
                window.location = "/main";
            } else {
                setH1Text("Worng credentials");
            }
        })
    }

    return (
        <>
          <Container>
              <FormWrap>
                  <Icon to='/'>Elektroniniai Mainai</Icon>
                      <FormContent>
                          <Form>
                              <FormH1>{h1Text}</FormH1>
                              <FormLabel hmtlFor='for'>Email</FormLabel>
                              <FormInput type='email' required onChange={(e) => {
                                  setEmail(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Password</FormLabel>
                              <FormInput type='password' required onChange={(e) => {
                                  setPassword(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={signin}>Continue</FormButton>
                              <Text>Forgot password</Text>
                          </Form>
                      </FormContent>
              </FormWrap>
          </Container>  
        </>
    )
}
