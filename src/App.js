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
      handleButtonOne: !this.state.handleButtonOne,
      ghData: []
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
      handleButtonTwo: !this.state.handleButtonTwo,
      ghDataSecondUser: []      
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
      <div style={{ display: this.state.showLoadingPage === false ? 'block' : 'none', background: '#f3f3f3' }}>
        {this.state.showResult ?
          (
            <div>
              <BattleResult ghData={this.state.ghData} ghDataSecondUser={this.state.ghDataSecondUser} inputValueOne={this.state.inputValueOne}
                inputValueTwo={this.state.inputValueTwo} handleButtonOne={this.state.handleButtonOne} handleButtonTwo={this.state.handleButtonTwo}
                showResult={this.state.showResult} resultDataOne={this.state.resultDataOne} resultDataTwo={this.state.resultDataTwo}
                totalScoreUserOne={this.state.totalScoreUserOne} totalScoreUserTwo={this.state.totalScoreUserTwo} />
            </div>
          ) : (
            <div className='mainContainer' style={{background: '#f3f3f3'}}>
              <div className='subContainer'>
                <div className="app">
                  <h1>Instructions</h1>

                  <div className='heroContainer'>
                    <div style={{ textAlign: 'center' }}>
                      <h3>Enter Two GitHub Users</h3>
                      <img src={require('./assets/enter-two-users.jpg')} />
                    </div>
                    <div>
                      <h3>Battle</h3>
                      <img src={require('./assets/battle.jpg')} />
                    </div>
                    <div>
                      <h3>See the Winner</h3>
                      <img src={require('./assets/see-the-winner.jpg')} />
                    </div>
                  </div>
                </div>
                <h2 style={{ textAlign: 'center' }}>Players</h2>
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
                  <div className={!this.state.handleButtonOne ? 'searchResultChildContainer' : "none"}>
                    <div className='userNameResetContainer'>
                      <img src={this.state.ghData.avatar_url} width={"55px"} />

                      <span className='userLinkContainer'><a href='https://github.com/nawazzz'>{this.state.ghData.login}</a></span>
                    </div>
                    <span onClick={this.handleUserOutput}
                      style={{ display: !this.state.handleButtonOne ? 'block' : 'none', cursor: "pointer", fontWeight: "700", paddingTop: '10px' }}
                    >x</span>

                  </div>
                  <div className={!this.state.handleButtonTwo ? 'searchResultChildContainer' : "none"}>
                    <div className='userNameResetContainer'>
                      <img src={this.state.ghDataSecondUser.avatar_url} width={"55px"} />

                      <span className='userLinkContainer'><a href='https://github.com/nawazzz'>{this.state.ghDataSecondUser.login}</a></span>
                    </div>
                    <span onClick={this.handleUserOutputTwo}
                      style={{ display: !this.state.handleButtonTwo ? 'block' : "none", cursor: "pointer", fontWeight: "700", paddingTop: '10px' }}
                    >x</span>
                  </div>

                </div>
                <div style={{ display: !this.state.handleButtonOne && !this.state.handleButtonTwo ? 'block' : 'none' }}
                  className='battleButton'>
                  <Button variant="contained" onClick={this.handleResults}
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
