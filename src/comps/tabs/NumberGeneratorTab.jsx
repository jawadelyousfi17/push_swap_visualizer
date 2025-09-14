import { useState } from 'react';
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input";
import { GoCopy } from "react-icons/go";
import { generateUniqueRandomNumbers } from '../../utils/arrayUtils';
import Seo from "../seo";

const NumberGeneratorTab = ({ 
  numbers, 
  setNumbers, 
  setA, 
  setB, 
  setSnackBarMessage, 
  setSnackBarStatus 
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      generateRandom();
    }
  };

  const generateRandom = () => {
    const uniqueNumbers = generateUniqueRandomNumbers(inputValue, 50000);
    const numbersString = uniqueNumbers.join(" ");
    setNumbers(numbersString);
    
    // Automatically set the numbers to the stack
    setA(
      numbersString
        .split(" ")
        .map((el) => parseInt(el))
        .filter((el) => !isNaN(el))
        .filter((el, i, self) => self.indexOf(el) === i)
    );
    setB([]);
  };

  const setNumbersToStack = () => {
    setA(
      numbers
        .split(" ")
        .map((el) => parseInt(el))
        .filter((el) => !isNaN(el))
        .filter((el, i, self) => self.indexOf(el) === i)
    );
    setB([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("./push_swap " + numbers + " | pbcopy ");
    setSnackBarMessage("Copied to clipboard");
    setSnackBarStatus(true);
  };

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-col gap-2">
        <b>PUSH SWAP VIZUALISER</b>
        <h4>Generate random numbers</h4>
        <Input
          onKeyDown={handleKeyDown}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type="number"
          placeholder="How many numbers ?"
        />
        <div className="flex gap-2">
          <Button variant="soft" onClick={generateRandom}>
            Random
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <b>Numbers</b>
        <Input
          type="text"
          placeholder="Numbers"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
        />
        <div className="flex gap-2">
          <Button
            onClick={copyToClipboard}
            startDecorator={<GoCopy />}
            sx={{ "--Button-gap": "8px" }}
          >
            Copy
          </Button>
          <Button onClick={setNumbersToStack}>Set numbers</Button>
        </div>
      </div>
      
      <Seo />
    </div>
  );
};

export default NumberGeneratorTab;
