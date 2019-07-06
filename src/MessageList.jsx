

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


  renderToMessageList(data) {
    
    let messageList = [];

    const currentList = (data.map(message => {
      if (message.messageId) {
        const { username, content, messageId, nameColor } = message;
        return (<Message key={messageId} type={'newMessage'} user={username} displayColor={nameColor} content={content} />);
      } else {
        const { currentUser, oldName, nameColor } = message;
        return (<Message type={'notification'} fromName={oldName} toName={currentUser} displayColor={nameColor}/>)        
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