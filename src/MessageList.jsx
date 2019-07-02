

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  render() {
    const messageObj = this.props.data;
    const messageInfo = messageObj.map(message => {
      return <Message key={message.id} user={message.username} content={message.content} />;
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