import { React } from "react";

export default function InputTypeColor({ onColorChange, color, id }) {
  const handleChange = (e) => {
    onColorChange(e?.target?.value, color[0]);
  };

  return <input type="color" value={color[1]} onChange={handleChange} />;
}
