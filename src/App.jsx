import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import  messages  from './messages-db.js';


class App extends Component {
  constructor(props)  {
    super(props);
    this.state = { 
      loading: true, 
      chatbarDefaults: {
        currentUser: 'BobbyBoi',
        newContent: 'feeling chatty? add message + ENTER'
      },
      messageDetail: messages};
  }

  addNewMessage = (newMessage, displayName) => {
    const oldMessages = this.state.messageDetail;
    this.setState({ 
      messageDetail: [...oldMessages, newMessage], 
      chatbarDefaults: { currentUser: displayName, newContent: ''}
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });      
    }, 1000)
  }

  render() {

    const { loading, messageDetail, chatbarDefaults } = this.state;

    if (loading) {
      return <h1>Loading...</h1> 
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList data={ messageDetail } />
          <ChatBar newData={ this.addNewMessage } user={chatbarDefaults} />
        </div>
      );
    }
  }


}
export default App;
