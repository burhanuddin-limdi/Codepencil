import { useEffect, useState } from "react";

const PREFIX = "codepencil-";

export default function useLocalStorage(
  key: string,
  initialValue: string | number
) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      const jsonValue = localStorage.getItem(prefixedKey);
      if (jsonValue != null) return JSON.parse(jsonValue);
    }
    return initialValue;
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
