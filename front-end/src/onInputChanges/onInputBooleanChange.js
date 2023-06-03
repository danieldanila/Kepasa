const onInputBooleanChange = (e, idName, objectState, setObjectState) => {
  let objectStateCopy = { ...objectState };
  objectStateCopy[`${idName}`] = e.value.toString();
  setObjectState(objectStateCopy);
};

module.exports = onInputBooleanChange;
