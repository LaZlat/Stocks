import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Typography, Col } from 'antd';


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
`;

export const Column = styled(Col)`
    text-align: center;
`

export const Greeting = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    font-size: 1.7rem;
    padding: 80px 0 50px 0;
    text-align: center;
`;

export const Title = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    text-align: center;
    padding: 50px 0 30px 0;
`;

export const Text = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    font-size: 1.3rem;
    margin-bottom: 1.1rem;
`;

export const AutoBtn = styled.span`
    text-align: center;
    color: #000;
    cursor: pointer;

    &:hover {
        transition: all 0.2 ease-in-out;
        color: #01bf71;
    }
`;

export const Button = styled.button`
    background: #01bf71;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    width: 7rem;

    &:hover {
        transition: all 0.2 ease-in-out;
        background: #fff;
        color: #01bf71;
    }
`