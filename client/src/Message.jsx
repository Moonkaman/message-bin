import React from "react";

const Message = props => {
  return (
    <div className={props.last ? "message-cont" : "message-cont border"}>
      <p>
        <strong>{props.message.name}:</strong> {props.message.message}
      </p>
      <p>{props.message.time}</p>
    </div>
  );
};

export default Message;
