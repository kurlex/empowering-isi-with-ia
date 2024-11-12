export const updateIAResponseDisplayState = (
  prevDisplayState,
  completeDisplayState
) => {
  let newDisplayState = { ...prevDisplayState };
  let isValueUpdated = false;
  if (newDisplayState.payload.length < completeDisplayState.payload.length) {
    newDisplayState.payload +=
      completeDisplayState.payload[newDisplayState.payload.length];
    isValueUpdated = true;
  }

  if (!isValueUpdated) {
    newDisplayState.isCompeleted = true;
  }
  return newDisplayState;
};
