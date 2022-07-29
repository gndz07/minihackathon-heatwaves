import "./App.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import getData, { getQuarterlyValue, getQuarterlyMax } from "./getData";
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
import SelectCountry from "./component/SelectCountry";
import SelectQuarter from "./component/SelectQuarter";

const ToggleContainer = styled(ToggleGroup.Root, {
  display: "inline-flex",
  backgroundColor: "transparent",
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
  const [countryCode, setCountryCode] = useState("AUS");
  const [parsedTempData, setParsedTempData] = useState([]);
  const [parsedGdpData, setParsedGdpData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [filteredDataset, setFilteredDataset] = useState([]);
  const [quarterFilter, setQuarterFilter] = useState("all");

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

        const valuesOnly = vals.slice(1);
        return valuesOnly.map((val, index) => {
          const temp = parsedTempData.find((item) => item.year === vals[0]);

          return {
            quarter: keys[index + 1] + " - " + vals[0],
            gdp: Number(val).toFixed(2),
            temperature: temp
              ? meanMax === "mean"
                ? getQuarterlyValue(temp, keys[index + 1])
                : getQuarterlyMax(temp, keys[index + 1])
              : null,
          };
        });
      });

      setDataset(
        formatData
          .flat()
          .filter((item) => item.gdp !== "")
          .filter((item) => item.temperature !== null)
      );
    }
  }, [meanMax, parsedGdpData, parsedTempData]);

  useEffect(() => {
    if (dataset) {
      if (quarterFilter === "all") {
        setFilteredDataset(dataset);
      } else {
        setFilteredDataset(
          dataset.filter((item) => item.quarter.includes(quarterFilter))
        );
      }
    }
  }, [dataset, quarterFilter]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Temperature and Productivity Relation</h1>
        <h2>Quarterly data</h2>
      </header>

      <main>
        <div className="selection-container">
          <div>
            <p className="selector-title">Select a country</p>
            <SelectCountry
              currentCountry={countryCode}
              setCountry={setCountryCode}
            />
          </div>
          <div>
            <p className="selector-title">Select a quarter</p>
            <SelectQuarter
              currentQuarter={quarterFilter}
              setQuarter={setQuarterFilter}
            />
          </div>
          <div>
            <p className="selector-title">Temperature</p>
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
        </div>

        <div className="graph-container">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart
              width={500}
              height={300}
              data={filteredDataset}
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
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) =>
                  name === "GDP per person employed*"
                    ? `${value}`
                    : `${Number(value).toFixed(2)}°C`
                }
              />
              <Legend />
              <Line
                name="GDP per person employed*"
                yAxisId="left"
                type="monotone"
                dataKey="gdp"
                stroke="#8884d8"
                activeDot={{ r: 3 }}
                dot={false}
              />
              <Line
                name={
                  meanMax === "mean" ? "Average temperature" : "Max temperature"
                }
                yAxisId="right"
                type="monotone"
                dataKey="temperature"
                stroke="#82ca9d"
                activeDot={{ r: 3 }}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ fontSize: "14px", color: "#8884d8", opacity: 0.75 }}>
            * GDP per person employed is an index to represent labor
            productivity — output per unit of labor input. Data taken from OECD
            statistics with the year 2015 as reference.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
