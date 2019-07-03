import React, { Component } from 'react';


class ChatBar extends Component {

  
  handleNewMessage = e => {
    const updateName = this.refs.displayName.value || 'Anonymous';
    const updateMessage = this.refs.newMessage.value;
    const addNewMessage = this.props.newData;
    if (e.charCode == 13) {
      console.log();
      
      addNewMessage( { username: updateName, content: updateMessage, id: Date.now() }, updateName);
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
            onChange={this.handleNewMessage} />
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
