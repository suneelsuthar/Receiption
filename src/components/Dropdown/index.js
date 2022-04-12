import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import theme from "../../../theme";
function Dropdown({ data, onchange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(data);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      listMode="SCROLLVIEW"
      setValue={setValue}
      onChangeValue={() => onchange(value)}
      setItems={setItems}
      placeholder="Enter Item type"
      style={{ borderColor: "#C4C4C4", borderRadius: 6, height: 60 }}
      textStyle={{ fontFamily: theme.bold }}
    />
  );
}

export default Dropdown;
