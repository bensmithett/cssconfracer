# CSSConf Racer

A stupid real time multiplayer racing game, built for a [talk at Decompress 2015](http://lanyrd.com/2015/decompressau/sdhqqz/) and as an excuse to experiment with this stuff:

- [react-hot-loader](http://gaearon.github.io/react-hot-loader)
- [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html)
- [react-router](https://github.com/rackt/react-router)
- @ryanflorence's [project folder structure](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346) for React apps
- [Firebase](https://www.firebase.com/)

## To run locally

- `npm install`
- `npm start`
- Visit localhost:3000

## Why is this code so terrible?!

I made this on my couch over a few nights while simultaneously binge-watching House of Cards. While I tried to keep it pretty neat, there are definitely rushed bits, duplicated bits & the odd performance snafu. Pull requests welcome!

## I found a bug!

Entirely likely! There hasn't exactly been a rigorous testing process.

- If you're at CSSConf or Decompress, come say hi & show me the bug! Or...
- Pull requests welcome! Or...
- Tweet at me @bensmithett

## Deploying

- `npm run prod` (dumps un-revved files in `build`)
- `gulp` (revs filenames & dumps them in deploy)
- The gross part I haven't scripted yet:
  - `git checkout gh-pages`
  - Delete whatever's in there & past the contents of `deploy` in the root
  - `git push`
