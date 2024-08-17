import { useState, useEffect } from "react";
import { Input, Box, Flex, Button, Center } from "@chakra-ui/react";

const Home = () => {
  const [num1, setNum1] = useState("");
  const [isOperating, setIsOperating] = useState(false);
  const [operator, setOperator] = useState("");
  const [num2, setNum2] = useState("");
  const [equalClear, setEqualClear] = useState(false);

  const operators = {
    "+": function (a, b) {
      return a + b;
    },
    "-": function (a, b) {
      return a - b;
    },
    "/": function (a, b) {
      return a / b;
    },
    "*": function (a, b) {
      return a * b;
    },
  };

  function allClear() {
    setNum1("");
    setNum2("");
    setIsOperating(false);
    setOperator("");
    setEqualClear(false);
  }

  console.log(num1, num2, equalClear, isOperating);

  function handleInputChange(event) {
    if (!isNaN(event.key)) {
      if (equalClear) {
        allClear();
        setNum1(event.key);
      } else if (!equalClear && !isOperating) {
        setNum1((prev) => [...prev, event.key].join(""));
      } else if (isOperating && num1) {
        setNum2((prev) => [...prev, event.key].join(""));
      }
    }
  }

  function handleNumberClick(value) {
    if (equalClear) {
      allClear();
      setNum1(value);
    } else if (!equalClear && !isOperating) {
      setNum1(num1 + value);
    } else if (num1 && isOperating) {
      setNum2(num2 + value);
    }
  }

  function handlesPercentage(event) {
    event.preventDefault();

    if (num2 === "") {
      setNum1((+num1 / 100).toString());
    } else {
      setNum2((+num2 / 100).toString());
    }
  }

  function handlesNeg(event) {
    event.preventDefault();

    if (!num2) {
      setNum1((+num1 * -1).toString());
    } else {
      setNum2((+num2 * -1).toString());
    }
  }

  function handlesDec(event) {
    event.preventDefault();
    if (num1 && !num2) {
      if (!num1.includes(".")) {
        setNum1(num1 + ".");
      }
    }

    if (num1 && num2) {
      if (!num2.includes(".")) {
        setNum2(num2 + ".");
      }
    }
  }

  function handlesEquates() {
    if (!num2) {
      setIsOperating(false);
      return;
    }
    console.log("handle equates", operator);
    if (operator == "/" && +num2 == 0) {
      setNum1("No");
      setNum2("");
      return;
    }

    const res = operators[operator](+num1, +num2);
    setNum1(res.toString());
    setNum2("");
    setOperator("");
  }

  function handleSetOperator(ops) {
    if (isOperating && operator) {
      handlesEquates();
    }

    setIsOperating(true);
    setOperator(ops);
  }

  const body = (
    <Box>
      <Flex>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              allClear();
            }}
          >
            AC
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button onClick={handlesNeg}>+/-</Button>
        </Box>
        <Box width={"25%"}>
          <Button onClick={handlesPercentage}>%</Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSetOperator("/");
            }}
          >
            /
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("7");
            }}
          >
            7
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("8");
            }}
          >
            8
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("9");
            }}
          >
            9
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSetOperator("*");
            }}
          >
            *
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("4");
            }}
          >
            4
          </Button>{" "}
        </Box>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("5");
            }}
          >
            5
          </Button>{" "}
        </Box>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("6");
            }}
          >
            6
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSetOperator("-");
            }}
          >
            -
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("1");
            }}
          >
            1
          </Button>{" "}
        </Box>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("2");
            }}
          >
            2
          </Button>
        </Box>
        <Box width={"25%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("3");
            }}
          >
            3
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleSetOperator("+");
            }}
          >
            +
          </Button>
        </Box>
      </Flex>
      <Flex>
        <Box width={"50%"}>
          {" "}
          <Button
            onClick={(event) => {
              event.preventDefault();
              handleNumberClick("0");
            }}
          >
            0
          </Button>
        </Box>
        <Box width={"25%"}>
          <Button onClick={handlesDec}>.</Button>
        </Box>
        <Box width={"25%"}>
          <Button
            onClick={(event) => {
              event.preventDefault();
              handlesEquates();
              setEqualClear(true);
            }}
          >
            =
          </Button>
        </Box>
      </Flex>
    </Box>
  );

  return (
    <>
      <Center>
        <Box
          marginTop={"200px"}
          alignContent={"center"}
          justifyContent={"center"}
          maxWidth={"700px"}
        >
          <Input
            value={!num2 ? num1 : num2}
            onKeyDown={handleInputChange}
            onChange={handleInputChange}
          />
          {body}
        </Box>
      </Center>
    </>
  );
};

export default Home;
