import React, { Component } from 'react';

class  Message extends Component{
  render() {
    const { user, content } = this.props;
    return (
      <div className="message">
        <span className="message-username">{user}</span>
        <span className="message-content">{content}</span>
      </div>
    );
  }

}
export default Message;
