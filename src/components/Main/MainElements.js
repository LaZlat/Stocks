import styled from "styled-components";
import {Link} from 'react-router-dom';
import { Typography, Row, Col, Statistic } from 'antd';


export const Container = styled.div`
    min-height: 692px;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
    background: linear-gradient(
        108deg,
        rgba(0, 128, 255) 0%,
        rgba(0, 128, 255) 100%
    );
`;

export const Title = styled(Typography)`
    margin-top: 80px;
`;

export const StocksWrap = styled.div`
`;

export const StockLink = styled(Link)`
`;