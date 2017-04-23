'use strict';

var rabbit = {};
rabbit.speak = function(line) {
    console.log("'The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive");

function speak(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
}

var whiteRabbit = {type: "white" , speak: speak};
var fatRabbit = {type: "fat", speak: speak};

whiteRabbit.speak("Oh my...");

speak.apply(fatRabbit, ["Miam"]);

speak.call({type: "old"}, "Why you");

var empty = {};
console.log(empty.toString);
console.log(empty.toString());

var protoRabit = {
    speak: function(line) {
        console.log("The " + this.type + " rabbit says '" + line + "'");
    }
};

var killerRabbit = Object.create(protoRabit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREE");

function Rabbit(type) {
    this.type = type
}

var killerRabbit2 = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
        console.log("The " + this.type + " rabbit says '" + line + "'");    
};

blackRabbit.speak("Doom...");

Rabbit.prototype.teeth = "small";
console.log(killerRabbit2.teeth);

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
            return Math.max(max, row[i].minWidth);
        }, 0);
    });
}

function drawTable(rows) {
    var heights = rowHeights(rows);
    var widths = colWidths(rows);

    function drawLine(block, lineNo) {
        return blocks.map(function (block) {
            return block[lineNo];
        }).join(" ");
    }

    function drawRow(rw, rowNum) {
        var blocks = row.map(function (cell, colNum) {
            return cell.draw(widths[colNum], heights[rowNum]);
        });
        return blocks[0].map(function (_, lineNo) {
            return drawLine(blocks, lineNo)
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}