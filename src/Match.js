import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withPolling from './withPolling';

class Match extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    liveData: PropTypes.object,
    isLive: PropTypes.bool
  };

  static defaultProps = {
    data: {
      result: {
        home: '-',
        away: '-'
      },
      teams: {
        home: '-',
        away: '-'
      },
      status: '-'
    }
  };

  render() {
    const { data, liveData, isLive } = this.props;
    const _data = liveData ? liveData : data;

    if (isLive && !liveData) {
      return null;
    }

    return (
      <div>
        <div className="m2">
          {`${_data.teams.home} vs ${_data.teams.away}`}
        </div>
        <div className="m2">
          {`Status: ${_data.status}`}
        </div>
        <div className="m2">
          {`Result: ${_data.result.home}:${_data.result.away}`}
        </div>
      </div>
    );
  }
}

export default Match;
export const LiveMatch = withPolling(Match);
