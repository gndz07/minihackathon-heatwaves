import "./App.css";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useEffect, useState } from "react";
import { styled } from "@stitches/react";
import getData from "./getData";

const ToggleContainer = styled(ToggleGroup.Root, {
  display: "inline-flex",
  backgroundColor: "transparent",
});

const ToggleItem = styled(ToggleGroup.Item, {
  display: "inline-flex",
  width: "100px",
  justifyContent: "center",
  alignItems: "center",

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

      setDataset(formatData.flat());
    }
  }, [parsedGdpData]);

  console.log(dataset);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Temperature and Productivity Relation</h1>
      </header>

      <main>
        <div className="toggle-btn-container">
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
      </main>
    </div>
  );
}

export default App;
