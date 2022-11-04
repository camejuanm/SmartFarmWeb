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
            input["role"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            this.setState({input:input});
    
            alert('Password changes successful');
            window.location.href="/sign-in";
        } else {
            alert('Password changes failed');
        }
    }
  
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if(input["role"] != "admin" && input["role"] != "Admin") {
            isValid = false;
            errors["role"] = "Role must be admin";
            if(!input["role"]) {
                isValid = false;
                errors["role"] = "Role can not be blank";
            }
        }
    
        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Email can not be blank.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if(input["password"].length < 6) {
            isValid = false;
            errors["password"] = "Password must be at least 6 characters";
            if (!input["password"]) {
                isValid = false;
                errors["password"] = "Password can not be blank.";
            }
        }
    
        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Confirm Password can not be blank.";
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
                            <label for="role">Role:</label>
                            <input
                            type="text" 
                            name="role" 
                            value={this.state.input.role}
                            onChange={this.handleChange}
                            class="form-control" 
                            placeholder="Type role" 
                            id="role" />
                
                            <div className="text-danger">{this.state.errors.role}</div>
                        </div>
            
                        <div class="form-group">
                            <label for="email">Email Address:</label>
                            <input 
                                type="text" 
                                name="email" 
                                value={this.state.input.email}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Please Enter your Email" 
                                id="email" 
                            />
                
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input 
                                type="password" 
                                name="password"
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                class="form-control" 
                                placeholder="Please Enter your Password" 
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
                                placeholder="Please Enter your Confirm Password" 
                                id="confirm_password" 
                            />
                
                            <div className="text-danger">{this.state.errors.confirm_password}</div>
                        </div>    
                        <input type="submit" value="Update Password" class="btn btn-success" />
                    </form>
                </div>
            </div>
        );
    }
}