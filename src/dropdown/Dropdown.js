import React, {useState} from "react";
import "./dropdown.css";

function Dropdown() {
    const [value, setValue] = useState("")
    const data = ["Admin", "User"]
    return(
        <div className="main">
            <div class="value">Register as: {value}</div>
            <input
                list="data"
                type="dropdown"
                className="form-group"
                onChange={(e)=>setValue(e.target.value)}
                placeholder="Choose one"
            />
            <datalist id="data">
                {data.map((op)=><option>{op}</option>)}
            </datalist>
        </div>
    );
}
export default Dropdown;