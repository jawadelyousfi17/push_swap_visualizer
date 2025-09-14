import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import * as React from "react";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Snackbar from "@mui/joy/Snackbar";
import Box from "@mui/joy/Box";

import NumberGeneratorTab from "../tabs/NumberGeneratorTab";
import InstructionsTab from "../tabs/InstructionsTab";
import SimulationTab from "../tabs/SimulationTab";
import PreferencesTab from "../tabs/PreferencesTab";
import Benchmark from "../benchmark";

const Instructions = ({
  ops,
  setA,
  setB,
  instructions,
  setInstructions,
  setStyle,
  styleE,
  showIndxes,
  setShowindexes,
  theme,
  clg
}) => {
  const [numbers, setNumbers] = useState("");
  const [snackBarStatus, setSnackBarStatus] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  useEffect(() => {
    if (snackBarStatus) {
      setTimeout(() => {
        setSnackBarStatus(false);
      }, 3000);
    }
  }, [snackBarStatus]);

  return (
    <div className="flex flex-col p-4 gap-2 min-w-1/4 shrink-1">
      {/* Alert */}
      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarStatus}
        >
          {snackBarMessage}
        </Snackbar>
      </Box>
      <Tabs aria-label="Basic tabs" defaultValue={0}>
        <TabList>
          <Tab>Generate numbers</Tab>
          <Tab>Instructions</Tab>
          <Tab>Simulation</Tab>
          <Tab>Preferences</Tab>
          <Tab>Benchmark</Tab>
        </TabList>
        
        <TabPanel value={0}>
          <NumberGeneratorTab
            numbers={numbers}
            setNumbers={setNumbers}
            setA={setA}
            setB={setB}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarStatus={setSnackBarStatus}
          />
        </TabPanel>
        
        <TabPanel value={1}>
          <InstructionsTab
            ops={ops}
            instructions={instructions}
            setInstructions={setInstructions}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarStatus={setSnackBarStatus}
          />
        </TabPanel>
        
        <TabPanel value={2}>
          <SimulationTab
            instructions={instructions}
            setInstructions={setInstructions}
            ops={ops}
            setA={setA}
            setB={setB}
            numbers={numbers}
            setSnackBarMessage={setSnackBarMessage}
            setSnackBarStatus={setSnackBarStatus}
          />
        </TabPanel>
        
        <TabPanel value={3}>
          <PreferencesTab
            styleE={styleE}
            setStyle={setStyle}
            showIndxes={showIndxes}
            setShowindexes={setShowindexes}
          />
        </TabPanel>

        <TabPanel value={4}>
          <Benchmark 
            setSnackBarStatus={setSnackBarStatus} 
            setSnackBarMessage={setSnackBarMessage} 
          />
        </TabPanel>
      </Tabs>
    </div>
  );
};

Instructions.propTypes = {
  ops: PropTypes.shape({
    pa: PropTypes.func.isRequired,
    pb: PropTypes.func.isRequired,
    ra: PropTypes.func.isRequired,
    rb: PropTypes.func.isRequired,
    rr: PropTypes.func.isRequired,
    rra: PropTypes.func.isRequired,
    rrb: PropTypes.func.isRequired,
    rrr: PropTypes.func.isRequired,
    sa: PropTypes.func.isRequired,
    sb: PropTypes.func.isRequired,
  }).isRequired,
  setA: PropTypes.func.isRequired,
  setB: PropTypes.func.isRequired,
  instructions: PropTypes.array.isRequired,
  setInstructions: PropTypes.func.isRequired,
};

export default Instructions;
