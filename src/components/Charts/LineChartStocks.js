import React from 'react';
import {Line} from 'react-chartjs-2';
import {Row, Typography} from 'antd';
import { Container} from './ChartElements';

const LineChartStocks = ({stockHistory, currentPrice, stockSymbol}) => {
    const stockPrice = [];
    const stockTimestamp = [];

    console.log(stockHistory)
    
    if(stockHistory?.items != null) {

    const keys = Object.values(stockHistory?.items)

    keys.forEach(val => {
        stockPrice.push(val?.close);
        
        var timestamp = Date.parse(val?.date);
        if (isNaN(timestamp) == false) {
            stockTimestamp.push(new Date(val?.date).toLocaleDateString());
          }
    })

}
    
    const data = {
        labels: stockTimestamp,
        datasets: [{
            label: 'Kaina USD',
            data: stockPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd'
        }]
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    }

    return (
        <>
        <Container>
            <Row>
                <Typography level={5}>
                    {stockSymbol} dabartinė kaina: $ {currentPrice}
                </Typography>
            </Row>
            <Line data={data} options={options} />
         </Container>
        </>
    )
}

export default LineChartStocks
