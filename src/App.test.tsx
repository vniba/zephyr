import { render, screen } from "@testing-library/react";
import App from "./App.tsx";
import { describe, expect, it } from "vitest";

describe("it should render App", function () {
  it("should render a H1 element with text of zephyr", function () {
    render(<App />);
    expect(screen.getByRole("heading", { name: "Zephyr" })).toBeInTheDocument();
  });
});
