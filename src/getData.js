import Papa from "papaparse";

const getData = async ({ path, stateSetter }) => {
  const response = await fetch(path);
  const reader = response.body.getReader();
  const result = await reader.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse(csv, { header: true }); // object with { data, errors, meta }
  const rows = results.data;

  stateSetter(rows);
};

const getAverage = (arr) => {
  return arr.reduce((a, b) => Number(a) + Number(b), 0) / arr.length;
};

const getMax = (arr) => {
  return Math.max(...arr);
};

export const getQuarterlyValue = (data, quarter) => {
  if (quarter === "Q1") {
    return getAverage([data.Jan, data.Feb, data.Mar]);
  }
  if (quarter === "Q2") {
    return getAverage([data.Apr, data.May, data.Jun]);
  }
  if (quarter === "Q3") {
    return getAverage([data.Jul, data.Aug, data.Sep]);
  }
  if (quarter === "Q4") {
    return getAverage([data.Oct, data.Nov, data.Dec]);
  } else {
    return null;
  }
};

export const getQuarterlyMax = (data, quarter) => {
  if (quarter === "Q1") {
    return getMax([Number(data.Jan), Number(data.Feb), Number(data.Mar)]);
  }
  if (quarter === "Q2") {
    return getMax([Number(data.Apr), Number(data.May), Number(data.Jun)]);
  }
  if (quarter === "Q3") {
    return getMax([Number(data.Jul), Number(data.Aug), Number(data.Sep)]);
  }
  if (quarter === "Q4") {
    return getMax([Number(data.Oct), Number(data.Nov), Number(data.Dec)]);
  } else {
    return null;
  }
};

export default getData;
