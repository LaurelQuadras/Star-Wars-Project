import { RenderResult, render, screen } from "@testing-library/react";
import { NavigationOptions } from "@/app/models/NavigationOptions";
import SideNavigationComponent from "./SideNavigationComponent";
import { SideNavigationComponentProps } from "./SideNavigationComponent.props";

const getRender = ({
  navOptionSelected,
}: SideNavigationComponentProps): RenderResult => {
  return render(
    <SideNavigationComponent navOptionSelected={navOptionSelected} />
  );
};

jest.mock(
  "next/link",
  () =>
    ({ children }: any) =>
      children
);

describe("SideNavigationComponent tests", () => {
  const navOptionSelected: NavigationOptions = NavigationOptions.Planets;

  it("renders SideNavigationComponent", () => {
    getRender({ navOptionSelected });

    expect(screen.getByTestId("side-navigation-component")).toBeDefined();
  });
});
