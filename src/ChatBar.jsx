import React, { Component } from 'react';

class ChatBar extends Component {
  render() {
    const { username } = this.props;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" value={ username } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
