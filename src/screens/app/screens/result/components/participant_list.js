import React from "react";
import {formatScore} from "utils/race_marshal_utils";

const ParticipantList = React.createClass({
  render () {
    let place = 0;

    if (this.props.participants.size) {
      return (
        <div className="container -pad">
          {
            this.props.participants.filter((result) => {
              return result.get("progress") > 10;
            }).sort((a, b) => {
              const aTime = a.get("time");
              const bTime = b.get("time");

              if (aTime > bTime) {
                return 1;
              } else if (aTime < bTime) {
                return -1;
              } else {
                return 0;
              }
            }).map((participant, key) => {
              place++;
              const me = this.props.userId === key;
              return (
                <p
                  className={me ? "result -highlight" : "result"}
                  key={key}
                >
                  <span className="result__name">
                    {`${place}. ${participant.get("username")}`}
                  </span>

                  <span className="result__time">
                    {formatScore(participant.get("time"))}
                  </span>
                </p>
              );
            }).toArray()
          }
        </div>
      );
    } else {
      return <div>"Nobody in this race!"</div>;
    }
    
  }
});

export default ParticipantList;
