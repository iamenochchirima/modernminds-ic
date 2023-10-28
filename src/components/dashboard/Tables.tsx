import React from "react";
import CardTable from "./cards/CardTable";

// components

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          {/* <CardTable /> */}
          <h1>CardTable Component should be here</h1>
        </div>
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
    </>
  );
}