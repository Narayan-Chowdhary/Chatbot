import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({ setter }) {
  const [value, setValue] = React.useState([]);

  const handleValueChange = (val) => {
    setValue(val)
    setter(val)
  }

  return (
    <>
      <Autocomplete
        value={value}
        multiple
        limitTags={5}
        onChange={(event, newValue) => handleValueChange(newValue)}
        id="free-solo-with-text-demo"
        options={[]}
        getOptionLabel={(option) => option}
        sx={{ width: '100%', borderRadius: "10px", }}
        freeSolo
        renderInput={(params) => (
          <>
            <TextField {...params} label="Add Tags" />
            <p style={{ fontSize: 12, fontWeight: 'Light', color: "#2196F3", marginTop: 3, marginLeft: 10 }}>Please press enter to register tag</p>

          </>
        )}
      />
    </>
  );
}
