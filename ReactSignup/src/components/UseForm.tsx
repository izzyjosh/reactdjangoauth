import { useState } from "react";
export default function useForm(fields) {
  const [formField, setFormField] = useState(fields);

  const handleChange = e => {
    setFormField({ ...formField, [e.target.name]: e.target.value });
  };

  return [formField, handleChange];
}
