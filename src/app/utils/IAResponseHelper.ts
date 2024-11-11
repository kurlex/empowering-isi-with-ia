export const updateIAResponseDisplayState = (
  prevDisplayState,
  completeDisplayState,
  attributeOrder
) => {
  const getDefaultElement = (completeElement) => {
    if (attributeOrder.length === 1) {
      return "";
    }
    let element = {};
    Object.keys(completeElement).forEach(
      (elementKey) => (element[elementKey] = "")
    );

    return element;
  };
  let newDisplayState = { ...prevDisplayState };
  let isValueUpdated = false;
  if (newDisplayState.intro.length < completeDisplayState.intro.length) {
    newDisplayState.intro +=
      completeDisplayState.intro[newDisplayState.intro.length];
    isValueUpdated = true;
  } else {
    Object.keys(completeDisplayState).forEach((key) => {
      if (
        !newDisplayState.isCompeleted &&
        !isValueUpdated &&
        Array.isArray(completeDisplayState[key]) &&
        Array.isArray(newDisplayState[key]) &&
        completeDisplayState[key].length > 0
      ) {
        let completeArray = completeDisplayState[key];
        let newArray = newDisplayState[key];
        if (newArray.length === 0)
          newArray.push(getDefaultElement(completeArray[0]));

        attributeOrder.forEach((attribute) => {
          let completeValue = (
            attributeOrder.length === 1
              ? completeArray[newArray.length - 1]
              : completeArray[newArray.length - 1][attribute]
          ).toString();

          let newValue = (
            attributeOrder.length === 1
              ? newArray[newArray.length - 1]
              : newArray[newArray.length - 1][attribute]
          ).toString();

          if (!isValueUpdated && newValue !== completeValue) {
            isValueUpdated = true;
            if (attributeOrder.length === 1) {
              newArray[newArray.length - 1] += completeValue[newValue.length];
            } else {
              newArray[newArray.length - 1][attribute] +=
                completeValue[newValue.length];
            }
          }
        });

        if (!isValueUpdated && newArray.length < completeArray.length) {
          isValueUpdated = true;
          newArray.push(getDefaultElement(completeArray[0]));
        }
        newDisplayState[key] = newArray;
      }
    });
  }

  if (!isValueUpdated) {
    newDisplayState.isCompeleted = true;
  }

  return newDisplayState;
};
