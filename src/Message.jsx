import React, { Component } from 'react';

class Message extends Component{

  checkPropType(props) {
    let { type } = props;
    if (type === 'newMessage') {
      const { user, content } = props;
      return (
        <div className="message" >
          <span className="message-username">{user}</span>
          <span className="message-content">{content}</span>
        </div>
      );
    } else if (type === 'notification') {
      const { fromName, toName, } = props;
        return this.notifyNameChange(fromName, toName);
    }
  }

  notifyNameChange(fromName, toName) {
    if (fromName !== toName) {
      const nameChangeString = ' changed their name to ';
      return (
        <div className="notification">
          <em>{fromName}</em>
          {nameChangeString}
          <strong>{toName}</strong>
        </div>);
    }

  }

  render() {
    const post = this.checkPropType(this.props);
    return (
      <div>
        {post}
      </div>
    )
  }

}
export default Message;
