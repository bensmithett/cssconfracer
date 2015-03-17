import moment from "moment";
import Actions from "actions/race_marshal_action_creators";
import {MarshalStatus as Status} from "config/constants";

let status = null;

const getStatus = function getStatus (time) {
  if (time.minutes() % 2) {
    // Maybe this should be split into <30 & >30, so waiting for next race & viewing results of last race are 30 second blocks?
    // Or maybe the component can just deal with that, it knows what screen it's on...
    return Status.WAITING;
  } else {
    if (time.seconds() <= 5) {
      return Status.ENGINE_STARTED;
    } else {
      return Status.RACING;
    }
  }
};

const getRaceId = function getRaceId (time) {
  if (time.minutes() % 2) {
    // bump us forward to the next race
    time = time.clone()
    time.add(1, "minutes");
  }
  return time.format("YYYY-MM-DD-HH-mm");
};

const watch = function watch () {
  const now = moment.utc();
  const newStatus = getStatus(now);

  if (status !== newStatus) {
    status = newStatus;
    Actions.raceStatusUpdate(getRaceId(now), status);
  }

  setTimeout(watch, 1000);
};

export function start () {
  watch();
};

