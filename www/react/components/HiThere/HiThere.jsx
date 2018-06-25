import React, { Component } from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./styles.js";

class HiThere extends Component {
  state = {}
  
  render() {
    return (
      <div className="my-component">
        <Wrapper>
          <h1>hi there</h1>
          <p>{this.props.message}</p>
        </Wrapper>
      </div>
    );
  }
}
HiThere.propTypes = {
  message: PropTypes.string
};
HiThere.defaultProps = {
  message: "World"
};
export default HiThere;
