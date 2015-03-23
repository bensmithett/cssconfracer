import React from "react";
import img from "img/logo";

const Top = React.createClass({
  render () {
    return (
      <div className="homepage__top">
        <h1 className="logo">
          <img className="logo__img" src={img} width="150" alt="CSSConf" />
          <span className="logo__text">Racer</span>
        </h1>

        <div className="container -pad">
          <p className="h5 u-align--center">
            A new multiplayer race starts every&nbsp;2&nbsp;minutes!
          </p>

          <p className="p u-align--center">
            Made with ❤ by <a className="a" href="https://twitter.com/bensmithett" target="_blank">@bensmithett</a>
          </p>
        </div>
      </div>
    );
  }
});

export default Top;
