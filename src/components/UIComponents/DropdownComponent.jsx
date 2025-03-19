import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const DropdownComponent = ({setInitialLanguage, options, initialOptionValue}) => {
  const [selectedOption, setSelectedOption] = useState(initialOptionValue);



  useEffect(()=>{
    if(initialOptionValue){
        setInitialLanguage(initialOptionValue)
      }
  },[])

  const handleChange = (event) => {
    setInitialLanguage(event.target.value);
    setSelectedOption(event.target.value)
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Choose an option</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedOption}
        label="Choose an option"
        onChange={handleChange}
        disabled={initialOptionValue}
      >
        {options?.map((option,index)=>(
            <MenuItem key={index} value={option}>{option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropdownComponent;
