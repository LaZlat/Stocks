import styled from "styled-components";
import {Col, Typography, Select, Divider, Row} from 'antd';
import Collapsible from 'react-collapsible';

export const Collas = styled(Collapsible)`
    color: #01bf71 !important;
    text-align: right;
    cursor: pointer;
    font-size: 1.2rem;

    &:hover {
        transition: all 0.2 ease-in-out !important;
        color: #fff !important;
    }
`
export const CollaDiv = styled.div`
    color: #fff !important;
    text-align: right !important;
    font-size: 1.2rem !important;
`
export const CollaTextDiv = styled.div`
    color: #000 !important;
    text-align: right !important;
    font-size: 1.2rem !important;
    background-color: white;
    border-radius: 25px;
`

export const TextColl = styled(Typography)`
    color: #000;
    margin-left: 50px;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 1.2rem;
`;


export const Container = styled.div`
    min-height: 692px;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
    background: #101522;
    padding: 50px;
`

export  const Column = styled(Col)`

`

export const Title = styled(Typography)`
    color: #fff;
    font-size: 1.3rem;
`

export const Greeting = styled(Typography)`
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
    margin: 5rem 0 5rem 0;
`

export const Text = styled(Typography)`
    color: #fff;
    font-size: 1rem;
    margin: 1rem 0 1rem 0;
`

export const MoreText = styled.p`
    color: #fff;
    font-size: 1rem;
    margin: 1rem 0 1rem 0;
    h3 {
        color: #fff;
    }
`

export const Link = styled.a`
    color: #fff;
    font-size: 1rem;
    margin: 1rem 0 1rem 0;

    &:hover {
        transition: all 0.2 ease-in-out;
        color: #01bf71;
    }
`
export const Ro = styled(Row)`
    color: #fff;
`

export const Slct = styled(Select)`
    margin-bottom: 1rem;
    width: 10rem;
`

export const Div = styled.div`
    padding-left: 50px;
    text-align: center;
`
export const DivNormal = styled.div`
    padding: 0 50px;
`

export const Divide = styled(Divider)`
    border-top: 1px solid rgb(255 255 255 / 21%)
`;

export const FormContent = styled.div`
    height: 100%;
    justify-content: center;
    margin-bottom: 3rem;

    @media screen and (max-width: 480px) {
        padding: 10px;
    };
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export const Form = styled.form`
    background: #000;
    max-width: 400px;
    height: auto;
    padding: 50px 30px 20px;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    border-color: #01bf71;
    border-style: solid;

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    };
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
`;

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`;

export const FormButton = styled.button`
    background: #01bf71;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;

    &:hover {
        transition: all 0.2 ease-in-out;
        background: #fff;
        color: #01bf71;
    }
`;