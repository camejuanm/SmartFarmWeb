import React, {useState} from "react";
import "./dropdown.css";

function DropMenu() {
    const [value, setValue] = useState("")
    const data = ["Admin", "User"]
    return(
      <div>
        <div class="value">Register as: {value}</div>
        <select
          list="data"
          type="dropdown"
          className="form-group"
          onChange={(e)=>setValue(e.target.value)}
          required
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
export default DropMenu;