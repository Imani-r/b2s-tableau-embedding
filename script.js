console.log("Hello, B2S!");

// Declare variables for use in the script
const viz = document.getElementById("tableauViz");
let workbook;
let VizActiveSheet;
let dashboard;
let listSheets;

// Declare variables for the sheets we want to filter
let regionBar;
let segmentBar;
let categoryBar;
let profitMap;

// Declare variables to make the buttons work
const westRegionButton = document.getElementById("west-region");
const clearFilterButton = document.getElementById("clear-filter");
const undoButton = document.getElementById("undo-button");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
const applyButton = document.getElementById("apply-button");

function logWorkbookInformation() {
  workbook = viz.workbook;
  console.log(`The name of the workbook is: "${workbook.name}"`);

  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    console.log(`The sheet with index ${element.index} is ${element.name}`);
  });

  // Get the currently active view
  VizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet is: ${VizActiveSheet.name}`);

  // List all the worksheets in the active view
  listSheets = VizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    console.log(`The worksheet with index ${element.index} is ${element.name}`);
  });

  // Configure the filters on the active view
  regionBar = listSheets.find((ws) => ws.name == "Region Bar");
  segmentBar = listSheets.find((ws) => ws.name == "Segment Bar");
  categoryBar = listSheets.find((ws) => ws.name == "Category Bar");
  profitMap = listSheets.find((ws) => ws.name == "State Overview");
}

function westRegionFunction() {
  console.log(`West Region button press. ${westRegionButton}`);

  regionBar.applyFilterAsync("Region", ["West"], "replace");
  segmentBar.applyFilterAsync("Region", ["West"], "replace");
  categoryBar.applyFilterAsync("Region", ["West"], "replace");
}

function clearFilterFunction() {
  console.log(`Clear Region filter press`);
  regionBar.clearFilterAsync("Region");
  segmentBar.clearFilterAsync("Region");
  categoryBar.clearFilterAsync("Region");
}

function unDo() {
  console.log("Undoing last action...");
  viz.undoAsync();
}

function filterRangeFunction() {
  console.log(
    `Filtering the range between ${minValue.value} and ${maxValue.value}`
  );

  profitMap.applyRangeFilterAsync("SUM(Profit)", {
    min: parseFloat(minValue.value),
    max: parseFloat(maxValue.value),
  });
}

// Function calls
viz.addEventListener("firstinteractive", logWorkbookInformation);
westRegionButton.addEventListener("click", westRegionFunction);
clearFilterButton.addEventListener("click", clearFilterFunction);
undoButton.addEventListener("click", unDo);
applyButton.addEventListener("click", filterRangeFunction);
