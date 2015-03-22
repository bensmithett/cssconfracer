import React from "react";

const ParticipantList = React.createClass({
  render () {
    if (this.props.participants.size) {
      return (
        <ul>
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
              return (
                <li key={key}>
                  Name: {participant.get("username")}
                  Progress: {participant.get("progress")}
                  Time: {participant.get("time")}
                </li>
              );
            }).toArray()
          }
        </ul>
      );
    } else {
      return <div>"Nobody in this race!"</div>;
    }
    
  }
});

export default ParticipantList;
