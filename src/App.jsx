import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props)  {
    super(props);
    this.state = { loading: true, currentUser: '' };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loading: false, currentUser: 'BobbyBoi' });
    }, 3000)
  }

  render() {

    const { loading, currentUser } = this.state;

    if (loading) {
      return <h1>Loading...</h1> 
    } else {
      return (
        <div>
          <nav className="navbar">
            <a href="/" className="navbar-brand">Chatty</a>
          </nav>
          <MessageList />
          <ChatBar username={ currentUser } />
        </div>
      );
    }
  }
}
export default App;
