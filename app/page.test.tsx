import { render, RenderResult, screen } from "@testing-library/react";
import MockStoreProvider from "@/lib/mockReducer/mockStoreProvider";
import Page from "./page";

const getRender = (): RenderResult => {
  return render(
    <MockStoreProvider>
      <Page />
    </MockStoreProvider>
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
