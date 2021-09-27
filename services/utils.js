exports.generateUniqueId = (lastGeneratedId) => {
    let newGeneratedId;
    if (!lastGeneratedId) {
      newGeneratedId = "0000";
    } else {
      let newId = lastGeneratedId * 1 + 1;
      let slicedId = "0000".slice(newId.toString().length, 4);
      newGeneratedId = slicedId.concat(newId);
    }
    return newGeneratedId;
  };