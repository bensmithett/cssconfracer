component -> action -> store
                          (valid) -> set state, call transitionTo callback passed from component to action
                          (invalid) -> set store state invalid, trigger change

https://gist.github.com/rpflorence/daafb1e3cb8ad740b346
https://github.com/facebook/flux/blob/master/examples/flux-chat/js/components/MessageComposer.react.js
https://github.com/rackt/react-router/blob/master/docs/api/mixins/Navigation.md
https://github.com/rackt/react-router/issues/380
http://jaketrent.com/post/react-router-with-flux/#disqus_thread
https://github.com/rackt/react-router/issues/575#ref-issue-54576471
https://github.com/ryanflorence/create-container




# Stores

UserStore: {
  1: {},
  2: {},
  3: {},
}

RaceResultsStore: {
  "16:55 1/1/2015": { // or IDs based on 5 min intervals since some zero date?
    [
      {
        userId: 123,
        progressPercent: 99
        finalTime: 12345,
      },
      {...},
      {...},
    ]
  }
}

CurrentRaceStore: {
  id: "17:00 1/1/2015",
  competitors: [1,4,79] // IDs from UserStore,
  status: "WAITING" || "RACING" || "USER_FINISHED" || "ENDED",
  finalTime: "12345",
  progressPercent: 65,
}

# Screens


## Home
- Enter username (auto-populated from localStorage if possible)
- Join next race button

## Waiting
- "Race in progress!"
- Live updating list of field

## Racing (go there 10 secs before race starts)
- Live updating list of field
- Current user progress from local store rather than list
- Upon finish, kick off a 5 second setTimeout then go to...

## Result
- Show a winner based on the current list
- Join next race button

