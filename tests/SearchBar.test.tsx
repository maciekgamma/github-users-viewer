// SearchBar.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SearchBar from "../components/SearchBar"; // Adjust the import path as necessary

describe("SearchBar", () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnSubmit = jest.fn();

  const setup = (value: string = "") => {
    return render(
      <SearchBar
        value={value}
        onChange={mockOnChange}
        onClear={mockOnClear}
        onSubmit={mockOnSubmit}
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the SearchBar correctly", () => {
    const { getByPlaceholderText } = setup();

    expect(getByPlaceholderText("GitHub username")).toBeTruthy();
  });

  it("should call onClear when clear button is pressed", () => {
    const { getByTestId } = setup("octocat");

    fireEvent.press(getByTestId("clear-button"));

    expect(mockOnClear).toHaveBeenCalled();
  });

  it("should call onSubmit when the return key is pressed", () => {
    const { getByPlaceholderText } = setup("octocat");

    fireEvent(getByPlaceholderText("GitHub username"), "submitEditing");

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should display the clear button when input has text", () => {
    const { getByTestId } = setup("octocat");

    expect(getByTestId("clear-button")).toBeTruthy();
  });
});
