import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Typography, Divider } from 'antd';
import Collapsible from 'react-collapsible';

export const Collas = styled(Collapsible)`
    color: #01bf71 !important;
    text-align: center;
    cursor: pointer;
    font-size: 1.3rem;
    margin-bottom: 1rem;

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
    text-align: center !important;
    font-size: 1.3rem !important;
    margin-bottom: 1rem;
`

export const CollaText = styled(Typography)`
    color: #000;
    margin-left: 50px;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1.2rem;
`;

export const CollaTextDiv = styled.div`
    color: #000 !important;
    text-align: center !important;
    font-size: 1.3rem !important;
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
    width: 100%;
    color: #fff !important;
`;

export const StocksWrap = styled.div`
`;

export const StockLink = styled(Link)`
    text-align: center;
    margin-top: 50px;
    color: #fff;
    font-size: 1.1rem;

    &:hover {
        transition: all 0.2 ease-in-out;
        color: #01bf71;
    }
`;

export const Greeting = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    font-size: 1.7rem;
    padding-top: 80px;
`;

export const Title = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    text-align: center;
    font-size: 1.3rem;
    margin-bottom: 1rem;
`;

export const Text = styled(Typography)`
    color: #fff;
    margin-left: 50px;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1.2rem;
`;

export const Divide = styled(Divider)`
    border-top: 1px solid rgb(255 255 255 / 21%)
`;