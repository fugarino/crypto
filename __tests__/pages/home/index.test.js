import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from "../../../app/(pages)/page";

describe("Home page", () => {
  it("should render properly", () => {
    render(<HomePage />);
    const header = screen.getByText(/discover/i);
    expect(header).toBeInTheDocument();
  });
});
