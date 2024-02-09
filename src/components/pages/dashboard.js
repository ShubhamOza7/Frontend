import Navigation from "../inc/navigation";
import "../pagesCSS/DashboardCSS.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://flask-app-hmq66d7qyq-uc.a.run.app/transaction")
      // fetch("http://127.0.0.1:8000/transaction")
      .then((response) => response.json())
      .then((data) => {
        setData([data]); // Set the fetched data into the state
      });
  }, []);

  return (
    <div className="dashcontainer mt-5">
      <div className="mb-4">
        <h2 className="dash">DASHBOARD</h2>
        <Navigation />
        <p>Welcome</p>
      </div>
      {/* <table className="table">
        <thead>
          <tr>
            <th>Image Name</th>
            <th>Result</th>
            <th>Block Hash</th>
            <th>Block Number</th>
            <th>Transaction Hash</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.imageName}</td>
              <td>{item.result}</td>
              <td>{item.blockHash}</td>
              <td>{item.blockNumber}</td>
              <td>{item.hash}</td>
              <td>
                <a href={item.url}>View Image</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {data.map((item, itemIndex) => (
        <table className="table" key={itemIndex}>
          <tbody>
            <tr>
              <th>Image Name</th>
              <td>{item.imageName}</td>
            </tr>
            <tr>
              <th>Result</th>
              <td>{item.result}</td>
            </tr>
            <tr>
              <th>Block Hash</th>
              <td>{item.blockHash}</td>
            </tr>
            <tr>
              <th>Block Number</th>
              <td>{item.blockNumber}</td>
            </tr>
            <tr>
              <th>Hash</th>
              <td>{item.hash}</td>
            </tr>
            <tr>
              <th>URL</th>
              <td>
                <a href={item.url}>View Image</a>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Dashboard;
