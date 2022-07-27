import "./App.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import getData from "./getData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import SelectCountry from "./SelectCountry";

const ToggleContainer = styled(ToggleGroup.Root, {
  display: "inline-flex",
  backgroundColor: "transparent",
  marginLeft: "20px",
  borderRadius: 4,
});

const ToggleItem = styled(ToggleGroup.Item, {
  display: "inline-flex",
  width: "100px",
  justifyContent: "center",
  alignItems: "center",
  padding: "8px",

  "&:hover": {
    cursor: "pointer",
  },

  "&[data-state=on]": {
    backgroundColor: "#020738",
    color: "white",
  },
});

function App() {
  const [meanMax, setMeanMax] = useState("mean");
  const [countryCode, setCountryCode] = useState("DEU");
  const [parsedTempData, setParsedTempData] = useState([]);
  const [parsedGdpData, setParsedGdpData] = useState([]);
  const [dataset, setDataset] = useState([]);
  console.log(countryCode);
  // get temperature data
  useEffect(() => {
    getData({
      path:
        process.env.PUBLIC_URL +
        `/temp_files/${countryCode}${meanMax === "mean" ? "" : "_max"}.csv`,
      stateSetter: setParsedTempData,
    });
  }, [countryCode, meanMax]);

  // get gdp data
  useEffect(() => {
    getData({
      path: process.env.PUBLIC_URL + `/gdp_files/${countryCode}_gdp.csv`,
      stateSetter: setParsedGdpData,
    });
  }, [countryCode, meanMax]);

  // create dataset
  useEffect(() => {
    if (parsedGdpData.length > 0) {
      const formatData = parsedGdpData.map((item, index) => {
        const vals = Object.values(item);
        const keys = Object.keys(item);

        const realValues = vals.slice(1);
        return realValues.map((val, index) => {
          return {
            quarter: keys[index + 1] + " - " + vals[0],
            gdp: val,
          };
        });
      });

      setDataset(formatData.flat().filter((item) => item.gdp !== ""));
    }
  }, [parsedGdpData]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Temperature and Productivity Relation</h1>
      </header>

      <main>
        <div className="toggle-btn-container">
          <SelectCountry
            currentCountry={countryCode}
            setCountry={setCountryCode}
          />
          <ToggleContainer
            type="single"
            value={meanMax}
            onValueChange={(value) => {
              if (value) setMeanMax(value);
            }}
          >
            <ToggleItem value="mean">Mean</ToggleItem>
            <ToggleItem value="max">Max</ToggleItem>
          </ToggleContainer>
        </div>

        <div className="graph-container">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={300}
              data={dataset}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={false} />
              <YAxis yAxisId="left" type="number" tickCount={10} />
              {/* <YAxis yAxisId="right" orientation="right" /> */}
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="gdp"
                stroke="#8884d8"
                activeDot={{ r: 3 }}
                dot={false}
              />
              {/* <Line yAxisId="right" type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}

export default App;
