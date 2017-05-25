// var str = "Hello";

// console.log(str);

// var cartoonCrying = /boo+(hoo)+/i;

// console.log(cartoonCrying.test("Boohooooohooo"));

// var match = /\d+/.exec("one two 100");
// console.log(match);

// console.log(match.index);

// var quotedText = /'([^']*)'/;
// console.log(quotedText.exec("she said 'hello'"));

// console.log(/bad(ly)?/.exec("bad"));
// console.log(/(\d)+/.exec("123"));

// // The date type

// console.log(new Date());
// console.log(new Date(2009, 11, 9).getTime());

// console.log(new Date(1260313200000));

// function findDate(string) {
//   var dateTime = /(\d{1, 2})-(\d{1, 2})-(\d{4})/;
//   console.log(dateTime);
//   //var match = dateTime.exec(string);
  
//   //console.log(match);
//   return;
  
//   // return new Date(Number(match[3]),
//   //                 Number(match[2]),
//   //                 Number(match[1])
//   //   );
// }

// findDate("20-1-2003");

// //console.log(findDate("30-1-2003"));

// var s = "the cia and fbi";

// console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
//   return str.toUpperCase();
// }));

// var stock = "1 lemon, 2 cabbages, and 101 eggs";
// function minusOne(match, amount, unit) {
//   amount =  Number(amount) -1;
//   if (amount == 1) {
//     unit = unit.slice(0, unit.length - 1);
//   }
//   else if(amount === 0) {
//     amount = "no";
//   }
//   return amount + " " + unit;
// }

// console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

// var name2 = "harry";
// var text = "Harry is a suspicious character.";
// var regexp = new RegExp("\\b(" + name2 + ")\\b", "gi");
// console.log(text.replace(regexp, "_$1_"));

var pattern = /y/g
pattern.lastIndex = 3
var match = pattern.exec("xyzzy");
console.log(match.index);
console.log(pattern.lastIndex);

var digit = /\d/g;
console.log(digit.exec("Here it is: 1"));
console.log(digit.exec("and now: 1"));
console.log("Banana".match(/an/g));

var input = "A string with 3 numbers in it ... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Found", match[1], "at", match.index);
  
