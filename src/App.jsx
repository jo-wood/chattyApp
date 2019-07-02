import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import  messages  from './messages-db.js';


class App extends Component {
  constructor(props)  {
    super(props);
    this.state = { loading: true, currentUser: '', messageDetail: []};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, currentUser: 'BobbyBoi', messageDetail: messages});
    }, 3000)
  }

  render() {

    const { loading, currentUser, messageDetail} = this.state;

    if (loading) {
      return <h1>Loading...</h1> 
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList data={ messageDetail } />
          <ChatBar username={ currentUser } />
        </div>
      );
    }
  }
}
export default App;
