/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";

/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  // test("renders without crashing", () => {
  //   render(<Appointment />);
  // });
  test("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
   });
   it("calls the function with specific arguments", () => {
    const fn = jest.fn();
    fn(10);
    expect(fn).toHaveBeenCalledWith(10);
   });
   it("uses the mock implementation", () => {
    const fn = jest.fn((a, b) => a+b);
    fn(1, 2);
    expect(fn).toHaveReturnedWith(3);
   });

   
});