import React from "react";

const ParticipantList = React.createClass({
  render () {
    if (this.props.participants.size) {
      return (
        <div className="u-align--center">
          {
            this.props.participants.map((participant, key) => {
              return (
                <p
                  className={"p -min-margin" + (this.props.userId === key ? " -highlight" : "")}
                  key={key}
                >
                  {participant.get("username")}
                </p>
              );
            }).toArray()
          }
        </div>
      );
    } else {
      return <div>Waiting for players to join...</div>;
    }
  }
});

export default ParticipantList;
