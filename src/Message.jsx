import React, { Component } from 'react';

class Message extends Component{

  checkPropType(props) {
    let { type } = props;
    if (type === 'newMessage') {
      const { user, content, displayColor } = props;
      const style = {
        color: displayColor
      }
      return (
        <div className="message" >
          <span style={style} className="message-username">{user}</span>
          <span className="message-content">{content}</span>
        </div>
      );
    } else if (type === 'notification') {
      const { fromName, toName, displayColor } = props;
        return this.notifyNameChange(fromName, toName, displayColor);
    }
  }

  notifyNameChange(fromName, toName, displayColor) {
    const style = {
      color: displayColor
    }
    if (fromName !== toName) {
      const nameChangeString = ' changed their name to ';
      return (
        <div className="notification">
          <em>{fromName}</em>
          {nameChangeString}
          <strong style={style}>{toName}</strong>
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
