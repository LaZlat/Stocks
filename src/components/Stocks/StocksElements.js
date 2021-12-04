import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Card, Input, Typography } from 'antd';

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

export const StockContainer = styled.div`
`;

export const StockLink = styled(Link)`;
`;

export const  StockCard = styled(Card)`
    min-width: 250px;
    border-radius: 25px;

    &:hover {
        transition: all 0.2 ease-in-out;
        color: #fff;
        background-color: #01bf71;
    }
`;

export const Image = styled.img`
    width: 35px;
`;

export const SearchStock = styled.div`
    padding: 80px 80px;
`;

export const StockInput = styled(Input)`
    width: 20rem;
`;

export const Title = styled(Typography)`
    color: #fff;
    font-size: 1.3rem;
    margin-bottom: 1rem;
`;

export const Greeting = styled(Typography)`
    color: #fff;
    font-size: 1.7rem;
    padding-top: 80px;
    text-align: center;
`;