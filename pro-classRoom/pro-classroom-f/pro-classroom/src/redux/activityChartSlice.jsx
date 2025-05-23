import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chartData: [
    { date: "2024-05-17", Java: 499, Python: 420 },
    { date: "2024-05-18", Java: 315, Python: 350 },
    { date: "2024-05-19", Java: 235, Python: 180 },
    { date: "2024-05-20", Java: 177, Python: 230 },
    { date: "2024-05-21", Java: 82, Python: 140 },
    { date: "2024-05-22", Java: 81, Python: 120 },
    { date: "2024-05-23", Java: 252, Python: 290 },
    { date: "2024-05-24", Java: 294, Python: 220 },
    { date: "2024-05-25", Java: 201, Python: 250 },
    { date: "2024-05-26", Java: 213, Python: 170 },
    { date: "2024-05-27", Java: 420, Python: 460 },
    { date: "2024-05-28", Java: 233, Python: 190 },
  ],
  chartConfig: {
    views: {
      label: "Page Views",
    },
    Java: {
      label: "Java",
      color: "hsl(var(--chart-1))",
    },
    Python: {
      label: "Python",
      color: "hsl(var(--chart-2))",
    },
  },
};

const activityChartSlice = createSlice({
  name: "activityChart",
  initialState,
  reducers: {},
});

export const selectActivityChartData = (state) => state.activityChart.chartData;
export const selectActivityChartConfig = (state) =>
  state.activityChart.chartConfig;

export default activityChartSlice.reducer;
