import React, { Component } from 'react';
import './Authentication.css';
  
export default class Reset extends Component {
    constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
     
    handleChange(e) {
        let input = this.state.input;
        input[e.target.name] = e.target.value;
    
        this.setState({
            input
        });
    }
        
    handleSubmit(e) {
        e.preventDefault();
    
        if(this.validate()){
            console.log(this.state);
    
            let input = {};
            input["email"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            this.setState({input:input});
    
            alert('Password changes successful');
            window.location.href="/sign-in";
        }
    }
  
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter valid email address.";
            }
        }
    
        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }
    
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }
    
        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
            
            if (input["password"] != input["confirm_password"]) {
            isValid = false;
            errors["password"] = "Passwords don't match.";
            }
        } 
    
        this.setState({
            errors: errors
        });
    
        return isValid;
    }
     
    render() {
        return (
            <div className="outer">
                <div className="card">
                    <h1>Reset Password</h1>
                    <form onSubmit={this.handleSubmit}>
            
                        <div class="form-group">
                            <label for="email">Email Address:</label>
                            <input 
                                type="text" 
                                name="email" 
                                value={this.state.input.email}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Enter email" 
                                id="email" 
                            />
                
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input 
                                type="password" 
                                name="password"
                                minLength={6} 
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Enter password" 
                                id="password" 
                            />
                
                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>
                
                        <div class="form-group">
                            <label for="password">Confirm Password:</label>
                            <input 
                                type="password" 
                                name="confirm_password" 
                                value={this.state.input.confirm_password}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Enter confirm password" 
                                id="confirm_password" 
                            />
                
                            <div className="text-danger">{this.state.errors.confirm_password}</div>
                        </div>    
                        <input type="submit" value="Submit" class="btn btn-success" />
                    </form>
                </div>
            </div>
        );
    }
}