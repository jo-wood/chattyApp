import React, { Component } from 'react';

class Message extends Component{
  renderMessage(props) {
    const { user, content, displayColor } = props;
    const style = { color: displayColor }
    return (
      <div className="message" >
        <span style={ style } className="message-username">
          { user }
        </span>
        <span className="message-content">
          { content }
        </span>
      </div>
      )
    } 
  renderNotification(props) {
    const { fromName, toName } = props;
    if (fromName == 'Anonymous') {
      return (
        <div className="notification">
          { toName }
          {` has joined the convo `}
        </div>
      )
    } else if (toName == 'Anonymous'){
      return (
        <div className="notification">
        </div>
      )      
    } else {
      return (
        <div className="notification">
          { fromName }
          { ' changed their name to ' }
          { toName }
        </div>
      )
    }
  }
  render() {
    const message = (this.renderMessage(this.props)) 
    const notification = (this.renderNotification(this.props))
    const { type } = this.props;
    const post = (type == 'newMessage') ? message : notification
    return (
      <div>
        { post }
      </div>
    )
  }
}
export default Message;