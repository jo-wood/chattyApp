

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


  renderToMessageList(data) {
    
    let messageList = [];

    const currentList = (data.map(message => {
      if (message.messageId) {
        const { username, content, messageId } = message;
        return (<Message key={messageId} type={'newMessage'} user={username} content={content} />);
      } else {
        const { currentUser, oldName } = message;
        return (<Message type={'notification'} fromName={oldName} toName={currentUser} />)        
      }
    }));
    messageList.push(currentList);
    
    return messageList.map(post => {
      return post;
    });
  }

  render() {
    const { data } = this.props;
    const checkType = (<div>{this.renderToMessageList(data)}</div>);

    return (
    <main className="messages">
      { checkType }
    </main>
    );
  }
}
export default MessageList;