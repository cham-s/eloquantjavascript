'use strict';

function logEach(array) {
    for (var i = 0; i < array.length; i++)
        console.log(array[i]);
}

function forEach(array, action) {
    for (var i = 0; i < array.length; i++)
        action(array[i]);
}

//forEach([1, 3, 4], console.log);

// var numbers = [1, 3, 4, 5];
// var sum = 0;
// forEach(numbers, function (number) {
//     sum += number;
// });

// console.log(sum);

// function gatherCorrelations(journal) {
//     var phis = {};
//     journal.forEach(function (entry) {
//         entry.events.forEach(function (event) {
//             if (!(event in phis))
//                 phis[event] = phi(tableFor(event, journal));
//         });
//     });
//     return phis;
// }

function greaterThan10(n) {
    return function(m) { return m > n };
}

var greaterThan10 = greaterThan10(10);
//console.log(greaterThan10(11));

function noisy(f) {
    return function(arg) {
        console.log("calling with", arg);
        var val = f(arg);
        console.log("calling with", arg, "- got", val);
        return val;
    };
}

//console.log(Boolean(0))
//var res = noisy(Boolean);
//res(0);

function unless(test, then) {
    if (!test) then();
}

function repeat (times, body) {
    for (var i = 0; i < times; i++) body(i);
}

// repeat(3, function(n) {
//     unless(n % 2, function() {
//         console.log(n, "is even");
//     });
// });

function transparentWrapping(f) {
    return function() {
        return f.apply(null, arguments);
    }
}

var ANCESTRY =  require('./ancestry');

var ancestry = JSON.parse(ANCESTRY);

//console.log(ancestry.length);

function filter(array, test) {
    var passed = [];
    for (var i = 0; i < array.length; i++) {
        if (test(array[i]))
            passed.push(array[i]);
    }
    return passed;
}

// console.log(filter(ancestry, function(person){
//     return person.born > 1900 && person.born < 1925;
// }));

// console.log(ancestry.filter(function(person) {
//     return person.born > 1900 && person.born < 1925;
// }));

function map(array, transform) {
    var mapped = [];
    for (var i = 0; i < array.length; i++) {
        mapped.push(transform(array[i]));        
    }
    return mapped;
}

var overNinety = ancestry.filter(function(person) {
    return person.died - person.born > 90;
});

// console.log(map(overNinety, function(person){
//     return person.name;
// }));

function reduce(array, combine, start) {
    var current = start;
    for (var i = 0; i < array.length; i++)
        current = combine(current, array[i]);
    return current;
}

// console.log(reduce([1, 2, 3, 4], function (a, b) {
//     return a * b;
// }, 1));

// console.log(ancestry.reduce(function(min, cur) {
//     if (cur.born < min.born) return cur;
//     else return min;
// }));

var min = ancestry[0];
for (var i = 1; i < ancestry.length; i++) {
    var cur = ancestry[i];
    if (cur.born < min.born)
        min = cur;
}
//console.log(min);

function average(array) {
    function plus(a, b) { return a + b; }
    return array.reduce(plus) / array.length;
}

function age(p) { return p.died - p.born; }
function male(p) { return p.sex == "m"; }
function female(p) { return p.sex == "f"; }

// console.log(average(ancestry.filter(male).map(age)));
// console.log(average(ancestry.filter(female).map(age)));


var byName = {};
ancestry.forEach(function(person) {
    byName[person.name] = person;
});

//console.log(byName);
// Mother-child age difference



function presentMom(person) { return person.mother !=null }
function undefMon(person) { return byName[byName[person.name].mother] !== undefined };
function difference(person) { return person.born - byName[byName[person.name].mother].born }


var ave = average(ancestry
                .filter(presentMom)
                .filter(undefMon)
                .map(difference));


// console.log(byName["Philibert Haverbeke"]);

function reduceAncestors(person, f, defaultValue) {
    function valueFor(person) {
        if (person == null)
            return defaultValue;
        else {
            //console.log("mother: " + JSON.stringify(byName[person.mother] + " father: " + byName[person.mother], null, '\t'));
            return f(person, valueFor(byName[person.mother]),
                             valueFor(byName[person.father]));
        }
    }
    return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
    console.log( "mother: " + fromMother + " father: " + fromFather + " = " +  (fromMother + fromFather / 2));
    if (person.name == "Pauwels van Haverbeke")
        return 1;
    else {
        //console.log("mother: " + fromMother + " father: " + fromFather)
        return (fromMother + fromFather) / 2;
    }
}

var ph = byName["Philibert Haverbeke"];
//console.log(reduceAncestors(ph, sharedDNA, 0) / 4);

function countAncestors(person, test) {
    function combine(current, fromMother, fromFather) {
        var thisOneCounts = current != person && test(current);
        return fromMother + fromFather + (thisOneCounts? 1: 0);
    }
    return reduceAncestors(person, combine, 0);
}

function longlivingPercentage(person) {
    var all = countAncestors(person, function (person) {
        return true;
    });
    var longLiving = countAncestors(person, function (person) {
        return (person.died - person.born) >= 70;
    });
    return longLiving / all;
}

//console.log(longlivingPercentage(byName["Emile Haverbeke"]))

// Binding
var theSet = ["Carel Haverbeke", "Maria van Brussel", "Donald Duck"];

function isInSet(set, person) {
    return set.indexOf(person.name) > -1;
}

// console.log(ancestry.filter(function(person) {
//     return isInSet(theSet, person);
// }));

// console.log(ancestry.filter(isInSet.bind(null, theSet)));

var arOfAr = [[1], [2], [3], [4], [5]];

var flat = arOfAr.reduce(function(a, b) {
    return a.concat(b);
});


function groupBy(array, groupOf) {
    var groups = {};
    array.forEach(function(element) {
        var groupName = groupOf(element);
        if (groupName in groups)
            groups[groupName].push(element);
        else
            groups[groupName] = [element];
    });

    return groups;


}

var byCentury = groupBy(ancestry, function(person) {
    return Math.ceil(person.died / 100);
});

// for (var century in byCentury) {
//     var ages = byCentury[century].map(function(person) {
//         return person.died - person.born;
//     });
//     console.log("century: " + century + " average: " + average(ages));
// }

function some(array, predicate) {
    for (var i = 0; i < array.length; i ++)
        if (predicate(array[i]))
            return true;
    return false;
}

function every(array, predicate) {
    for (var i = 0; i < array.length; i ++)
        if (!predicate(array[i]))
            return false;
    return true;
}


function isBiggerThan10(element) {
  return element > 10;
}

console.log(every([17, 16, 19], isBiggerThan10));

