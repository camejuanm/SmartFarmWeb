import React, {Link} from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
export default function ConfirmPassword() {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email can not be blank'),
    password: Yup.string()
      .required('Password is mendatory')
      .min(6, 'Password must be at least 6 char long'),
    confirmPwd: Yup.string()
      .required('Password is mendatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })
  const formOptions = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, reset, formState } = useForm(formOptions)
  const { errors } = formState
  function onSubmit(data) {
    console.log(JSON.stringify(data, null, 4))
    return false
  }
  return (
    <div className="outer">
      <div className="container mt-5">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Input Your Email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Input New Password"
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              name="confirmPwd"
              type="password"
              {...register('confirmPwd')}
              className={`form-control ${errors.confirmPwd ? 'is-invalid' : ''}`}
              placeholder="Retype New Password"
            />
            <div className="invalid-feedback">{errors.confirmPwd?.message}</div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// import React, {Component} from 'react';
// import "./reset.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default class Reset extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             cpassword: "",
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         const { email, password, cpassword } = this.state;
//         console.log(email, password, cpassword);
//         fetch("http://localhost:5000/forgot-password", {
//           method: "POST",
//           crossDomain: true,
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//             cpassword
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data, "userRegister");
//             if (data.status == "ok") {
//               alert("password changes");
//               window.localStorage.setItem("token", data.data);
//               window.location.href = "./sign-in";
//             } else {
//               alert("Invalid password");
//             }
//         });
//     }

//     render() {
//         return(
//           <div className="outer">            
//             <form onSubmit={this.onSubmit}>
//                 <h3>Forgot Password</h3>
//                 <div className="mb-3">
//                     <label>Email Address</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         onChange={(e) => this.setState({ email: e.target.value })}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label>New Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="New Password"
//                         onChange={(e) => this.setState({ password: e.target.value })}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label>Confirm Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Confirm Password"
//                         onChange={(e) => this.setState({ cpassword: e.target.value })}
//                         required
//                     />
//                 </div>
//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-success">
//                         Submit
//                     </button>
//                 </div>  
//             </form>
//           </div>
//         );
//     }
// }