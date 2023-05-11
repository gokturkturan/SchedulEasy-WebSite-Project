import React from "react";
import { Avatar } from "@mui/material";
import { ChatBox, ReceiverMessage, SenderMessage } from "mui-chat-box";
import EmptyMessage from "../UI/EmptyMessage";

const Chat = ({ messages, username }) => {
  var messageElements = [];
  if (messages === null) {
    messageElements = [<EmptyMessage></EmptyMessage>];
  } else {
    const keys = Object.keys(messages);
    keys.forEach((messageKey) => {
      const avatar = messages[messageKey]["username"][0].toUpperCase();
      if (messages[messageKey]["username"] === username) {
        messageElements.push(
          <SenderMessage avatar={<Avatar>{avatar}</Avatar>}>
            {messages[messageKey]["message"]}
          </SenderMessage>
        );
      } else {
        messageElements.push(
          <ReceiverMessage avatar={<Avatar>{avatar}</Avatar>}>
            {messages[messageKey]["message"]}
          </ReceiverMessage>
        );
      }
    });
  }

  return (
    <div>
      <ChatBox>{messageElements}</ChatBox>
    </div>
  );
};

export default Chat;
