import moment from "moment";

let startTime = null;

export function start () {
  startTime = moment().utc();
};

export function stop () {
  const stopTime = moment().utc();
  return (stopTime - startTime);
};
