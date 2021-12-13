import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Card, Input, Typography } from 'antd';
import Collapsible from 'react-collapsible';

export const Collas = styled(Collapsible)`
    color: #01bf71 !important;
    text-align: center;
    cursor: pointer;
    font-size: 1.3rem;
    margin-top: 1rem;

    &:hover {
        transition: all 0.2 ease-in-out !important;
        color: #fff !important;
    }
`
export const CollaDiv = styled.div`
    color: #fff !important;
    text-align: center !important;
    font-size: 1.3rem !important;
    margin-top: 1rem;
`
export const Text = styled(Typography)`
    color: #000;
    margin-left: 50px;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1.2rem;
`;

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

export const CryptoContainer = styled.div`
`;

export const CryptoLink = styled(Link)`;
`;

export const CryptoCard = styled(Card)`
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

export const SearchCrypto = styled.div`
    padding: 80px 80px;
`;

export const CryptoInput = styled(Input)`
    width: 20rem
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