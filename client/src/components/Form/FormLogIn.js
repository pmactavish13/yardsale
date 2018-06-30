import React from "react";
import "./Form.css";

export const FormLogIn = ({ children }) => (
  <form className="p-4">
    <div className="form-group">
    <label>Email address</label>
    <input type="email" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
    </div>
    <div className="form-group">
      <label>Password</label>
      <input type="password" className="form-control" id="exampleDropdownFormPassword2" placeholder="Password" />
    </div>
    <div className="form-check">
        <input type="checkbox" className="form-check-input" id="dropdownCheck2" />
        <label className="form-check-label">Remember me</label>
    </div>
    <button type="submit" className="btn btn-primary">Sign in</button>
      {children}
  </form>

);