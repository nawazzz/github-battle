import React from "react";

class BattleResult extends React.Component {
    render() {
        return(
            <div style={{display: "flex", width: '80%', margin: '0 auto', justifyContent: 'space-between'}}>
                <div>
                    <h1>Loser</h1>
                    <img src={this.props.ghData.avatar_url} width={"100px"} />
                </div>
                <div>
                    <h1>Winner</h1>
                    <img src={this.props.ghDataSecondUser.avatar_url} width={"100px"} />
                </div>
            </div>
        )
    }
}

export default BattleResult;