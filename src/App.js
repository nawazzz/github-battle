import './App.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ghData: {},
      inputValue: ''
    }
  }

  componentDidMount() {
    const url = "https://api.github.com/users/nawazzz"
    fetch(url).then(res => res.json()).then(data => {
      console.log(data)
      this.setState({
        ghData: data
      })
    })
  }

  handleInputValue = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
      <div className="App">
        <h1>Github Battle</h1>
        <h2>User: {this.state.ghData.login}</h2>
        <h3>Job: {this.state.ghData.bio}</h3>
      </div>
      <div>
      <TextField 
        id="outlined-basic" value={this.state.inputValue} onChange={this.handleInputValue}
        label="Enter GitHub user" variant="outlined" />
      <Button variant="contained"
        style={{height: "55px"}}
        >Submit</Button>
      </div>
      </React.Fragment>
    )
  }
}

export default App;
