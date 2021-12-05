import styled from "styled-components";
import { Typography} from 'antd';

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

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        height: 80%;
    };
`;

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-color: #01bf71;
    border-style: solid;

    @media screen and (max-width: 480px) {
        padding: 10px;
        text-align: center;
        margin-bottom: 3rem;
    };
`;

export const Form = styled.form`
    background: #010101;
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: grid;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);
    border-color: #01bf71;
    border-style: solid;

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
        text-align: center;
        margin-bottom: 3rem;
    };
`;

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 1rem;
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

export const Title = styled(Typography)`
    color: #fff;
    font-size: 1.5rem;
    margin: 3rem 0;
    text-align: center;

    margin-top: 50px 0 30px 0;
`;