

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


  renderToMessageList(messageType, messages, notification) {

    let messageList = [];

    const currentList = (messages.map(message => {
      if (message.messageId) {
        const { username, content, messageId } = message;
        return (<Message key={messageId} type={'newMessage'} user={username} content={content} />);
      } else if (!(message.messageId)){
        const { currentUser, fromName } = message;
        return (<Message type={'notification'} oldName={fromName} newName={currentUser} />)        
      }
    }));
    messageList.push(currentList);
    
    return messageList.map(post => {
      return post;
    });
  }

  render() {
    const { data } = this.props;
    const { messageType, messages, notification} = data;
    const checkType = (<div>{this.renderToMessageList(messageType, messages, notification)}</div>);
    // const renderList = (messages.length !== checkType.length) && this.messageList    

    return (
    <main className="messages">
      { checkType }
    </main>
    );
  }
}
export default MessageList;