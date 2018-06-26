import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class HiThere extends Component {
  state = {
    clickCount: 0,
    clickMessage: "",
    parentMessage: ""
  };

  handleClick = () => {
    this.setState({
      clickMessage: "button has been clicked!",
      clickCount: this.state.clickCount++
    });
  };

  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>hi there</h1>
          <p className="props-message">{this.props.message}</p>

          <div className="local-message">
            <button onClick={this.handleClick}>Click me!</button>
            <p className="click-message">{this.state.clickMessage}</p>
          </div>

          <div className="parent-message">
            <button onClick={this.props.handleClickForParent}>
              Send Message to parent!
            </button>
            <p className="click-message-for-parent">
              {this.state.parentMessage}
            </p>
          </div>
        </Wrapper>
      </div>
    );
  }
}
HiThere.propTypes = {
  message: PropTypes.string,
  handleClickForParent: PropTypes.func
};
HiThere.defaultProps = {
  message: "World"
};
export default HiThere;
