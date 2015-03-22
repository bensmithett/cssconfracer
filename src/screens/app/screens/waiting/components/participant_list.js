import React from "react";

const ParticipantList = React.createClass({
  render () {
    if (this.props.participants.size) {
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
    } else {
      return <div>"Nobody in this race!"</div>;
    }
    
  }
});

export default ParticipantList;
