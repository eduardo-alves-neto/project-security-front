interface ICompareStructures<T> {
  currentValues: T;
  oldValues: T;
}

//devolver chaves diferentes
export default function compareStructures<T>({
  currentValues,
  oldValues,
}: ICompareStructures<T>) {
  let hasChange = false;
  const res = [];

  if (currentValues && !oldValues) {
    return {
      changedKeys: Object.keys(currentValues as object),
      hasChange: true,
    };
  }

  const currentValuesKeys = Object.keys(currentValues as object);

  for (const key of currentValuesKeys) {
    const currentValue = currentValues[key as keyof T];
    const oldValue = oldValues[key as keyof T];

    if (currentValue !== oldValue) {
      hasChange = true;
      res.push(key);
    }
  }

  return { changedKey: res, hasChange };
}
