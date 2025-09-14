import Button from "@mui/joy/Button";
import { generateRandomNumbers, getPermutations } from '../utils/arrayUtils';

const Benchmark = ({setSnackBarStatus, setSnackBarMessage}) => {

  const generateHandredItems = (n) => {
    const items = generateRandomNumbers(n, -100000, 1000000);
    const command = `arg="${items.join(' ')}";./push_swap $arg | ./checker_MAC $arg; echo "In :";./push_swap $arg | wc -l`
    navigator.clipboard.writeText(command)
    setSnackBarMessage("Copied");
    setSnackBarStatus(true);
  }



  const gen5 = () => {

    const numbers = [0, 1, 2, 3, 4];
    const permutations = getPermutations(numbers);
    
    const commands = [];
    
          for (let i = 0; i < 100; i++) {
            const element = permutations[i];
            commands.push(`arg="${element.join(' ')}"; ./push_swap $arg | ./checker_MAC;./push_swap $arg | wc -l`);
          }
          navigator.clipboard.writeText(commands.join(';'))
          setSnackBarMessage("Copied");
          setSnackBarStatus(true);
  }



  return (
    <div className="flex flex-col gap-2">


      <div className="flex flex-row gap-2 items-center">
        100 Random items
        <Button onClick={() => generateHandredItems(100)} variant="outlined">Copy</Button>
      </div>

  <div className="flex flex-row gap-2 items-center">
        500 Random items
        <Button onClick={() => generateHandredItems(500)} variant="outlined">Copy</Button>
      </div>

      <div className="flex flex-row gap-2 items-center">
        5 Random items
        <Button onClick={() => gen5()} variant="outlined">Copy</Button>
      </div>

    </div>
  );
};

export default Benchmark;
