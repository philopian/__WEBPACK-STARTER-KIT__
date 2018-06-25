import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class HiHiHi extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>hi hi hi</h1>
          <p>{this.props.message}</p>
        </Wrapper>
      </div>
    );
  }
}
HiHiHi.propTypes = {
  message: PropTypes.string
};
HiHiHi.defaultProps = {
  message: "World"
};
export default HiHiHi;
