import React, { Component } from 'react';


class ChatBar extends Component {
  
  handleNewName = (e) => {
    const displayName = this.refs.displayName.value;
    const addNewMessage = this.props.newData;
    if (e.charCode == 13) {
        addNewMessage({ messageType: 'notification', displayName });
    }
  }
  
  handleNewMessage = e => {

    const displayName = this.refs.displayName.value || 'Anonymous';
    console.log(displayName)
    const updateMessage = this.refs.newMessage.value;
    const addNewMessage = this.props.newData;
    if (e.charCode == 13 && updateMessage) {

      addNewMessage({ messageType: 'newMessage', username: displayName, content: updateMessage});
      this.refs.newMessage.value = '';
    }

  }

  render() {
    const  { currentUser, newContent} = this.props.user;
    const placeholder = (currentUser === 'Anonymous') ? 'Set a display name' : currentUser 
    return (
      <footer className="chatbar">
          <input 
          className="chatbar-username"
            ref="displayName"
            placeholder={placeholder} 
            onKeyPress={this.handleNewName} />
          <input 
            className="chatbar-message"
            ref="newMessage"
            placeholder={newContent}
            onKeyPress={this.handleNewMessage}
          />
      </footer>
    );
  }
}
export default ChatBar;
