import { useState } from "react";

import { Button } from "@/components/ui/button";

interface HomeProps {
  count: number;
}

const Home = ({ count }: HomeProps) => {
  const [counter, setCounter] = useState<number>(count);

  const handleIncrementByOne = () => {
    setCounter((prev) => prev + 1);
  };
  const handleDecrementByOne = () => {
    setCounter((prev) => prev - 1);
  };
  const handleResetCounter = () => {
    setCounter(0);
  };
  const handleIncrementByNumber = (value: number) => {
    setCounter((prev) => prev + value);
  };
  return (
    <div>
      <h1>Home</h1>
      <h2>
        Count: <span data-testid="counter">{counter}</span>
      </h2>
      <div className="flex gap-2">
        <Button className="bg-primary-light" onClick={handleIncrementByOne}>
          Increment
        </Button>
        <Button className="bg-primary-light" onClick={handleDecrementByOne}>
          Decrement
        </Button>
        <Button className="bg-primary-light" onClick={handleResetCounter}>
          Reset
        </Button>
        <Button
          className="bg-primary-light"
          onClick={() => handleIncrementByNumber(5)}
        >
          Increment by 5
        </Button>
      </div>
    </div>
  );
};

export default Home;
