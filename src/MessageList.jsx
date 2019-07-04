

import React, { Component } from 'react';
import Message from './Message.jsx'


class MessageList extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentPosts: []
    }
  }

  renderToMessageList(messageType, postInfo ) {
    const { currentPosts } = this.state;

    if (messageType === 'initialLoad') {
      const initialLoad = (postInfo.map(message => {
        const { username, content, messageId } = message;
        return (<Message key={messageId} type={'newMessage'} user={username} content={content} />);
      }));
    currentPosts.push(initialLoad);

    } else if (messageType === 'newMessage') {
      const newMessage = postInfo[postInfo.length - 1];
      const { username, content, messageId } = newMessage;
      currentPosts.push(<Message key={messageId} type={'newMessage'} user={username} content={content} />);

    } else if (messageType === 'notification'){
      const { currentUser, fromName } = postInfo;
      currentPosts.push(<Message type={'notification'} oldName={fromName} newName={currentUser} />);
    }
    return currentPosts.map((post) => {      
      return  post 
    });
  } 

  render() {
    const { data }= this.props;
    const { messageType, messages, notification} = data;

    const checkType = (messageType === 'newMessage' || messageType === 'initialLoad') ? (<div>{this.renderToMessageList(messageType, messages)}</div>) : (<div>{this.renderToMessageList(messageType, notification)}</div>)

    return (
    <main className="messages">
      { checkType }
    </main>
    );
  }
}
export default MessageList;