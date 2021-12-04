import styled from "styled-components";
import { Card, Typography, Avatar } from 'antd';

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

export const Para = styled(Typography)`
    color: #000;
    font-size: 1rem;
`;

export const Text = styled(Typography)`
    color: #000;
    font-size: 1.1rem;
`;

export const NewsCard = styled(Card)`
    min-width: 250px;
    border-radius: 25px;

    &:hover {
        transition: all 0.2 ease-in-out;
        background-color: #01bf71;

        ${Para} {
            color: #fff;
        }

        ${Text} {
            color: #fff;
        }
    }
`;

export const Title = styled(Typography)`
    color: #fff;
    font-size: 1.5rem;
    margin: 3rem 0;
    text-align: center;
`;

export const Greeting = styled(Typography)`
    color: #fff;
    font-size: 1.7rem;
    padding-top: 80px;
    text-align: center;
`;

export const Image = styled.img`
    display: block;
  margin-left: auto;
  margin-right: auto;
  width: 10rem;
  margin-bottom: 24px;
`



export const Ava = styled(Avatar)`
    width: 50px;
`