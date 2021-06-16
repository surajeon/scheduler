import React from "react";

import { render, cleanup, waitForElement, fireEvent } from "@testing-library/react";
import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, prettyDOM } from "@testing-library/react"
import Application from "components/Application";
afterEach(cleanup);
// import Empty from "components/Appointment/Empty";


// it("changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Monday"));
  //   console.log(prettyDOM(container));

  // });

  it.only("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

  });

});