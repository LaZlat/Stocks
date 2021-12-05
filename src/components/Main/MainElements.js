import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Typography, Divider } from 'antd';


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