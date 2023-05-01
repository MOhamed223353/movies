import React from "react";

export default function Profile({ userData }) {
  return (
    <>
      <div className="row min-vh-100 align-items-center ">
        <div className="profile align-items-center w-50  py-4 m-4 m-auto text-center">
          <h2>
            Name: 
            <span className="text-danger"> {userData?.first_name}
            {userData?.second_name}</span>
          </h2>
          <h2 className="my-4">Age: <span className="text-danger">{userData?.age}</span></h2>
          <h2>Email: <span className="text-danger">{userData?.email}</span></h2>
        </div>
      </div>
    </>
  );
}
