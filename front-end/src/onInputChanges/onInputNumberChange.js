const onInputNumberChange = (e, idName, objectState, setObjectState) => {
  const inputValue = e.value || 0;
  let objectStateCopy = { ...objectState };
  objectStateCopy[`${idName}`] = inputValue;
  setObjectState(objectStateCopy);
};

export default onInputNumberChange;
