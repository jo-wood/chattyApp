

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  renderToMessageList({messageType,  messages, notification }) {
    if (Array.isArray(messages)){
      return (messages.map(message => {
        const { username, content, messageId } = message;
        return <Message key={messageId} type={'message'} user={username} content={content} />
      }));
    } 
    const { username, content, messageId } = messages;
    const { currentUser, fromName } = notification;
    if (messageType === 'notification') {
      return <Message type={'notification'} oldName={fromName} newName={currentUser} />
    } else if (messageType === 'message') {
      return <Message key={messageId} type={'message'} user={username} content={content} />
    } 

  }

  render() {
    const { props }= this;
    const messageInfo = (<div>{this.renderToMessageList(props.data)}</div>);

    return (
    <main className="messages">
      { messageInfo }
    </main>
    );
  }
}
export default MessageList;