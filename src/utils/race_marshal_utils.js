import moment from "moment";
import Actions from "actions/race_marshal_action_creators";
import {MarshalStatus as Status} from "config/constants";

let status = null;

const getStatus = function getStatus (time) {
  if (time.minutes() % 2) {
    return Status.WAITING;
  } else {
    if (time.seconds() <= 5) {
      return Status.ENGINE_STARTED;
    } else {
      return Status.RACING;
    }
  }
};

// Race IDs increment at the end of a RACING period.

// Time      Status           ID
// ---------------------------------------------------
// 1:23:00   WAITING          1-24
// 1:24:00   ENGINE_STARTED   1-24
// 1:24:10   RACING           1-24
// 1:25:00   WAITING          1-26


const getRaceId = function getRaceId (time) {
  if (time.minutes() % 2) {
    time = time.clone();
    time.add(1, "minutes");
  }
  return time.format("YYYY-MM-DD-HH-mm");
};

const getNextRaceId = function getNextRaceId (time) {
  time = time.clone();

  if (time.minutes() % 2) {
    time.add(1, "minutes");
  } else {
    time.add(2, "minutes");
  }

  return time.format("YYYY-MM-DD-HH-mm");
}

const watch = function watch () {
  const now = moment.utc();
  const newStatus = getStatus(now);

  if (status !== newStatus) {
    status = newStatus;
    Actions.raceStatusUpdate(getRaceId(now), status, getNextRaceId(now));
  }

  setTimeout(watch, 1000);
};

export function start () {
  watch();
};
