import {Box, Button} from "@chakra-ui/react";
import './App.css';
import Screen from "./components/Screen";
import {useState} from "react";
import './stylesheets/ButtonCalculator.css';
import './stylesheets/ClearButton.css';

// ctrl + alt + o - optimize imports

type CalculatorOperator = ('/' | '+' | '*' | '-');
type CalculatorButton = (
  number | CalculatorOperator // String template literals
)
type OperatorCallback = (l: number, r: number) => number;

const handleOperator = (expression: string) => {
  const regex = /(?<left>\d*)(?<operand>[+\-*\/])(?<right>\d*)/gm;
  const {left, operand, right} = ((regex.exec(expression)) ?? {}).groups ?? {} as ({
    left?: number;
    operand?: CalculatorOperator;
    right?: number;
  });

  if (left && operand && right) {
    const handlers: Record<CalculatorOperator, OperatorCallback> = {
      '+': (l, r) => l+r,
      '-': (l, r) => l-r,
      '/': (l, r) => l/r,
      '*': (l, r) => l*r,
    };

    return String(handlers[operand as CalculatorOperator](Number(left), Number(right)));
  }

  return null;
};

function App() {
  const [input, setInput] = useState('');

  const calculatorButtonFactory = (numbers: CalculatorButton[]) => {
    return numbers.map(number => {
      const handleClick = () => {
        const newValue = input + String(number);
        const result = handleOperator(newValue);

        result ? setInput(result) : setInput(newValue);
      }

      return (
        <Button
          className="container-button"
          onClick={handleClick}
          key={number}
        >
          {number}
        </Button>
      );
    });
  };

  return (
    <Box className={'App'}>
      <Box className={'calculator-container'}>
        <Screen input={input} />
        <Box className={'row'}>
          {calculatorButtonFactory([1, 2, 3, '+'])}
        </Box>
        <Box className={'row'}>
          {calculatorButtonFactory([4, 5, 6, '-'])}
        </Box>
        <Box className={'row'}>
          {calculatorButtonFactory([7, 8, 9, '*'])}
        </Box>
        <Box className={'row'}>
          {calculatorButtonFactory([0 , '/'])}
        </Box>
        <Box className={'row'}>
          <Button
            className={'clear-button'}
            w="full"
            bg="red"
            textColor="white"
            fontSize={16}
            onClick={() => setInput('')}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;