const nameRegistry = {};

const registry = {
  registerId: (name, id) => {
    nameRegistry[name] = id;
  },
  getId: name => {
    if (!nameRegistry[name]) {
      throw new RangeError(`name "${name}" is not defined in TFX name registry.`);
    }

    return nameRegistry[name];
  }
};

export {registry};
