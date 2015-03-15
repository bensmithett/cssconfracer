import moment from "moment";
import Actions from "actions/race_marshal_action_creators";

status = null;

// Toootal pseudocode, fix later
const watch = function watch () {
  const now = moment().utc();
  if (status === ENGINE_STARTED && raceStarted(now)) {
    Actions.startRacing();
  } else if (status === RACING && raceEnded(now)) {
    Actions.stopRacing();
  } else if (status === WAITING && enginesStarted(now)) {
    Actions.startYourEngines();
  } else if (status === null) {
    setFirstStatusBasedOnTime();
  }

  setTimeout(watch, 1000);
};


export function start () {
  watch();
  // return now.format("YYYY-MM-DD-HH-mm");
};



