import React, {useState, useEffect} from 'react'
import { Table} from 'antd';
import {Container, Greeting, AutoBtn} from './PanelElements';

import Axios from "axios";

export const Panel = () => {

    const [users, setUsers] = useState(null)

    const columns = [
        {
            title: 'Vardas',
            dataIndex: 'name',
            key: 'name',
        },
        {
          title: 'Elektroninis paštas',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Pinigai',
            dataIndex: 'cash',
            key: 'cash',
          },
        {
            title: 'Trinti',
            dataIndex: 'trinti',
            key: 'trinti',
            render: (text, record) => (
                <AutoBtn
                  onClick={(e) => { 
                      e.preventDefault();
                      const data = users.filter(users => users.key !== record.key);
                      deleteUser(record.email);
                      setUsers(data);
                   }}
                >
                  Trinti
                </AutoBtn>
            ),
        },
        {
            title: 'Restartuoti',
            dataIndex: 'restartuoti',
            key: 'restartuoti',
            render: (text, record) => (
                <AutoBtn
                  onClick={(e) => { 
                      e.preventDefault();
                      restartUser(record.email);
                   }}
                >
                  Restartuoti
                </AutoBtn>
            ),
        }
    ];

    const deleteUser = (del) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.post("http://localhost:3001/admin/removeuser", {
            owner: email,
            token: token,    
            email: del
        }).then((response) => {
                if( response.status === 200) {
                    setUsers(users.filter((user) => user !== deleteUser));
                }
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            })
    };

    const restartUser = (del) => {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.post("http://localhost:3001/admin/restartuser", {
            owner: email,
            token: token,    
            email: del
        }).then((response) => {
                if( response.status === 200) {
                    getUsers();
                }
            }).catch(function (error) {
                if (error.response) {
                    console.log(error.response)
                }
            })
    };

    function getUsers() {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("token");

        Axios.post("http://localhost:3001/admin/users", {
            owner: email,
            token: token     
        }).then((response) => {
                if( response.status === 200) {
                    console.log(response)
                    const users = response.data.map( e => ({
                        key: e.email,
                        name: e.name,
                        email: e.email,
                        cash: e.amount,
                    }))
                    setUsers(users);
                }
            }).catch(function (error) {
                if (error.response) {
                    setUsers(null);
                }
            })
    }

    useEffect(() => {
        getUsers();  
    }, [])

    return (
        <>
        <Container>
        <Greeting>Administratoriaus kontrolė</Greeting>
            <Table dataSource={users} columns={columns} pagination={true} />
        
        </Container>
        </>
    )
}