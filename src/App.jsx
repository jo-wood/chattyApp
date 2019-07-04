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
        fromName: 'first-change',
        newContent: 'feeling chatty? add message + ENTER'
      },
      messageDetail: [],
      isOpened: false,
      numOfUsers: 1, 
      messageType: 'newMessage'
    }
  }


  sendMsg(msg) {
  if (this.state.isOpened) {
    this.socket.send(JSON.stringify(msg));
  } else {
    console.log('can not send msg when ws is closed');
  }
}

  addNewMessage = (newMessage) => {
    if (newMessage.messageType === 'newMessage') {
      this.setState({messageType: 'newMessage'})
      this.sendMsg(newMessage);
    }
    if (newMessage.messageType === 'notification') {
      this.setState({ messageType: 'notification' })
      const {displayName} = newMessage;
      const currentName = this.state.chatbarDefaults.currentUser;
      this.sendMsg({ nameNotify: { oldName: currentName, toName: displayName } });
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false });      
    }, 1000)

    this.socket = new WebSocket('ws://localhost:3001');


    this.socket.addEventListener('open', () => {
      this.setState({isOpened: true });
    });

    this.socket.addEventListener('message', (msg) => {

      //* websocket deconstruction
      const socketMsg = JSON.parse(msg.data);
      const compareType = Object.keys(socketMsg);
      const { initialLoad, newMessage, numberOfUsers, nameNotify } = socketMsg;


      //* state deconstruction
      const { messageDetail, numOfUsers } = this.state;
      const oldMessages = messageDetail;
      const currentUserCount = numOfUsers;

      switch (compareType[0]) {

        case ('initialLoad'):
          this.setState({messageType: 'initialLoad',  messageDetail: initialLoad });
          break;
        case ('newMessage'):

        this.setState({ messageDetail: [...oldMessages, newMessage] });
          break;
        case ('numberOfUsers'):

        if (numberOfUsers !== currentUserCount) {this.setState({ numOfUsers: numberOfUsers }) } 
          break;
        case ('nameNotify'):
          const { oldName, toName } = nameNotify;
          this.setState({ chatbarDefaults: { currentUser: toName, fromName: oldName, newContent: '' } });
          break;
        default:
          console.log('websocket sent msg to client');
          break;
      }
      
    });

    this.socket.addEventListener('close', () => {
      this.setState({ isOpened: false });
      console.log('server went away');

    });
  }

  render() {
    const { loading, messageDetail, chatbarDefaults, numOfUsers, messageType} = this.state;
    const displayUsers = (numOfUsers === 1) ? (`${numOfUsers} user online`) : (`${numOfUsers} users online`)
    if (loading) {
      return <h1>Loading...</h1> 
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
            <div className='navbar-users'>
              {displayUsers}
            </div>
          </nav>
          <MessageList data={ {messageType, messages: messageDetail, notification: chatbarDefaults}  } />
          <ChatBar newData={ this.addNewMessage } user={chatbarDefaults} />
        </div>
      );
    }
  }

}
export default App;
