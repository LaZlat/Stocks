import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Typography, Col } from 'antd';
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
export const Image = styled.img`
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 20rem;
  margin-bottom: 2rem;
`
export const CollaDiv = styled.div`
    color: #fff !important;
    text-align: right !important;
    font-size: 1.2rem !important;
    margin-bottom: 2rem;

`
export const CollaTextDiv = styled.div`
    color: #000 !important;
    text-align: right !important;
    font-size: 1.2rem !important;
    background-color: white;
    border-radius: 25px;
`

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
    color: #000;
    margin-left: 50px;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1.2rem;
`;

export const PortLink = styled(Link)`
    text-align: center;
    color: #000;

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