import { render, RenderResult, screen } from "@testing-library/react";
import Page from "./page";
import StoreProvider from "./StoreProvider";

const getRender = (): RenderResult => {
  return render(
    <StoreProvider>
      <Page />
    </StoreProvider>
  );
};

jest.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        route: "",
        pathname: "",
        query: "",
        asPath: "",
        push: jest.fn(),
        replace: jest.fn(),
      };
    },
    usePathname() {
      return {
        includes: jest.fn().mockReturnValue(true),
      };
    },
  };
});

describe("Page Tests", () => {
  it("renders Page", () => {
    getRender();
    expect(screen.getByTestId("page-class")).toBeDefined();
  });
});
