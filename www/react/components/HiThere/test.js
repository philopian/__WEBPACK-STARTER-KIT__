import React from "react";
import Enzyme, { configure, shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import Adapter from "enzyme-adapter-react-16";
import Component from "./index.js";

Enzyme.configure({ adapter: new Adapter() });

/**
 * ENZYME DOCS: http://airbnb.io/enzyme/docs/guides/jest.html
 * JEST EXPECT DOCS: https://jestjs.io/docs/en/expect.html
 *
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

describe("Whole component", () => {
  it("Make sure the props are being passing thru to the component", () => {
    const component = shallow(<Component message="hello jest" />);
    expect(component.find(".props-message").text()).toEqual("hello jest");
  });
  it("initial state", () => {
    const component = shallow(<Component />);
    const _this = component.instance();
    expect(_this.state).toEqual({
      username: "",
      clickCount: 0,
      clickMessage: "",
      parentMessage: ""
    });
    _this.setState({ clickMessage: "updated with jest!" });
    expect(_this.state.clickMessage).toEqual("updated with jest!");
  });
});

describe("Local input section", () => {
  it("H1 should have the text hello there", () => {
    const component = shallow(<Component message="hello jest" />);
    expect(component.find("h1").text()).toEqual("hi there");
  });

  it("Local message should change after click", () => {
    const component = shallow(<Component message="hello jest" />);
    const USERNAME = "SomeUser";
    const changeValue = { target: { value: USERNAME } };
    component.find(".username").simulate("change", changeValue);
    expect(component.find(".click-message").text()).toEqual("");
    component.find(".local-message button").simulate("click");
    const EXPECT = `Hello ${USERNAME}, you just clicked a button!`;
    expect(component.find(".click-message").text()).toEqual(EXPECT);
  });

  it("When the input changes the state should change", () => {
    const component = shallow(<Component />);
    const NEW_VALUE = "... this is changed";
    component
      .find(".username")
      .simulate("change", { target: { value: NEW_VALUE } });
    const _this = component.instance();
    expect(_this.state.username).not.toEqual("llll");
    expect(_this.state.username).toEqual(NEW_VALUE);
  });
});

describe("Things passed to parent", () => {
  it("Props Method gets called", () => {
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
});

// spy are "fake" function that let's to track metrics
