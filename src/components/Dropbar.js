import React, {useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';

function DropBar() {
    const [dropdown, setDropdown] = useState("");
    const data = ["Admin", "User"];
    return(
      <>
      <div>
        <div class="value">Register as: {dropdown}</div>
        <Dropdown className="d-inline mx-2" onChange={(e)=>setDropdown(e.target.value)}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {dropdown}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item key='1' onClick={(e) => {setDropdown("")}}>
            </Dropdown.Item>  
            <Dropdown.Item key='2' onClick={(e) => {setDropdown("Admin")}}>Admin
            </Dropdown.Item>
            <Dropdown.Item key='3' onClick={(e) => {setDropdown("User")}}>User
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
    );
}
export default DropBar;