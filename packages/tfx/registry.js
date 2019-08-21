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

class Registry {
  constructor() {
    this.scopes = {};
    this.globalScope = {};
  }

  register(name, id, scope = '@global') {
    this.scopes = {
      ...this.scopes,
      ...{
        [scope]: {
          ...(this.scopes[scope] || {}),
          [name]: id
        }
      }
    };
  }

  retrieve(name, scope = '@global') {
    if (!this.scopes[scope]) {
      throw new RangeError(`scope "${scope}" is not defined in TFx registry.`);
    }

    let id = this.scopes[scope][name];
    if (!id) {
      id = this.scopes['@global'][name];
    }

    if (!id) {
      throw new RangeError(`name "${name}" is not defined in TFx registry.`);
    }

    return id;
  }
}

export {registry, Registry};
