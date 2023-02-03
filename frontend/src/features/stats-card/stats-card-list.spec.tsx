import { render } from "../../utils/test-utils";
import { screen } from "@testing-library/react";
import { StatsCardList } from "./stats-card-list";
import { StatCard } from "./types";

test("renders three stat cards", () => {
  // Render the component
  const testCardData: StatCard[] = [
    {
      statName: "Stat Name",
      statNum: 40,
      statIcon: <p>Test</p>,
      statLabel: "stat",
      statKey: "st",
      type: "passer",
      loading: false,
    },
    {
      statName: "Stat Name",
      statNum: 40,
      statIcon: <p>Test</p>,
      statLabel: "stat",
      statKey: "st",
      type: "passer",
      loading: false,
    },
    {
      statName: "Stat Name",
      statNum: 40,
      statIcon: <p>Test</p>,
      statLabel: "stat",
      statKey: "st",
      type: "passer",
      loading: false,
    },
  ];
  render(
    <StatsCardList statCardData={testCardData} type="passer" loading={false} />
  );

  // Find all the stat cards
  // screen.logTestingPlaygroundURL();
  const cards = screen.getAllByTestId("stat-card");

  // Assertion: correct number of stat cards
  expect(cards).toHaveLength(3);
});
