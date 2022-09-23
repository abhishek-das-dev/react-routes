// Reference react router -  https://reactrouter.com/en/v6.3.0/getting-started/overview
// https://reactrouter.com/en/v6.3.0/getting-started/overview#descendant-routes


import React, { useEffect, useState } from "react";

const HooksComponent = () => {
  const [name, setname] = useState("Moonraft");
  const [users, setUsers] = useState(null);

  const changeName = () => {
    setname("Moonraft Innovations");
  };

  useEffect(() => {
    console.log("%c Name " + name, 'font-size: 24px; color: grey;');
    return () => console.log("%c unmounting... clean up here", 'font-size: 24px; color: yellow;');
  }, [name]);

  const endPoint =
    "https://my-json-server.typicode.com/ifeanyidike/jsondata/users";

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await fetch(endPoint);
      setUsers(await resp.json());
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>HooksComponent</h2>
      <h4>Name - {name}</h4>
      <button onClick={changeName}>Update name</button>
      <hr />
      {users &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <h5>Id: {user.id}</h5>
              <h5>Name: {user.name}</h5>
              <h5>Job: {user.job}</h5>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default HooksComponent;
