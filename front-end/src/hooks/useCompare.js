import { usePrevious } from "./usePrevious";

export default function useCompareArrayOfObjects(value) {
  const previousValue = usePrevious(value);

  return JSON.stringify(previousValue) === JSON.stringify(value);
}
