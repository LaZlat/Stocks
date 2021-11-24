import React, {useEffect, useState} from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic, Table, Space, Button } from 'antd';
import {Container, Title, StocksWrap, StockLink} from '../Portfolio/PortfolioElements';
import {Cryptos} from '../Cryptos';
import {Stocks} from '../Stocks';
import Axios from "axios";

export const Auto = () => {

    const [cryptoData, setCryptoData] = useState(null)

    const columnsCrypto = [
        {
            title: 'Nr',
            dataIndex: 'nr',
            key: 'nr',
          },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Kaina',
            dataIndex: 'kaina',
            key: 'kaina',
        },
        {
            title: 'Pirkimas/Pardavimas',
            dataIndex: 'pirkimasparvadimas',
            key: 'pirkimasparvadimas',
        },
        {
            title: 'Busena',
            dataIndex: 'busena',
            key: 'busena',
        },
        {
            title: 'Trinti',
            dataIndex: 'trinti',
            key: 'trinti',
            render: (text, record) => (
                <span
                  onClick={(e) => { 
                      e.preventDefault();
                      const data = cryptoData.filter(cryptoData => cryptoData.key !== record.key);
                      deleteAuto(record.nr);
                      setCryptoData(data);
                   }}
                >
                  Delete
                </span>
              ),
        }
    ];

    const deleteAuto = (id) => {
        Axios.post('http://localhost:3001/auto/deleteautocrypto', {
            deleteId: id
        }).then((response) => {
            console.log(response);
        })
    }
    useEffect(() => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.get("http://localhost:3001/auto/availablecryptoautos", { params: { email: email, token: token }}).then((response) => {
                if( response.status === 200) {
                    const cryptoData = response.data.map( e => ({
                        key: e.id,
                        nr: e.id,
                        name: e.name,
                        kaina: e.price,
                        quantity: e.volume,
                        pirkimasparvadimas: e.sell,
                        status: e.busena
                    }))
                    console.log(cryptoData)
                    setCryptoData(cryptoData);
                }
            }).catch(function (error) {
                if (error.response) {
                    console.log(cryptoData)
                    setCryptoData(null);
                }
            })
    },[]);

   
    return (
        <>
            <Table dataSource={cryptoData} columns={columnsCrypto} pagination={true} />


        </>
    )
}
