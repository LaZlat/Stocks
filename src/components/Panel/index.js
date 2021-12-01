import React, {useState, useEffect} from 'react'
import { Typography, Row, Col, Statistic, Table, Space, Button } from 'antd';
import Axios from "axios";

export const Panel = () => {

    const [users, setUsers] = useState(null)

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Cash',
            dataIndex: 'cash',
            key: 'cash',
          },
        {
            title: 'Trinti',
            dataIndex: 'trinti',
            key: 'trinti',
            render: (text, record) => (
                <span
                  onClick={(e) => { 
                      e.preventDefault();
                      const data = users.filter(users => users.key !== record.key);
                      deleteUser(record.email);
                      setUsers(data);
                   }}
                >
                  Delete
                </span>
            ),
        },
        {
            title: 'Restartuoti',
            dataIndex: 'restartuoti',
            key: 'restartuoti',
            render: (text, record) => (
                <span
                  onClick={(e) => { 
                      e.preventDefault();
                      restartUser(record.email);
                   }}
                >
                  Delete
                </span>
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
            <Table dataSource={users} columns={columns} pagination={true} />

        </>
    )
}