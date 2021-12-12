import React, {useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import Axios from 'axios'

export const ProtectedAdminRoute = ({
  path,
  component: Component,
  render,
  ...rest
}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    useEffect(() => {
            const email = localStorage.getItem("email");
            const token = localStorage.getItem("token");

        Axios.get("http://localhost:3001/auth/admin", { params: { email: email, token: token }}).then((response) => {
            if( response.status == 200) {
                setIsAuthenticated(true);
            }
        }).catch(function (error) {
            if (error.response) {
                setIsAuthenticated(false);
            }
        })
    },[]);

    if (isAuthenticated == null) {
        return null;
    }

  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedAdminRoute;