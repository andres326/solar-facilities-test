import { useParams } from "react-router-dom";
import { usePerformanceData } from "../graphql/hooks/performance";
import { DrawerHeaderStyled } from "../components/Drawer/drawer-components";
import { Box } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useMemo } from "react";

export const FacilityPerformance = () => {
  const { slug } = useParams();
  const { performanceData } = usePerformanceData(slug);

  const yAxis = useMemo(() => {
    return performanceData?.map((data) => data.activePower) || [];
  }, [performanceData]);

  const xAxis = useMemo(() => {
    return performanceData?.map((data) => data.timestamp) || [];
  }, [performanceData]);

  return (
    <Box component="main" width={"100%"}>
      <DrawerHeaderStyled />
      <LineChart
        xAxis={[
          {
            label: "Date",
            data: xAxis,
            tickInterval: "auto",
            scaleType: "time",
          },
        ]}
        series={[
          {
            data: yAxis,
          },
        ]}
        width={700}
        height={300}
      />
    </Box>
  );
};
