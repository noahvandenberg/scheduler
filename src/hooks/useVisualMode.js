import { useState } from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace === false) {
      setHistory([...history, newMode]);
    };
    if (replace === true) {
      let altHistory = [...history];
      altHistory[history.length - 1] =  newMode;
      setHistory(altHistory);
    }
  };

  const back = () => {
    let altHistory = [...history]
    if (altHistory.length <= 1) {
      return;
    };
    altHistory.pop(mode);
    setHistory(altHistory);
    setMode(altHistory[altHistory.length - 1]);
  };

  return { mode, transition, back };
}























































//   function transition(mode, replace = false) {
//   if (replace === true) {
//     setMode(mode)
//     const newHistory = [...history]
//     newHistory[newHistory.length - 1] = mode;
//     setHistory(newHistory)
//   } else {
//     setMode(mode)
//     const prevHistory = [...history]
//     prevHistory.push(mode)
//     setHistory(prevHistory)
//   }
// }

// const back = function() {
//   let newHistory = [...history]
//   newHistory.pop(mode);
//   if(history.length > 1) { 
//     setHistory(newHistory);
//     setMode(newHistory[newHistory.length -1])
//   }
// }