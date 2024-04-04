import { Home } from "@/pages/_root";
import { fireEvent, render } from "@testing-library/react";

describe(Home, () => {
  it("Check if Counter exists", () => {
    const { getByTestId } = render(<Home count={0} />);
    const counter = Number(getByTestId("counter").textContent);
    expect(counter).toBe(0);
  });
  it("Check if Increments", () => {
    const { getByTestId, getByRole } = render(<Home count={0} />);
    const counter1 = Number(getByTestId("counter").textContent);
    const incrementButton = getByRole("button", { name: "Increment" });
    expect(counter1).toBe(0);
    fireEvent.click(incrementButton);
    const counter2 = Number(getByTestId("counter").textContent);
    expect(counter2).toBe(1);
  });
  it("Check if Decrements", () => {
    const { getByTestId, getByRole } = render(<Home count={0} />);
    const counter1 = Number(getByTestId("counter").textContent);
    const decrementButton = getByRole("button", { name: "Decrement" });
    expect(counter1).toBe(0);
    fireEvent.click(decrementButton);
    const counter2 = Number(getByTestId("counter").textContent);
    expect(counter2).toBe(-1);
  });
  it.only("Check if Resets", () => {
    const { getByTestId, getByRole } = render(<Home count={10} />);
    const counter1 = Number(getByTestId("counter").textContent);
    const resetButton = getByRole("button", { name: "Reset" });
    expect(counter1).toBe(10);
    fireEvent.click(resetButton);
    const counter2 = Number(getByTestId("counter").textContent);
    expect(counter2).toBe(0);
  });
  it.skip("Check if Increments by 5", () => {
    const { getByTestId, getByRole } = render(<Home count={0} />);
    const counter1 = Number(getByTestId("counter").textContent);
    const incrementButtonByValue = getByRole("button", {
      name: "Increment by 5",
    });
    expect(counter1).toBe(0);
    fireEvent.click(incrementButtonByValue);
    const counter2 = Number(getByTestId("counter").textContent);
    expect(counter2).toBe(5);
  });
});
