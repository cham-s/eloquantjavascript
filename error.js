const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function readDirection(question) {
    var result = "";
    var answerPromise = new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            if (answer.toLowerCase() == "left") {
                resolve("L");
            }
            if (answer.toLowerCase() == "right") {
                resolve("R");
            }
            reject(answer);
            rl.close();
        });       
    });

    return answerPromise;
}

function look() {
    var lookPromise = new Promise ((resolve, reject) => {
        readDirection("Which direction?")
        .then((answer) => {
            if (answer == "L")
                resolve("a house");
            else
                resolve("two angry bears");
        })
        .catch((error) => {
            reject("Invalid direction: " + answer);
        })
    });

    return lookPromise;
}

function AssertionFailed(message) {
    this.message = message;
}

AssertionFailed.prototype = Object.create(Error.prototype);

function assert(test, message) {
    if (!test)
        throw new AssertionFailed(message);
}

function lastElement(array) {
    assert(array.length > 0, "empty arra in lastElement");
    return array[array.length - 1]
}

