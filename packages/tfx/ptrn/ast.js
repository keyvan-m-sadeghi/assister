import * as cst from './cst.js';

class Tracker {
  constructor() {
    this.terminals = new Set();
    this.macros = new Map();
  }

  addTerminal(text) {
    this.terminals.add(text);
  }

  addMacro(macroASTNode) {
    let current = this.macros.get(macroASTNode.name) || [];
    const alreadyExists = current
      .some(macro => macro.value == macroASTNode.value);
    if (!alreadyExists) {
      current = [...current, macroASTNode];
    }
    this.macros.set(macroASTNode.name, current);
  }
}

export function parse(ptrnText) {
  const {concreteSyntaxTree, BasePTRNVisitor} = cst.parse(ptrnText);

  const tracker = new Tracker();

  const tokenToASTNode = token => ({
    type: token.tokenType.name,
    value: token.image,
    startOffset: token.startOffset,
    endOffset: token.endOffset
  });

  const childToASTNode = child => ({
    type: child.name,
    value: chopValueFromText(child),
    startOffset: child.location.startOffset,
    endOffset: child.location.endOffset
  });

  const chopValueFromText = child => ptrnText
    .slice(child.location.startOffset, child.location.endOffset + 1);  

  class PTRNToASTVisitor extends BasePTRNVisitor {
    constructor() {
      super();
      this.validateVisitor();
    }

    getChildrenAndSortAsAppeared({
      parent,
      tokenChildNames = [],
      ruleChildNames = []
    }) {
      const children = [];
      tokenChildNames
        .map(childName => {
          if (parent[childName]) {
            parent[childName]
              .map(token => children.push(tokenToASTNode(token)))
          }
        });
      ruleChildNames
        .map(childName => {
          if (parent[childName]) {
            parent[childName]
              .map(child => children.push({
                ...childToASTNode(child),
                ...this.visit(child)
              }))
          }
        });
      return children.sort(
        (first, second) => first.startOffset - second.startOffset
      );
    }

    pattern(ctx) {
      const rootNode = {
        value: ptrnText,
        macros: tracker.macros,
        terminals: tracker.terminals,
        children: this.getChildrenAndSortAsAppeared({
          parent: ctx,
          tokenChildNames: ['literal'],
          ruleChildNames: ['template']
        })
      };
      rootNode.children
        .filter(child => child.type === 'literal')
        .map((child) => tracker.addTerminal(child.value));
      return rootNode;
    }

    template(ctx) {
      return this.visit(ctx.alternation);
    }

    addParentOnlyIfMoreThanOneChild({
      parent,
      parentName,
      childName
    }) {
      if (parent[childName].length > 1) {
        return {
          [parentName]: parent[childName]
            .map(child => this.visit(child))
        };        
      }
      return this.visit(parent[childName][0]);
    }

    alternation(ctx) {
      return this.addParentOnlyIfMoreThanOneChild({
        parent: ctx,
        parentName: 'alternation',
        childName: 'concatenation'
      });
    }

    concatenation(ctx) {
      return this.addParentOnlyIfMoreThanOneChild({
        parent: ctx,
        parentName: 'concatenation',
        childName: 'option'
      });
    }

    addParentOnlyIfChildHasOption({
      parent,
      parentName,
      childName,
      optionName
    }) {
      if (parent[optionName]) {
        return {
          [parentName]: this.visit(parent[childName])
        };
      }
      return this.visit(parent[childName]);
    }

    option(ctx) {
      return this.addParentOnlyIfChildHasOption({
        parent: ctx,
        parentName: 'option',
        childName: 'repetition',
        optionName: 'emptyAllowed'
      });
    }

    repetition(ctx) {
      return this.addParentOnlyIfChildHasOption({
        parent: ctx,
        parentName: 'repetition',
        childName: 'unit',
        optionName: 'star'
      });
    }

    addParentWithSingleChild({parent, parentName}) {
      return {
        [parentName]: Object.values(parent)
          .map(child => this.visit(child))[0]
      };
    }

    unit(ctx) {
      const unitNode = this.addParentWithSingleChild({
        parent: ctx,
        parentName: 'unit'
      });
      const unit = unitNode.unit;
      if (unit.type === 'stringContent') {
        tracker.addTerminal(unit.value);
      } else if (unit.type === 'macro') {        
        tracker.addMacro(unit);
      }
      return unitNode;
    }

    string(ctx) {
      return tokenToASTNode(ctx.stringContent[0]);
    }

    termOrMacro(ctx) {
      const identifier = ctx.identifier[0];
      const type = ctx.macroCall ? 'macro' : 'term';
      let call = ctx[`${type}Call`];
      let value = identifier.image;
      let args;
      if (call) {
        call = call[0];
        value += childToASTNode(call).value;
        args = this.visit(call);
      }
      return {
        type,
        value,
        name: identifier.image,
        startOffset: identifier.startOffset,
        endOffset: call ? call.location.endOffset : identifier.endOffset,
        ...args
      };
    }

    termCall(ctx) {
      return {
        callArgs: [childToASTNode(ctx.options[0]).value]
      }
    }

    macroCall(ctx) {
      const children = this.getChildrenAndSortAsAppeared({
        parent: ctx,
        ruleChildNames: ['termOrMacro', 'options']
      });
      return {
        callArgs: children
          .map(child => 
            child.type === 'term' || child.type === 'macro' ?
              `\`${child.value}\`` : child.value
          )
      };
    }

    group(ctx) {
      return {
        group: this.visit(ctx.alternation)
      };
    }
  }
  const visitor = new PTRNToASTVisitor();
  return visitor.visit(concreteSyntaxTree);
}
