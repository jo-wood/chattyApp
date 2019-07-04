

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {


  renderToMessageList(postDetail) {

    let messageList = [];

    const currentList = (postDetail.map(message => {
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
    const { postDetail } = this.props.data;
    const checkType = (<div>{this.renderToMessageList(postDetail)}</div>);

    return (
    <main className="messages">
      { checkType }
    </main>
    );
  }
}
export default MessageList;