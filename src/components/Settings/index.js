import React,{useState} from 'react';
import Axios from 'axios'

export const Settings = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [refresh, setRefresh] = useState("");
    const [emailHead, setEmailHead] = useState("Elektroninio pašto keitimas");
    const [passwordHead, setPasswordHead] = useState("Slaptažodžio keitimas");
    const [refreshHead, setRefreshHead] = useState("Atsatyti profilį");
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const changePass = () => {
        Axios.post('http://localhost:3001/signin', {
            email: localStorage.getItem("email"),
            password: password
        }).then((res) => {
            if (res.status === 200){
                if (password1 !== password2) {
                    setPasswordHead("Slaptažodžiai nesutampa");
                } else {
                    Axios.post('http://localhost:3001/sett/pass', {
                        email: localStorage.getItem("email"),
                        password: password1
                    }).then((response) => {
                        if(res.status === 200) {
                            setPasswordHead("Slaptažodis pakeistas");
                        } else {
                            setPasswordHead("Klaida, bandykite dar kartą");
                        }
                    })
                }
            } else {
                setPasswordHead("Neteisingas slaptažodis")
            }
        })
    }

    const changeEmail = () => {
        if (!re.test(email)) {
            setEmailHead('Netinkamas email formatas')
        } else {
            Axios.post('http://localhost:3001/sett/email', {
                oldEmail: localStorage.getItem("email"),
                email: email
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data)
                    localStorage.setItem("email", res.data)
                }
            })
        }
    }

    const refreshAcc = () => {
        Axios.post('http://localhost:3001/signin', {
            email: localStorage.getItem("email"),
            password: refresh
        }).then((res) => {
            if (res.status === 200){
                Axios.post('http://localhost:3001/sett/refresh', {
                email: localStorage.getItem("email"),
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem("email", email)
                }
            })
            } else {
                setRefreshHead("Neteisingas slaptažodis")
            }
        })
    }


    return (
        <>
            <div>
            <h1>AAA</h1>
            <h1>AAA</h1>

            <h1>AAA</h1>

            <h1>AAA</h1>

            <h1>AAA</h1>

                <form>
                    <h3>{emailHead}</h3>
                    <label>Elektroninis paštas: {localStorage.getItem("email")}</label>
                    <label>Naujas elktroninis paštas: {}</label>
                    <input type='email' required onChange={(e) => {
                                  setEmail(e.target.value)}}></input>
                    <button onClick={changeEmail} type="button">Keisti el paštą</button>
                </form>
            </div>
            <div>
                <form>
                    <h3>{passwordHead}</h3>
                    <label>Esamas slaptažodis:</label>
                    <input type='password' required onChange={(e) => {
                                  setPassword(e.target.value)}}></input>
                    <label>Naujas slaptažodis:</label>
                    <input type='password' required onChange={(e) => {
                                  setPassword1(e.target.value)}}></input>
                    <label>Pakartoti slaptažodi:</label>
                    <input type='password' required onChange={(e) => {
                                  setPassword2(e.target.value)}}></input>              
                    <button onClick={changePass} type="button">Keisti slaptažodį</button>
                </form>
            </div>
            <div>
                <form>
                    <h3>{refreshHead}</h3>
                    <p>Atstačius profilį dings visos jūsų virtualios valiutos ir vertybiniai popieriai. Paskyra taps šviežia su pradine pinigų suma</p>
                    <label>Slaptažodis:</label>
                    <input type='password' required onChange={(e) => {
                                  setRefresh(e.target.value)}}></input>            
                    <button onClick={refreshAcc} type="button">Atsatyti</button>
                </form>
            </div>
        </>
        
    )
}