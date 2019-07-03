import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props)  {
    super(props);
    this.state = { 
      loading: true, 
      chatbarDefaults: {
        currentUser: 'Set a display name',
        newContent: 'feeling chatty? add message + ENTER'
      },
      messageDetail: [],
      isOpened: false
    }
  }
  sendMsg(msg) {
  if (this.state.isOpened) {
    this.socket.send(JSON.stringify(msg));
  } else {
    console.log('can not send msg when ws is closed');
  }
}

  addNewMessage = (newMessage, displayName) => {
    const oldMessages = this.state.messageDetail;
    this.sendMsg(newMessage);
    this.setState({ 
      chatbarDefaults: { currentUser: displayName, newContent: ''},
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });      
    }, 1000)

    this.socket = new WebSocket('ws://localhost:3001');


    this.socket.addEventListener('open', () => {
      this.setState({isOpened: true });
      console.log('websocket connection is open');
    });

    this.socket.addEventListener('message', (msg) => {
      const socketMsg = JSON.parse(msg.data);
      const initialLoad = socketMsg.initialLoad;
      const newMessage = socketMsg.messageId; 
      
      if (initialLoad) {
        this.setState({ messageDetail: initialLoad });
      } else if (newMessage) {
        this.setState({ messageDetail: [...initialLoad, newMessage]})
      } else {
        console.log('incoming socket message: ', socketMsg);
      }

    });

    this.socket.addEventListener('close', () => {
      this.setState({ isOpened: false });
      console.log('server went away');

    });
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
