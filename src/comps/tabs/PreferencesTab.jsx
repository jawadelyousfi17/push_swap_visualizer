import { useState, useEffect } from 'react';
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Button from "@mui/joy/Button";
import Switch from "@mui/joy/Switch";

const PreferencesTab = ({ 
  styleE, 
  setStyle, 
  showIndxes, 
  setShowindexes 
}) => {
  const [value, setValue] = useState(styleE || "big bars + labels");
  const [checked, setChecked] = useState(showIndxes);

  useEffect(() => {
    setShowindexes(checked);
  }, [checked, setShowindexes]);

  const handleStyleChange = (event, newValue) => {
    setValue(newValue);
    setStyle(newValue);
  };

  return (
    <div className="flex flex-col gap-4 justify-start">
      <ToggleButtonGroup
        size={value || undefined}
        value={value}
        onChange={handleStyleChange}
      >
        <Button value="small bars">Small</Button>
        <Button value="big bars">Big</Button>
        <Button value="big bars + labels">Big + Labels</Button>
      </ToggleButtonGroup>
      
      <div className="flex flex-col gap-2">
        <div className="flex justify-start items-center gap-4">
          Show indexed labels
          <Switch
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default PreferencesTab;
