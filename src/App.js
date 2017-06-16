import React, { Component } from 'react';
import Match, { LiveMatch } from './Match';

export default class App extends Component {
  state = {
    mounted: true
  }

  handleClick = () => {
    this.setState({
      mounted: !this.state.mounted
    });
  }

  render() {
    const { mounted } = this.state;
    return (
      <div>
        <div className="m3">
          <strong>Regular: </strong>
          <Match
            data={{
              status: 'Finished',
              teams: {
                home: 'TeamA',
                away: 'TeamB'
              },
              result: {
                home: 0,
                away: 0
              }
            }}
          />
        </div>
        <div className="m3">
          <div>
            <strong>Live: </strong>
            {
              this.state.mounted &&
                <LiveMatch
                  feed="match"
                  interval={5000}
                  stopPolling={liveData => liveData && liveData.status === 'Finished'}
                />
            }
            <button className="btn btn-primary btn-small" onClick={this.handleClick}>
              {mounted ? 'Unmount' : 'Mount'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
