import React, { useRef, useState } from "react";
function App() {
  const [input, setInput] = useState({ getMark: "", outOf: "", credit: "" });
  const [marks, setMarks] = useState([]);
  const getMarksRef = useRef(null);

  const handleKeyPress=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      handleAdd();
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    let outOf100 = (input.getMark / input.outOf) * 100;
    

    let grade = "F",
      point = 0;
    if (outOf100 >= 90) (grade = "O"), (point = 10);
    else if (outOf100 >= 85) (grade = "A+"), (point = 9);
    else if (outOf100 >= 80) (grade = "A"), (point = 8);
    else if (outOf100 >= 70) (grade = "B+"), (point = 7);
    else if (outOf100 >= 60) (grade = "B"), (point = 6);
    else if (outOf100 >= 50) (grade = "C"), (point = 5);
    else if (outOf100 >= 40) (grade = "P"), (point = 4);
    const newEntry = {
      getMark: parseInt(input.getMark),
      outOf: parseInt(input.outOf),
      credit: parseInt(input.credit),
      grade: grade,
      CG:point*input.credit,
    };
    if (
      !isNaN(newEntry.getMark) &&
      !isNaN(newEntry.outOf) &&
      !isNaN(newEntry.credit)
    ) {
      setMarks((prev) => [...prev, newEntry]);
      setInput({ getMark: "", outOf: "", credit: "" });
    } else {
      alert("Please enter valid numbers");
    }
    getMarksRef.current.focus();
  };
  const [gpa,setGpa]=useState(0);
  const handleCalculation=()=>{
    const totalCredit = marks.reduce((sum, row) => sum + row.credit, 0);
    const totalPoint = marks.reduce((sum, row) => sum + row.CG, 0);
    setGpa(totalPoint / totalCredit);

  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="flex place-self-center underline mb-3 text-3xl font-bold">
          Add Marks
        </h1>
        <div className="flex flex-col p-4 sm:w-[500px] w-[300px] gap-4 border-4 border-black place-self-center">
          <div className="flex justify-between w-[275px]">
            <label name="getMarks" className="text-xl font-medium">
              Get Marks:{" "}
            </label>
            <input
              type="number"
              name="getMark"
              min={0}
              max={500}
              value={input.getMark}
              onChange={handleInputChange}
              placeholder="Enter marks you get"
              ref={getMarksRef}
              className="border rounded-lg text-sm w-[150px] pl-2 h-7"
            />
          </div>
          <div className="flex justify-between w-[275px]">
            <label name="outof" className="text-xl font-medium">
              Out Of:{" "}
            </label>
            <input
              type="number"
              name="outOf"
              min={0}
              max={500}
              value={input.outOf}
              onChange={handleInputChange}
              placeholder="Enter marks you get"
              className="border rounded-lg text-sm w-[150px] pl-2 h-7"
            />
          </div>
          <div className="flex justify-between w-[275px]">
            <label name="credit" className="text-xl font-medium">
              Credit:{" "}
            </label>
            <input
             onKeyDown={handleKeyPress}
              type="number"
              name="credit"
              min={0}
              max={5}
              value={input.credit}
              onChange={handleInputChange}
              placeholder="Enter marks you get"
              className="border rounded-lg text-sm w-[150px] pl-2 h-7"
            />
          </div>
          <button
            className="border-2 border-red-500 w-[120px] hover:bg-red-700 active:w-[110px] active:h-8 active:mt-1 rounded-lg bg-red-500 font-bold p-1 place-self-center"
            onClick={handleAdd}
            onKeyDown={handleKeyPress}
          >
            ADD MARKS
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="flex place-self-center underline mb-3 text-3xl font-bold">
          Marks List
        </h1>
        <div className="flex flex-col sm:w-[500px] w-[300px] border-4 border-black place-self-center">
          <div className="flex flex-row gap-2 pl-3 justify-around">
            <h1 className="w-[85px] font-medium text-xl">Get Mark</h1>
            <h1 className="w-[85px] font-medium text-xl">Out Of</h1>
            <h1 className="w-[85px] font-medium text-xl">Credit</h1>
            <h1 className="w-[85px] font-medium text-xl">Grade</h1>
          </div>

          <div>
            {marks.map((row, idx) => (
              <div className="flex flex-row pl-3 gap-2 justify-around">
                <p className="w-[75px]" key={idx}>
                  {row.getMark}
                </p>
                <p className="w-[75px]" key={idx}>
                  {row.outOf}
                </p>
                <p className="w-[75px]" key={idx}>
                  {row.credit}
                </p>
                <p className="w-[75px]" key={idx}>
                  {row.grade}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button 
      onClick={handleCalculation}
      className="bg-blue-500 w-[170px] place-self-center hover:bg-blue-700 active:w-[160px] active:h-8 active:mt-1 h-10 rounded-lg font-bold text-xl p-1">Calculate CGPA</button>
      <div className="flex flex-row gap-5 place-self-center">
        <h1 className="text-3xl font-bold mb-3">CGPA:</h1>
        <h1 className="text-3xl font-bold">{gpa}</h1>
      </div>
    </div>
    
  );
}

export default App;
