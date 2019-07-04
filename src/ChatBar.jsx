import React, { Component } from 'react';


class ChatBar extends Component {
  
  handleNewName = e => {
    const displayName = this.refs.displayName.value;
    const addNewMessage = this.props.newData;
    if (e.charCode == 13) {
      addNewMessage({ messageType: 'notification', displayName});
    }
  }
  
  handleNewMessage = e => {

    const displayName = this.refs.displayName.value || 'Anonymous';
    const updateMessage = this.refs.newMessage.value;
    const addNewMessage = this.props.newData;
    if (e.charCode == 13) {
      console.log(e.target)

      addNewMessage({ messageType: 'newMessage', username: displayName, content: updateMessage});
      this.refs.newMessage.value = '';
    }

  }

  render() {
    const  { currentUser, newContent } = this.props.user;
    return (
      <footer className="chatbar">
          <input 
          className="chatbar-username"
            ref="displayName"
            placeholder={currentUser} 
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
