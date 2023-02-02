import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../stores/store";
import Leaders from "./Leaders";

test("renders proper player name", () => {
  render(
    <Provider store={store}>
      <Leaders index={0} name={"Jalen Hurts"} team={"PHI"} stat={200} type={"passer"} />
    </Provider>
  );
  const nameElement = screen.getByTestId("name");
  expect(nameElement).toHaveTextContent("Jalen Hurts (PHI)");
});
