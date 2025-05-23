import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartData: [
    { browser: "chrome", visitors: 65, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 30, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 13, fill: "var(--color-firefox)" },
  ],
  chartConfig: {
    visitors: {
      label: "Rank of Student",
    },
    chrome: {
      label: "Highest Paragraph copy",
      color: "#2CA58D",
    },
    safari: {
      label: "Summited Student",
      color: "#F4A261",
    },
    firefox: {
      label: "Which subject are high submitted",
      color: "#E9C46A",
    },
  },
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    // Later, you can add actions if needed (example: updateData)
  },
});

export const selectChartData = (state) => state.chart.chartData;
export const selectChartConfig = (state) => state.chart.chartConfig;

export default chartSlice.reducer;
