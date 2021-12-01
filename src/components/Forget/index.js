import React, {useState} from 'react'
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton } from './ForgetElements'
import Axios from 'axios'

export const Forget = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [name2, setName2] = useState("");
    const [date, setDate] = useState("");
    const [title, setTitle] = useState("Priminti slaptažodį");
    const [title1, setTitle1] = useState("Priminti elektroninį paštą");


    const forgotPassword = () => {
        Axios.post('http://localhost:3001/forgetpass', {
            email: email,
            name: name
        }).then((res) => {
            if (res.status === 200){
                setTitle("Jei toks el. paštas egzistuoja, naujas slaptažodis išsiųstas")
            }
        }).catch(err => {
                if(err.response.status === 404) {
                    setTitle("Jei toks el. paštas egzistuoja, naujas slaptažodis išsiųstas");
                }
            })
    }

    const forgotEmail = () => {
        Axios.post('http://localhost:3001/forgetemail', {
            name: name2,
            date: date
        }).then((res) => {
            console.log(date)
            if (res.status === 200){
                setTitle1(`Jūsų el. paštas yra: ${res.data?.email}`  )
                console.log(res.data)
            }
        }).catch(err => {
            if(err.response.status === 404) {
                setTitle1("Priminti elektroninį paštą");
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
                                <FormH1>{title}</FormH1>
                                <FormLabel hmtlFor='for'>Paskyros elektroninis paštas</FormLabel>
                                <FormInput type='email' required onChange={(e) => {
                                    setEmail(e.target.value)
                                }}/>
                                <FormLabel hmtlFor='for'>Paskyros vardas</FormLabel>
                                <FormInput type='text' required onChange={(e) => {
                                    setName(e.target.value)
                                }}/>
                                <FormButton type='button' onClick={forgotPassword}>Priminti slaptažodį</FormButton>
                            </Form>
                            <Form>
                                <FormH1>{title1}</FormH1>
                                <FormLabel hmtlFor='for'>Paskyros vardas</FormLabel>
                                <FormInput type='email' required onChange={(e) => {
                                    setName2(e.target.value)
                                }}/>
                                <FormLabel hmtlFor='for'>Apytiksle registracijos data</FormLabel>
                                <FormInput type='datetime-local' required onChange={(e) => {
                                    setDate(e.target.value)
                                }}/>
                                <FormButton type='button' onClick={forgotEmail}>Priminti el. paštą</FormButton>
                            </Form>
                        </FormContent>
                </FormWrap>
            </Container>  
        </>
    )
}

