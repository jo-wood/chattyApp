import React, { Component } from 'react';

class Message extends Component{

  checkPropType(props) {
    let { type } = props;
    if (type === 'message') {
      const { user, content } = props;
      return (
        <div className="message" >
          <span className="message-username">{user}</span>
          <span className="message-content">{content}</span>
        </div>
      );
    } else if (type === 'notification') {
      const { oldName, newName } = props;
      return this.notifyNameChange(oldName, newName);
    }
  }

  notifyNameChange(currentUser, fromName) {
    const checkIfNameUpdate = (currentUser !== fromName && fromName !== 'first-change' && fromName !== 'Set a display name');
    const nameChangeString = `${fromName} changed their name to ${currentUser}`;
    if (checkIfNameUpdate) {
      return (
        <div className="message system">
          {nameChangeString}
        </div>);
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        {this.checkPropType(this.props)}
      </div>
    )
  }

}
export default Message;
