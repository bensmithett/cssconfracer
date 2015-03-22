import React from "react";

const ParticipantList = React.createClass({
  render () {
    console.log(this.props.participants.toArray());
    return (
      <ul>
        {
          this.props.participants.map((participant, key) => {
            return (
              <li key={key}>
                Name: {participant.get("username")}
                Progress: {participant.get("progress")}
              </li>
            );
          }).toArray()
        }
      </ul>
    );
  }
});

export default ParticipantList;
