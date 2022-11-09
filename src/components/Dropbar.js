import React, {useState} from "react";
import "./Authentication.css";

function DropBar() {
    const [value, setValue] = useState("")
    const data = ["Admin", "User"]
    return(
      <div>
        <div class="value">Register as: {value}</div>
        <select
          list="data"
          type="dropdown"
          className="btn btn-success"
          onChange={(e)=>setValue(e.target.value)}
        >
          <option></option>
          <option label for="admin">Admin</option>
          <option label for="user">User</option>
        </select>
        <datalist id="data">
          {data.map((op)=><option>{op}</option>)}
        </datalist>
      </div>
    );
}
export default DropBar;