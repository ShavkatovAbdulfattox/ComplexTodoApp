import React, { useCallback, useState } from "react";

function useToggle(initialValue = false) {
  if (typeof initialValue !== "boolean") {
    throw new Error("type of initialValue for useToggle must be boolean");
  }
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(() => {
    setValue((prevValue) => !prevValue);
  });

  return [value, handleChange];
}

export default useToggle;
