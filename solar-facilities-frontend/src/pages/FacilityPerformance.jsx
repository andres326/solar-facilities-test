import { useParams } from "react-router-dom";
import { usePerformanceData } from "../graphql/hooks/performance";
import { DrawerHeaderStyled } from "../components/Drawer/drawer-components";
import { Box, Grid, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useMemo } from "react";
import { useFacility } from "../graphql/hooks/facilities";

export const FacilityPerformance = () => {
  const { slug } = useParams();
  const { performanceData } = usePerformanceData(slug);
  const { facility } = useFacility(slug);

  const yAxis = useMemo(() => {
    return performanceData?.map((data) => data.activePower) || [];
  }, [performanceData]);

  const xAxis = useMemo(() => {
    return performanceData?.map((data) => data.timestamp) || [];
  }, [performanceData]);

  return (
    <Box component="main" width={"100%"}>
      <DrawerHeaderStyled />
      <Grid container padding={3} gap={2} flexDirection={"column"}>
        <Typography variant="h4">Facility performance data</Typography>
        <p>
          <span style={{ color: "#757575" }}>Facility name: </span>
          <span>{facility?.name}</span>
        </p>
        <LineChart
          xAxis={[
            {
              label: "Time",
              data: xAxis,
              tickInterval: "auto",
              scaleType: "time",
            },
          ]}
          yAxis={[
            {
              min: 0,
              valueFormatter: (value) => `${value} kW`,
            },
          ]}
          series={[
            {
              label: "Power (kW)",
              data: yAxis,
              showMark: false,
            },
          ]}
          width={700}
          height={300}
        />
      </Grid>
    </Box>
  );
};
