const brackets = ["[]", "()", "<>", "{}"];

const selectTheKing = arr => {
  const resultsArray = arr.map(group => {
    let power = 0;
    let currentString = group;
    while (currentString) {
      const indices = [];
      brackets.forEach(bracket => {
        let i = -1;
        while ((i = currentString.indexOf(bracket, i + 1)) != -1) {
          indices.push(i);
        }
      });
      if (indices.length === 0) {
        return (power = 0);
      }
      currentString = currentString.replace(/./g, (char, index) => {
        indices.forEach(i => {
          if (i === index || i + 1 === index) {
            char = "";
          }
        });
        return char;
      });
      power++;
    }
    return power;
  });

  let king;
  const maxValue = Math.max(...resultsArray);
  const isOnlyOneMax =
    resultsArray.lastIndexOf(maxValue) === resultsArray.indexOf(maxValue);
  if (isOnlyOneMax) {
    king = resultsArray.indexOf(maxValue);
  }
  return king;
};

console.log(selectTheKing(["[([])]()", "<(<>){({})}>", "()<(){<>}>"])); //1
console.log(selectTheKing(["([[<>(]()])<>", "(<>({}))[]", "[<{}>()]"])); //undefined

module.exports = arr => selectTheKing(arr);
