import React from 'react'
import { Container, FormContent, FormWrap, Icon, Form, FormH1, FormLabel, FormInput, FormButton, Text } from './SigninElements'

export const Signin = () => {
    return (
        <>
          <Container>
              <FormWrap>
                  <Icon to='/'>Elektroniniai Mainai</Icon>
                      <FormContent>
                          <Form>
                              <FormH1>Sign In HAHAHA</FormH1>
                              <FormLabel hmtlFor='for'>Email</FormLabel>
                              <FormInput type='email' required />
                              <FormLabel hmtlFor='for'>Password</FormLabel>
                              <FormInput type='password' required />
                              <FormButton type='submit'>Continue</FormButton>
                              <Text>Forgot password</Text>
                          </Form>
                      </FormContent>
              </FormWrap>
          </Container>  
        </>
    )
}
