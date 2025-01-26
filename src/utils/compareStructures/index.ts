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

  //  for (const key of Object.keys(newValues ?? {})) {
  //   if (
  //     (oldValues as any)?.[key] === undefined ||
  //     (oldValues as any)?.[key] === null ||
  //     (newValues as any)?.[key] !== (oldValues as any)[key] ||
  //     (key === 'Guid' && !options?.ignoreGuids) ||
  //     (key === 'Guid' && options?.keepGuidsIfNecessary) ||
  //     (key === 'Code' && !options?.ignoreCodes) ||
  //     options?.ignoreFields?.includes(key) ||
  //     typeof (newValues as any)?.[key] === 'boolean'
  //   ) {
  //     if (
  //       (newValues as any)?.[key] !== (oldValues as any)?.[key] &&
  //       ((newValues as any)?.[key] === '' || (newValues as any)?.[key] === 0)
  //     ) {
  //       hasFieldsRemoved = true;
  //     }

  //     (result as any)[key] = (newValues as any)?.[key];
  //   }

  //   if (typeof (newValues as any)[key] === 'object') {
  //     if (Array.isArray((newValues as any)?.[key])) {
  //       if (
  //         !(oldValues as any)?.[key] ||
  //         !Array.isArray((oldValues as any)?.[key]) ||
  //         (newValues as any)?.[key]?.length !== (oldValues as any)?.[key].length ||
  //         options?.ignoreArrays
  //       ) {
  //         (result as any)[key] = (newValues as any)?.[key];
  //         continue;
  //       }

  //       const newArrays = compareArrays(
  //         (newValues as any)?.[key],
  //         (oldValues as any)?.[key],
  //         options,
  //       );

  //       if (newArrays.hasFieldsRemoved) hasFieldsRemoved = true;
  //       if (newArrays.data.length) (result as any)[key] = newArrays.data;
  //       else delete (result as any)[key];
  //     } else {
  //       const newObject = compareValues(
  //         (newValues as any)?.[key],
  //         (oldValues as any)?.[key],
  //         options,
  //       );

  //       if (newObject.hasFieldsRemoved) hasFieldsRemoved = true;
  //       if (newObject && !!Object?.keys(newObject?.data)?.length)
  //         (result as any)[key] = newObject.data;
  //       else delete (result as any)[key];
  //     }
  //   }
  // }

  // // if (!options?.compareBooleansAndRemove)
  // //   for (const key of Object.keys(newValues ?? {})) {
  // //     if (typeof (newValues as any)?.[key] === 'boolean') {
  // //       (result as any)[key] = (newValues as any)?.[key];
  // //     }
  // //   }

  // if (options?.compareBooleansAndRemoveIfEqual) {
  //   for (const key of Object.keys(newValues ?? {})) {
  //     if (!options.ignoreFields?.includes(key)) {
  //       if (typeof (newValues as any)?.[key] === 'boolean') {
  //         if ((newValues as any)?.[key] === (oldValues as any)?.[key]) {
  //           delete (result as any)[key];
  //         }
  //       }
  //     }
  //   }
  // }

  // if (result?.hasOwnProperty('AlreadyRegistered'))
  //   delete result['AlreadyRegistered' as keyof typeof result];

  // if (options?.removeisDeletedFields)
  //   if ('isDeleted' in result && result.isDeleted === false) delete result.isDeleted;

  // if (options?.clearEmptyValues)
  //   return {
  //     data: removeEmptyValues(result as Partial<Pick<T, Extract<keyof T, keyof U>>>),
  //     hasFieldsRemoved,
  //   };

  // if (options?.keepGuidsIfNecessary) {
  //   const keys = Object.keys(result);
  //   if (keys.length === 2 && keys.includes('Guid') && keys.includes('Code')) {
  //     if ('Guid' in result) delete result.Guid;
  //     if ('Code' in result) delete result.Code;
  //   } else if (keys.length === 1 && (keys.includes('Guid') || keys.includes('Code'))) {
  //     if ('Guid' in result) delete result.Guid;
  //     if ('Code' in result) delete result.Code;
  //   }
  // }

  // return { data: result as Partial<Pick<T, Extract<keyof T, keyof U>>>, hasFieldsRemoved };
}
