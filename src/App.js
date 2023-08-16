import './App.scss';
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import BattleResult from './Battle-result';
import Battling from './Battling';

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
      showResult: false,
      resultDataOne: {},
      resultDataTwo: {},
      totalScoreUserOne: 0,
      totalScoreUserTwo: 0,
      showLoadingPage: false
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
      showResult: !this.state.showResult
    })

    let objUserOne = {
      repoCount: this.state.ghData.public_repos + 0.5,
      followersCount: this.state.ghData.followers + 1,
      followingCount: this.state.ghData.following + 1
    }

    let userOneScore = Math.ceil(objUserOne.repoCount + objUserOne.followersCount + objUserOne.followingCount)

    let objUserTwo = {
      repoCount: this.state.ghDataSecondUser.public_repos + 0.5,
      followersCount: this.state.ghDataSecondUser.followers + 1,
      followingCount: this.state.ghDataSecondUser.following + 1
    }

    let userTwoScore = Math.ceil(objUserTwo.repoCount + objUserTwo.followersCount + objUserTwo.followingCount)

    this.setState({
      resultDataOne: objUserOne,
      resultDataTwo: objUserTwo,
      totalScoreUserOne: userOneScore,
      totalScoreUserTwo: userTwoScore
    })
  }

  render() {
    return (
      <div style={{ display: this.state.showLoadingPage === false ? 'block' : 'none' }}>
        {this.state.showResult ?
          (
            <div>
              <BattleResult ghData={this.state.ghData} ghDataSecondUser={this.state.ghDataSecondUser} inputValueOne={this.state.inputValueOne}
                inputValueTwo={this.state.inputValueTwo} handleButtonOne={this.state.handleButtonOne} handleButtonTwo={this.state.handleButtonTwo}
                showResult={this.state.showResult} resultDataOne={this.state.resultDataOne} resultDataTwo={this.state.resultDataTwo}
                totalScoreUserOne={this.state.totalScoreUserOne} totalScoreUserTwo={this.state.totalScoreUserTwo} />
            </div>
          ) : (
            <div className='mainContainer'>
              <div>
                <div className="app">
                  <h1>Instructions</h1>

                  <div className='heroContainer'>
                    <div style={{textAlign: 'center'}}>
                      <h5>Enter Two GitHub Users</h5>
                      <img src=''/>
                      <p className='users'></p>
                    </div>
                    <div>
                      <h5>Battle</h5>
                      <p className='battle'></p>
                    </div>
                    <div>
                      <h5>See the Winner</h5>
                      <p className='winner'></p>
                    </div>
                  </div>
                </div>
                <h3 style={{textAlign: 'center'}}>Players</h3>
                <div className='inputContainer'>
                  <div style={{ display: this.state.handleButtonOne ? "block" : "none" }}>
                    <TextField
                      id="outlined-basic" value={this.state.inputValueOne} onChange={this.handleinputValueOne}
                      label="Enter GitHub user" variant="outlined" />
                    <Button variant="contained" disabled={!this.state.inputValueOne}
                      onClick={this.handleSubmitButtonOne}
                      style={{ height: "55px", cursor: 'pointer' }}
                    >Submit</Button>
                  </div>
                  <div style={{ display: this.state.handleButtonTwo ? "block" : "none" }}>
                    <TextField
                      id="outlined-basic" value={this.state.inputValueTwo} onChange={this.handleinputValueTwo}
                      label="Enter GitHub user" variant="outlined" />
                    <Button variant="contained" disabled={!this.state.inputValueTwo}
                      onClick={this.handleSubmitButtonTwo}
                      style={{ height: "55px", cursor: 'pointer' }}
                    >Submit</Button>
                  </div>
                </div>
                <div className='searchResultContainer'>
                  <div className='searchResultChildContainer'
                    style={{ display: !this.state.handleButtonOne ? "block" : "none"}}>
                    <img src={this.state.ghData.avatar_url} width={"100px"} />
                    <span><a href='https://github.com/nawazzz'>{this.state.ghData.login}</a></span>
                    <span onClick={this.handleUserOutput}
                      style={{ cursor: "pointer", fontWeight: "700" }}
                    >x</span>
                  </div>

                  <div className='searchResultChildContainer'
                    style={{ display: !this.state.handleButtonTwo ? "block" : "none" }}>
                     <img src={this.state.ghDataSecondUser.avatar_url} width={"100px"}/>
                    <span><a href='https://github.com/nawazzz'>{this.state.ghDataSecondUser.login}</a></span>
                    <span onClick={this.handleUserOutputTwo}
                      style={{ cursor: "pointer", fontWeight: "700" }}
                    >x</span>
                  </div>

                </div>
                <div>
                  <Button variant="contained" onClick={this.handleResults}
                    style={{ display: !this.state.handleButtonOne && !this.state.handleButtonTwo ? 'block' : 'none', margin: '100px', cursor: 'pointer' }}
                  >Battle</Button>
                </div>
              </div>
            </div>
          )}
        <Battling showLoadingPage={this.state.showLoadingPage} />
      </div>
    )
  }
}

export default App;
