import { InputProps } from "../ts";

const InputComponent = ({
  name,
  labelText,
  type,
  onChange,
  value,
}: InputProps) => {
  return (
    <div className="form-input-container" >
      <label htmlFor={name}  >{ labelText?labelText : name }</label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputComponent;
