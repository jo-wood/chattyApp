

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  render() {
    const messageObj = this.props.data;
    const messageInfo = messageObj.map(message => {
      const { username, content, messageId } = message;
      return <Message key={messageId} user={username} content={content} />;
    });

  return (
    <main className="messages">
      { messageInfo }
      {/* <div className="message system">
        Anonymous1 changed their name to nomnom.
        </div> */}
    </main>
    );
  }
}
export default MessageList;