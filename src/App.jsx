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
        newContent: 'feeling chatty? add message + ENTER',
        oldName: 'Anonymous'
      },
      messageType: 'newMessage',
      postDetail: [],
      isOpened: false,
      numOfUsers: 1
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
    const { currentUser } = this.state.chatbarDefaults;
    const { displayName } = newMessage;
    if (newMessage.messageType === 'newMessage') {
      this.setState({messageType: 'newMessage'})
      this.sendMsg(newMessage);
    }
    if (newMessage.messageType === 'notification') {
      this.sendMsg({ nameNotify: { oldName: currentUser, currentUser: displayName } });
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
      const { postDetail, numOfUsers } = this.state;
      const oldMessages = postDetail;
      const currentUserCount = numOfUsers;

      switch (compareType[0]) {

        case ('initialLoad'):
          this.setState({ messageType: 'newMessage', postDetail: initialLoad });
          break;

        case ('newMessage'):
        this.setState({ postDetail: [...oldMessages, newMessage] });
          break;

        case ('numberOfUsers'):
        if (numberOfUsers !== currentUserCount) {this.setState({ numOfUsers: numberOfUsers }) } 
          break;

        case ('nameNotify'):
          const { oldName, currentUser } = nameNotify;
          const notifyPost = { currentUser, oldName, newContent: '' };
          this.setState({
            postDetail: [...oldMessages, notifyPost],
            messageType: 'notification',
            chatbarDefaults: notifyPost
          })
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
    const { loading, postDetail, chatbarDefaults, numOfUsers, messageType} = this.state;
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
          <MessageList data={ {postDetail}  } />
          <ChatBar newData={ this.addNewMessage } user={chatbarDefaults} />
        </div>
      );
    }
  }

}
export default App;
