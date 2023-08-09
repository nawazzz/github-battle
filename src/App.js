import './App.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BattleResult from './Battle-result';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ghData: {},
      ghDataSecondUser: {},
      inputValueOne: '',
      inputValueTwo: '',
      handleButtonOne: true,
      handleButtonTwo: true,
      showResult: false
    }
  }

  componentDidMount() {
    // const url = "https://api.github.com/users/nawazzz"
    // fetch(url).then(res => res.json()).then(data => {
    //   console.log(data)
    //   this.setState({
    //     ghData: data 
    //   })
    // })
    console.log(this.state.handleButtonOne, this.state.handleButtonTwo)
  }

  handleinputValueOne = (event) => {
    this.setState({
      inputValueOne: event.target.value
    })
  }

  handleSubmitButtonOne = (event) => {
    if (this.state.inputValueOne) {
      this.setState({
        handleButtonOne: !this.state.handleButtonOne
      })
      const url = `https://api.github.com/users/${this.state.inputValueOne}`
      fetch(url).then(res => res.json()).then(data => {
        // console.log(data)
        this.setState({
          ghData: data
        })
      })
    }
    this.setState({
      inputValueOne: ''
    })
  }

  handleUserOutput = (event) => {
    this.setState({
      handleButtonOne: !this.state.handleButtonOne
    })
  }

  handleinputValueTwo = (event) => {
    this.setState({
      inputValueTwo: event.target.value
    })
  }

  handleSubmitButtonTwo = (event) => {
    console.log(event)
    if (this.state.inputValueTwo) {
      this.setState({
        handleButtonTwo: !this.state.handleButtonTwo
      }, () => { console.log(this.state) })
      const url = `https://api.github.com/users/${this.state.inputValueTwo}`
      fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        this.setState({
          ghDataSecondUser: data
        }, () => { console.log(this.state) })
      })
    }
    this.setState({
      inputValueTwo: ''
    })
  }

  handleUserOutputTwo = (event) => {
    this.setState({
      handleButtonTwo: !this.state.handleButtonTwo
    })
  }

  handleResults = (event) => {
    this.setState({
      showResult: true
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showResult ?
          (
            <div>
              <BattleResult ghData={this.state.ghData} ghDataSecondUser={this.state.ghDataSecondUser} inputValueOne={this.state.inputValueOne}
                inputValueTwo={this.state.inputValueTwo} handleButtonOne={this.state.handleButtonOne} handleButtonTwo={this.state.handleButtonTwo}
                showResult={this.state.showResult} />
            </div>
          ) : (
            <div>
              <div>
                <div className="App">
                  <h1>Github Battle</h1>
                  <h2>User: {this.state.ghData.login}</h2>
                  <h3>Job: {this.state.ghData.bio}</h3>
                </div>
                <div style={{ display: 'flex', margin: '50px' }}>
                  <div style={{ display: this.state.handleButtonOne ? "block" : "none" }}>
                    <TextField
                      id="outlined-basic" value={this.state.inputValueOne} onChange={this.handleinputValueOne}
                      label="Enter GitHub user" variant="outlined" />
                    <Button variant="contained"
                      onClick={this.handleSubmitButtonOne}
                      style={{ height: "55px" }}
                    >Submit</Button>
                  </div>
                  <div style={{ display: this.state.handleButtonTwo ? "block" : "none" }}>
                    <TextField
                      id="outlined-basic" value={this.state.inputValueTwo} onChange={this.handleinputValueTwo}
                      label="Enter GitHub user" variant="outlined" />
                    <Button variant="contained"
                      onClick={this.handleSubmitButtonTwo}
                      style={{ height: "55px" }}
                    >Submit</Button>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <div style={{ display: !this.state.handleButtonOne ? "block" : "none", width: "200px", height: "50px" }}>
                    <img src={this.state.ghData.avatar_url} width={"100px"} />
                    <span><a href='https://github.com/nawazzz'>{this.state.ghData.login}</a></span>
                    <span onClick={this.handleUserOutput}
                      style={{ cursor: "pointer", fontWeight: "700" }}
                    >x</span>
                  </div>

                  <div style={{ display: !this.state.handleButtonTwo ? "block" : "none", width: "200px", height: "50px" }}>
                    <img src={this.state.ghDataSecondUser.avatar_url} width={"100px"} />
                    <span><a href='https://github.com/nawazzz'>{this.state.ghDataSecondUser.login}</a></span>
                    <span onClick={this.handleUserOutputTwo}
                      style={{ cursor: "pointer", fontWeight: "700" }}
                    >x</span>
                  </div>

                </div>
                <div>
                  <button onClick={this.handleResults}
                    style={{ display: !this.state.handleButtonOne && !this.state.handleButtonTwo ? 'block' : 'none', margin: '100px', cursor: 'pointer' }}
                  >Battle</button>
                </div>
              </div>
            </div>
          )}

      </React.Fragment>
    )
  }
}

export default App;
