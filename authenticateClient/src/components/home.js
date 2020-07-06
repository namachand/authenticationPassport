import React from "react";
import {Button} from "reactstrap";
class Home extends React.Component{
    render(){
        return(
            <React.Fragment>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <h1>Please authenticate!</h1>       
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <a href="http://localhost:3231/authentication/google"><Button className="btn btn-danger">google+</Button></a> 
                </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <h1>Logout!</h1>       
                </div>
                <div style={{display:'flex',justifyContent:'center',marginTop:'5px'}}>
                    <a href="http://localhost:3231/user/logout"><Button className="btn btn-danger">logout</Button></a> 
                </div>
            </React.Fragment>
        )    
        }
    }
export default Home