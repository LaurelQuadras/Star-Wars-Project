import { render, RenderResult, screen } from "@testing-library/react";
import Page from "./page";

const getRender = (): RenderResult => {
  return render(<Page />);
};

describe("Page Tests", () => {
  it("executes Page", () => {
    getRender();
    expect(screen.getByTestId("page-class")).toBeDefined();
  });
});
