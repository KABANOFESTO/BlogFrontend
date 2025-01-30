import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/user.css";
import avatar from "../../Images/commetor-avatar.png";

export const Users = () => {
  // ============== fetching data =============
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/users/get/users"
      );
      const data = response.data.data;
      setData(data);
    };
    getData();
  }, []);
  return (
    <div className="user-section container-section">
      <div className="table-container">
        <div className="title-container">
          <div>
            <h1 className="title">User's Information</h1>
          </div>
          <div className="search-form">
            <input type="text" placeholder="search..." id="inputs"/>
            <button className="user-search-btn">
              <iconify-icon icon="ion:search-outline"></iconify-icon>
            </button>
          </div>
        </div>
        <table className="table">
          <thead className="thead">
            <tr className="list">
              <th className="user">User Details</th>
              <th className="status">Status</th>
              <th className="role">Role</th>
              <th className="action">Action</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {data.map((item, index) => {
              return (
                <tr className="list" key={index}>
                  <th className="user">
                    <img src={avatar} alt="" className="icon" />
                    <div className="names-or-email">
                      <div className="name">
                        {item.firstName}&nbsp;{item.lastName}
                      </div>
                      <div className="email">{item.email}</div>
                    </div>
                  </th>
                  <th className="status">
                    <div className="active">Active</div>
                  </th>
                  <th className="role">{item.role}</th>
                  <th className="action">
                    <div className="action-btn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
