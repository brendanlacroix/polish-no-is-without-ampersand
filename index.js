module.exports = {
  message : 'State-modifying classes (ones that begin with .is-) should always be preceded by an ampersand.',
  name    : 'no-is-without-ampersand',
  test    : function(ast){
    var errors = [];

    ast.traverseByTypes(['class', 'id'], function(node, level, parent) {
      var nodeString = node.toString(),
          previous = parent.content[level - 1];

      if (nodeString.indexOf('.is-') === -1  && nodeString.indexOf('#is-') === -1) {
        return;
      }

      if (!previous || previous.type !== 'parentSelector') {
        errors.push({
          node : node
        });
      }
    });

    return errors;
  }
};