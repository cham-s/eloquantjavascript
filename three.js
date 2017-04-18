var landscape = function () {
    var result = "";
    var flat = function (size) {
        for (var count = 0; count < size; count++) {
            result += "_";
        }
    };
    var mountain = function (size) {
        result += '/';
        for (var count = 0; count < size; count++) {
            result += "\\";
        }        
    };

    flat(3);
    mountain(4);
    flat(6);
    mountain(1);
    flat(1);
    return result;
}

function wrapValue(n) { 
    var localVariable = n;
    return function () { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);

function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

var twice = multiplier(2);

function findSolution (target) {
    function find(start, history) {
        if (start == target)
            return history;
        else if (start > target)
            return null;
        else
            return  find(start + 5, "(" + history + " + 5)") ||
                    find(start * 3, "(" + history + " * 3)");
    }
    return find(1, "1");
}

function printFarmInventory(cows, chikens) {
    var cowString = String(cows);
    while (cowString.length < 3)
        cowString = "0" + cowString;
    console.log(cowString + " Cows");
    var chikenString = String(chikens);
    while (chikenString.length < 3)
        chikenString = "0" + chikenString;
    console.log(chikenString + " Chikens");
}

var min = function (firstNum, secondNum) {
    return firstNum < secondNum? firstNum: secondNum;
};

var isEven = function (n) {
    n = n < 0? -n: n;
    if (n == 0)
        return true;
    if (n == 1)
        return false;
    return isEven(n - 2);
};

var countBs = function(target) {
    var count = 0;
    for (var i = 0; i < target.length; i++) {
        if (target[i] === "B")
            count += 1;
    }
    return count;
};

var countChar = function(target, char) {
    var count = 0;
    for (var i = 0; i < target.length; i++) {
        if (target[i] === char)
            count += 1;
    }
    return count;
};

var countChar

console.log(countBs("Bifdsfd bbsbb b kjkjfd Bsdfdsfds B fjskfdskfdsfs"));
console.log(countChar("Bi", 'i'));