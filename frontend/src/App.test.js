import { render, fireEvent, screen } from "@testing-library/react";
//import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/To Do/i);
  expect(linkElement).toBeInTheDocument();
});

test("test add button & input can be found", () => {
  render(<App />);
  const btnElement = screen.getByText(/Add/i);
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  expect(btnElement).toBeInTheDocument();
  expect(inputElement).toBeInTheDocument();
});

test("test a new todo can be added by clicking", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  const btnElement = screen.getByText(/Add/i);
  userEvent.type(inputElement, "Hello, World!");
  userEvent.click(btnElement);
  const textElements = screen.getAllByText(/Hello, World!/i);
  expect(textElements.length).toBeGreaterThan(0);
});

test("test a new todo can be added by clicking enter", () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/What needs to be done/i);
  userEvent.type(inputElement, "Second Todo");
  fireEvent.keyPress(inputElement, { key: "Enter", code: 13 });

  const textElements = screen.getAllByText(/Second Todo/i);
  expect(textElements.length).toBeGreaterThan(0);
});
