const onInputDropdownChange = (e, idName, objectState, setObjectState) => {
  let inputValue = (e.target && e.target.value) || "";
  let objectStateCopy = { ...objectState };

  objectStateCopy[`${idName}`] = inputValue.id;
  setObjectState(objectStateCopy);
};

module.exports = onInputDropdownChange;
