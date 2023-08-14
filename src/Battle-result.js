import React from "react";

class BattleResult extends React.Component {
    render() {
        return(
            <div style={{display: "flex", width: '80%', margin: '0 auto', justifyContent: 'space-between'}}>
                <div>
                    <h1>{this.props.totalScoreUserOne>this.props.totalScoreUserTwo? 'Winner': 'Loser' }</h1>
                    <img src={this.props.ghData.avatar_url} width={"100px"} />
                    <h3>score: {this.props.totalScoreUserOne}</h3>
                    <h2>{this.props.ghData.login}</h2>
                    <li>{this.props.ghData.login}</li>
                    <li>{this.props.ghData.location }</li>
                    <li>{this.props.ghData.company }</li>
                    <li>{this.props.ghData.followers}</li>
                    <li>{this.props.ghData.following}</li>
                    <li>{this.props.ghData.public_repos}</li>
                </div>
                <div>
                    <h1>{this.props.totalScoreUserOne<this.props.totalScoreUserTwo? 'Winner': 'Loser' }</h1>
                    <img src={this.props.ghDataSecondUser.avatar_url} width={"100px"} />
                    <h3>score: {this.props.totalScoreUserTwo}</h3>
                    <h2>{this.props.ghDataSecondUser.login}</h2>
                    <li>{this.props.ghDataSecondUser.login}</li>
                    <li>{this.props.ghDataSecondUser.location}</li>
                    <li>{this.props.ghDataSecondUser.company}</li>
                    <li>{this.props.ghDataSecondUser.followers}</li>
                    <li>{this.props.ghDataSecondUser.following}</li>
                    <li>{this.props.ghDataSecondUser.public_repos}</li>
                </div>
            </div>
        )
    }
}

export default BattleResult;