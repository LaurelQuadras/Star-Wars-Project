import { RenderResult, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import RootLayout, { metadata } from "./layout";

const getRender = ({ children }: { children: ReactNode }): RenderResult => {
  return render(<RootLayout>{children}</RootLayout>);
};

describe("RootLayout tests", () => {
  const children: ReactNode = <span data-testid="children" />;

  it("renders metadata content", () => {
    expect(metadata.title).toBe("Star Wars Project");
    expect(metadata.description).toBe(
      "This application displays a list of planets from star wars universe in Planets page. User is able to sort it based on diameter or population column. User is also able to click on a record to see more detail information. Finally, User is able to save / remove some planets as favorites and view them in Favorites page, where user can also remove planets from favorites"
    );
  });

  it("renders RootLayout Component", () => {
    /* eslint-disable no-console */
    console.error = jest.fn();

    getRender({ children });
    expect(screen.getByTestId("children")).toBeDefined();
  });
});
