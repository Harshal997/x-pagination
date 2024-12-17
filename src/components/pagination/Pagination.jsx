import React, { useEffect, useState } from "react";
import "./pagination.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.error("failed to fetch data");
      }
    };
    getData();
  }, []);
  console.log("data", data);
  return (
    <div className="table-container">
      <h1 style={{ textAlign: "center" }}>Employee Table Data</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(start, end).map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="paginationContainer">
        <button
          disabled={start === 0}
          onClick={() => {
            setStart((start) => start - 10);
            setEnd((end) => end - 10);
            setPage((page) => page - 1);
          }}
        >
          Previous
        </button>
        <p>{page}</p>
        <button
          disabled={end === 50}
          onClick={() => {
            setStart((start) => start + 10);
            setEnd((end) => end + 10);
            setPage((page) => page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
