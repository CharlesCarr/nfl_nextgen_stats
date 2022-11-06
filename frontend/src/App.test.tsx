import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";

test("renders full container in the document", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const nameElement = screen.getByTestId("full");
  expect(nameElement).toBeInTheDocument();
});

test("renders navbar component in the document", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const childElement = screen.getByTestId("navbar");
  expect(childElement).toBeTruthy();
});
