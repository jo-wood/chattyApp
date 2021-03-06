

import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  renderToMessageList(data) {
    return data.map(message => {
      // if a name notification:
      if (!message.messageId) {
        const { currentUser, oldName, nameColor } = message;
        return (
          <div>
            <Message
              type={'notification'}
              fromName={oldName}
              toName={currentUser}
              displayColor={nameColor} />
          </div>
        ) 
      // if a new message
      } else  {
        const { username, content, messageId, nameColor } = message;
        return (
          <div>
            <Message
              key={messageId}
              type={'newMessage'}
              user={username}
              displayColor={nameColor}
              content={content} />
          </div>
        );      
      }
    });
  }
  render() {
    const { data } = this.props;
    const renderList = this.renderToMessageList(data);
    return (
    <main className="messages">
        { renderList }
    </main>
    );
  }
}
export default MessageList;