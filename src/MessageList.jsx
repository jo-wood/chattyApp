

import React, { Component } from 'react';
import Message from './Message.jsx'

class MessageList extends Component {
  render() {
    return (
      <div>
        <Message />
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </div>
    );
  }
}
export default MessageList;