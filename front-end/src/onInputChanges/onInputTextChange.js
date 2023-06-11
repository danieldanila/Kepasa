const onInputTextChange = (e, idName, objectState, setObjectState) => {
  const inputValue = (e.target && e.target.value) || "";
  let objectStateCopy = { ...objectState };
  objectStateCopy[`${idName}`] = inputValue;
  setObjectState(objectStateCopy);
};

export default onInputTextChange;
