'use strict';

var rabbit = {};
rabbit.speak = function(line) {
    console.log("'The rabbit says '" + line + "'");
};

// rabbit.speak("I'm alive");

function speak(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
}

var whiteRabbit = {type: "white" , speak: speak};
var fatRabbit = {type: "fat", speak: speak};

// whiteRabbit.speak("Oh my...");

// speak.apply(fatRabbit, ["Miam"]);

// speak.call({type: "old"}, "Why you");

// var empty = {};
// console.log(empty.toString);
// console.log(empty.toString());

var protoRabit = {
    speak: function(line) {
        console.log("The " + this.type + " rabbit says '" + line + "'");
    }
};

var killerRabbit = Object.create(protoRabit);
killerRabbit.type = "killer";
// killerRabbit.speak("SKREE");

function Rabbit(type) {
    this.type = type
}

var killerRabbit2 = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
//console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
        console.log("The " + this.type + " rabbit says '" + line + "'");    
};

// blackRabbit.speak("Doom...");

Rabbit.prototype.teeth = "small";
//console.log(killerRabbit2.teeth);

//project
function rowHeights(rows) {
    return rows.map(function() {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, i) {
        return rows.reduce(function (max, row) {
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(blocks, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(row, rowNum) {
        var blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo)
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
        result +=string;
    return result;
}

function TextCell(text) {
    this.text = text.split("\n");
}

TextCell.prototype.minWidth = function() {
    return this.text.reduce(function(width, line) {
        return Math.max(width, line.length);
    }, 0);
};

TextCell.prototype.minHeight = function() {
    return this.text.length;
};

TextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length));
    }
    return result;
};

var rows = [];
for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 == 0)
            row.push(new TextCell("##"));
        else
            row.push(new TextCell("  "));
    }
    rows.push(row);
}


var MOUTAINS = require("./mountains");

function UnderlinedCell(inner) {
    this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight();
};
UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
        .concat([repeat("-", width)]);
};

function stopAsec(message) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Do you want to have the prompt back?', (answer) => {
        console.log(`Ok I get it leaving now`);
        rl.close();
    });
}

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function (name) {
        return new UnderlinedCell(new TextCell(name));
    });

    var body = data.map(function (row) {
        return keys.map(function (name) {
            var value = row[name];
            if (typeof value == "number")
                return new RTextCell(String(value));
            else
                return new TextCell(String(value))
        });
    });
    return [headers].concat(body);
}

var pile = {
    elements: ["eggshell", "orange peel", "worm"],
    get height() {
        return this.elements.length;
    },
    set height(value) {
        console.log("Ignoring attempt to set height to ", value);
    }
};

Object.defineProperty(TextCell.prototype, "heightProp", {
    get: function () { return this.text.length; }
});

var cell = new TextCell("no\nway");
// console.log(cell.heightProp);

function RTextCell(text) {
    TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", width - line.height) + line);
    }
    return result;
};

// console.log(drawTable(dataTable(MOUTAINS)));

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.minus  = function(vector) {
    return (Vector(this.x - vector.x, this.y - vector.y));
};
Vector.prototype.plus  = function(vector) {
    return (Vector(this.x + vector.x, this.y + vector.y));
};

Object.defineProperty(Vector.prototype, "length", {
    get: function() {
        return (Math.sqrt(this.x * this.x + this.y * this.y))
    }
});

