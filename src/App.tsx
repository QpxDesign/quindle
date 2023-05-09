import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import words from "./assets/words.json";

function App() {
  const [keyboard, setKeyboard]: any = useState([[]]);
  const [currentSquareX, setCurrentSquareX] = useState(0);
  const [currentSquareY, setCurrentSquareY] = useState(0);
  const gb = [
    ["q", "w", "e", "r", "t", "y", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["ENT", "z", "x", "c", "v", "b", "n", "m", "DEL"],
  ];
  useEffect(() => {
    setKeyboard(gb);
    console.log(keyboard);
  }, []);
  const [gameboard, setGameboard]: any = useState([[]]);
  useEffect(() => {
    setGameboard(makeArray(5, 6, ""));
    console.log(gameboard);
    console.log(makeArray(5, 6, ""));
  }, []);
  return (
    <div className="App">
      <div className="gameboard">
        {gameboard.map((item1: any, index1: any) => {
          return (
            <div className="row" key={index1}>
              {item1.map((item2: any, index2: any) => {
                return (
                  <div
                    key={index2}
                    className="square"
                    style={{
                      background:
                        currentSquareX === index1 && currentSquareY === index2
                          ? "red"
                          : "",
                    }}
                  >
                    <h1>{item2} </h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="keyboard">
        {" "}
        {keyboard.map((item1: any, index1: any) => {
          return (
            <div className="row" key={index1}>
              {item1.map((item2: any, index2: any) => {
                return (
                  <div className="square" key={index2}>
                    <h1
                      onClick={() => {
                        if (item2 === "DEL") {
                          if (currentSquareY !== 0) {
                            setCurrentSquareY(currentSquareY - 1);
                          }
                          var tmpGB = gameboard.map((i1: any, in1: any) => {
                            return i1.map((i2: any, in2: any) => {
                              if (
                                in1 === currentSquareX &&
                                in2 === currentSquareY - 1
                              ) {
                                return "";
                              }
                              return i2;
                            });
                          });
                          setGameboard(tmpGB);
                        } else if (item2 === "ENT") {
                          console.log(
                            checkValidWordFromRow(gameboard[currentSquareX])
                          );
                        } else {
                          var tmpGB = gameboard.map((i1: any, in1: any) => {
                            return i1.map((i2: any, in2: any) => {
                              if (
                                in1 === currentSquareX &&
                                in2 === currentSquareY
                              ) {
                                return item2;
                              }
                              return i2;
                            });
                          });
                          setGameboard(tmpGB);
                          // handle move cursor
                          if (currentSquareY !== 4) {
                            setCurrentSquareY(currentSquareY + 1);
                          }
                        }
                      }}
                    >
                      {item2}
                    </h1>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

function makeArray(w: any, h: any, val: any) {
  var arr: any = [];
  for (let i = 0; i < h; i++) {
    arr[i] = [];
    for (let j = 0; j < w; j++) {
      arr[i][j] = val;
    }
  }
  return arr;
}

function checkRowFilled(row: Array<any>) {
  row.forEach((item) => {
    if (item === "") return false;
  });
  return true;
}

function checkValidWordFromRow(row: Array<any>) {
  var word = "";
  row.forEach((item) => {
    word += item;
  });
  words.forEach((item: string) => {
    console.log(word + "-");
    if (item === word) return true;
  });
  return false;
}
