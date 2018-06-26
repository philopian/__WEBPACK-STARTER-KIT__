import React from "react";
import Enzyme, { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import "raf/polyfill";
import Adapter from "enzyme-adapter-react-16";
import Component from "./index.js";
import { log } from "util";

Enzyme.configure({ adapter: new Adapter() });

/**
 * http://airbnb.io/enzyme/docs/guides/jest.html
 *
 * https://github.com/facebook/jest/tree/master/examples
 * https://www.youtube.com/watch?v=8Ww2QBVIw0I&feature=youtu.be
 * https://hackernoon.com/testing-react-components-with-jest-and-enzyme-41d592c174f
 *
 *
 *
 */

describe("HiThere (Snapshot)", () => {
  it("HiThere renders without crashing", () => {
    const component = renderer.create(<Component />);
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});

describe("Shallow Render", () => {
  it("Make sure the props are being passing thru to the component", () => {
    // Render the component
    const component = shallow(<Component message="hello jest" />);

    // Make sure that the props.message is being printed
    expect(component.find(".props-message").text()).toEqual("hello jest");
  });

  it("H1 should have the text hello there", () => {
    // Render the component
    const component = shallow(<Component message="hello jest" />);

    // Find the H1 and check to see if it's contents is "hi there"
    expect(component.find("h1").text()).toEqual("hi there");
  });

  it("Local message should change after click", () => {
    // Render the component
    const component = shallow(<Component message="hello jest" />);

    // Button click should change the click-message
    expect(component.find(".click-message").text()).toEqual("");
    component.find(".local-message button").simulate("click");
    expect(component.find(".click-message").text()).toEqual(
      "button has been clicked!"
    );
  });

  it("Property method gets called", () => {
    const spy = jest.fn();
    // Render the component
    const component = shallow(<Component handleClickForParent={spy} />);

    // Button click should change the click-message
    component.find(".parent-message button").simulate("click");
    component.find(".parent-message button").simulate("click");

    expect(spy).toBeCalled();
    expect(spy).toHaveBeenCalled();
    expect(spy.mock.calls.length).toEqual(2);
  });

  it("investigate instance, expect initial state", () => {
    const component = shallow(<Component />);

    const _this = component.instance();
    console.log(_this);
    expect(_this.state).toEqual({
      clickCount: 0,
      clickMessage: "",
      parentMessage: ""
    });

    _this.setState({ clickMessage: "updated with jest!" });
    expect(_this.state.clickMessage).toEqual("updated with jest!");
  });
});

// spy are "fake" function that let's to track metrics

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});
