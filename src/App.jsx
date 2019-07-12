import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = { 
      loading: true, 
      chatbarDefaults: {
        currentUser: 'Anonymous',
        nameColor: '',
        newContent: 'feeling chatty? add message + ENTER',
        oldName: 'Anonymous'
      },
      messageType: 'newMessage',
      postDetail: [],
      isOpened: false,
      numOfUsers: 1
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
      // const compareType = Object.keys(socketMsg);
      // const incomingServer = compareType[0];
      const { initialLoad,  newMessage, numberOfUsers, nameNotify } = socketMsg;
      //* state deconstruction
      const { postDetail, numOfUsers } = this.state;
      const oldMessages = postDetail;
      const currentUserCount = numOfUsers;
      if (initialLoad) {
        this.setState({
          messageType: 'newMessage',
          postDetail: initialLoad
        });      
      }
      if (numberOfUsers) {
        if (numberOfUsers !== currentUserCount) {
          this.setState({
            numOfUsers: numberOfUsers
          })
        }
      }
      if (nameNotify || newMessage) {
        if (nameNotify && newMessage) {
          this.incomingServerPost(nameNotify, newMessage);
        }
        if (nameNotify) {  
          this.incomingServerPost(nameNotify, undefined);
        }
        if (newMessage) {
          this.incomingServerPost(undefined, newMessage);        
        }
      }
    });
    this.socket.addEventListener('close', () => {
      this.setState({ isOpened: false });
      console.log('server went away');
    });
  }
  render() {
    const { loading, postDetail, chatbarDefaults, numOfUsers} = this.state;
    const displayUsers = (numOfUsers === 1) ? (`${ numOfUsers } user online`) : (`${ numOfUsers } users online`)
    if (loading) {
      return (
        <div className='loading'>
          <h1>Loading...</h1> 
          <i className="fa fa-comment"></i>
        </div>
      )
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty <i className="fa fa-comment"></i></a>
            <div className='navbar-users'>
              { displayUsers }
            </div>
          </nav>
          <MessageList data={ postDetail }/>
          <ChatBar newData={ this.addNewMessage } user={ chatbarDefaults } />
        </div>
      );
    }
  }
  addNewMessage = (newMessage) => {
    const { currentUser } = this.state.chatbarDefaults;
    const currentState = this.state;
    const { displayName } = newMessage;
    if (newMessage.messageType === 'notification') {
      this.sendMsg({ nameNotify: { oldName: currentUser, currentUser: displayName } });
    }
    if (newMessage.messageType === 'newMessage') {
      this.sendMsg({ newMsg: newMessage, currentUser });
      if (currentUser !== displayName) {
        this.sendMsg({ nameNotify: { oldName: currentUser, currentUser: displayName } });
      }
    }
    currentState.chatbarDefaults.currentUser = displayName;
    currentState.chatbarDefaults.oldName = currentUser;
    this.setState(currentState)
  }
  sendMsg(msg) {
    if (this.state.isOpened) {
      this.socket.send(JSON.stringify(msg));
    } else {
      console.log('can not send msg when ws is closed');
    }
  }
  incomingServerPost(nameNotify, newMessage) {
    const { postDetail } = this.state;
    const oldMessages = postDetail;
    if (nameNotify && newMessage) {
      this.incomingServerPost(nameNotify, undefined);
      this.incomingServerPost(undefined, newMessage);
    }
    if (nameNotify) {
      this.setState({
        postDetail: [...oldMessages, nameNotify],
        messageType: 'notification'
      })
    }
    if (newMessage) {
      this.setState({
        messageType: 'newMessage',
        postDetail: [...oldMessages, newMessage]
      });
    }
  }
}
export default App;
