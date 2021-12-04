import React, {useState} from 'react'
import { useHistory } from "react-router-dom";
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton, Text } from './SigninElements'
import Axios from 'axios'


export const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("Prisijungimas");
   

    const history = useHistory();
    const signin = () => {


        Axios.post('http://localhost:3001/signin', {
            email: email,
            password: password
        }).then((res) => {
            if (res.status === 200){
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("email", res.data.email)
                localStorage.setItem("name", res.data.name)
                history.push(`/main`);
            }
        }).catch(err => {
            if(err.response.status === 404) {
                setTitle("Netinkamas el. paštas arba slaptažodis");
            }
        })
    }

    const forgetButton = () => {
        history.push(`/forget`);
    }

    return (
        <>
          <Container>
              <FormWrap>
                  <Icon to='/'>Elektroniniai Mainai</Icon>
                      <FormContent>
                          <Form>
                              <FormH1>{title}</FormH1>
                              <FormLabel hmtlFor='for'>Elektroninis paštas</FormLabel>
                              <FormInput type='email' required onChange={(e) => {
                                  setEmail(e.target.value)
                              }}/>
                              <FormLabel hmtlFor='for'>Slaptažodis</FormLabel>
                              <FormInput type='password' required onChange={(e) => {
                                  setPassword(e.target.value)
                              }}/>
                              <FormButton type='button' onClick={signin} >Prisijungti</FormButton>
                              <Text onClick={forgetButton}>Pamiršau slaptažodį ar el. paštą</Text>
                          </Form>
                      </FormContent>
              </FormWrap>
          </Container>  
        </>
    )
}
