import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import SignInForm from "../../app/components/auth/forms/SignInForm";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("signin from", () => {
  test("on initial render, the form heading is correct", () => {
    useRouter.mockReturnValue({ query: {} });
    render(<SignInForm />);
    const header = screen.getByRole("heading", { name: /welcome back/i });
    expect(header).toBeInTheDocument();
  });
});
