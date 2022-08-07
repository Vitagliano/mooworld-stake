import React from "react";

export default function Container(props) {
  return (
    <div className={`bg-purple container py-8 mx-auto xl:px-0`}>
      {props.children}
    </div>
  );
}
