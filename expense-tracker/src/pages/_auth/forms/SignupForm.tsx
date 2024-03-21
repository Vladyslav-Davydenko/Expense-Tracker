import { Button } from "@/components/ui/button";

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useCallback, useEffect, useRef, useState } from "react";

export const SignupForm = () => {
  const [counter, setCounter] = useState<number>(0);
  // const [test, setTest] = useState<boolean>(false);
  const firstRender = useRef(false);

  // Cashing data to prevent from unnecessary re-renders
  const fetchingData = useCallback(
    useDebouncedCallback((data) => {
      console.log(`Fetching: ${data}...`);
    }),
    [counter]
  );

  useEffect(() => {
    if (firstRender.current) {
      fetchingData(counter);
    }
    firstRender.current = true;
  }, [counter, fetchingData]);

  const handleClickButton = () => {
    // setTest(!test);
    setCounter((prev) => {
      console.log(`Times rerendered: ${prev + 1}`);
      return prev + 1;
    });
  };

  return (
    <div>
      <Button className=" bg-primary-light" onClick={handleClickButton}>
        Signup
      </Button>
      <p>{counter}</p>
    </div>
  );
};
