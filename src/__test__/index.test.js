import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Tab from "../Tab";

afterEach(() => {
  cleanup();
});

test("should render non-completed todo", () => {
  const todo = {
    id: 1,
    name: "item 1",
    completed: false,
  };
  render(<Tab todo={todo} />);
  const tabElement = screen.getByTestId("todo-1");
  expect(tabElement).toBeInTheDocument();
  expect(tabElement).toHaveTextContent("item 1");
  expect(tabElement).not.toContainHTML("<strike>");
});

test("matches snapshot", () => {
  const todo = {
    id: 2,
    name: "item 2",
    completed: true,
  };
  const tree = renderer.create(<Tab todo={todo} />).toJSON();
  expect(tree).toMatchSnapshot();
  console.log(tree);
});
