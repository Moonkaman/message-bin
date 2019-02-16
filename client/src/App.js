import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";

import { connect, sendMessage, recieveMessage } from "./api";

import "./App.css";

import Message from "./Message";

library.add(faBox);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: "",
      name: ""
    };

    connect((message, time) => {
      this.setState({
        messages: [
          ...this.state.messages,
          { message: "Connected", name: "User", time: time }
        ]
      });
    });

    recieveMessage((newMessage, name, time) => {
      this.setState({
        messages: [
          ...this.state.messages,
          {
            message: newMessage,
            name: name,
            time: time
          }
        ]
      });
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  send = e => {
    e.preventDefault();
    sendMessage(
      this.state.newMessage,
      this.state.name === "" ? "User" : this.state.name
    );
    this.setState({
      newMessage: ""
    });
  };

  render() {
    return (
      <div className="App">
        <h1>
          Message Bin <FontAwesomeIcon icon="box" />
        </h1>
        <div className="messages-cont">
          {this.state.messages.map((message, index) => (
            <Message
              key={index}
              index={index}
              message={message}
              last={index === this.state.messages.length - 1}
            />
          ))}
        </div>
        <form onSubmit={this.send}>
          <div className="message-flex">
            <textarea
              type="text"
              value={this.state.newMessage}
              onChange={this.handleChange}
              name="newMessage"
              placeholder="Message"
            />
            <button>Send</button>
          </div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default App;
