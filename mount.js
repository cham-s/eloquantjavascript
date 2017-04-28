'use strict';

var MOUNTAINS = require("./mountains");

function rowHeights(rows) {
    return rows.map(function (row) {
        return row.reduce(function (max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function (_, i) {
        return rows.reduce(function(max, row) {
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
            return drawLine(blocks, lineNo);
        }).join("\n");
    }
    return rows.map(drawRow).join("\n");
}

function CellText (text) {
    this.text = text.split("\n");
}

CellText.prototype.minHeight = function () {
    return this.text.length;
};

CellText.prototype.minWidth = function() {
    return this.text
                .reduce(function(max, line) {
                    return Math.max(max, line.length);
                }, 0);
};

CellText.prototype.draw = function (width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(line + repeat(" ", width - line.length))
    }
    return result;
};

function UnderlinedCell (inner) {
    this.inner = inner;
}

UnderlinedCell.prototype.minWidth = function() {
    return this.inner.minWidth();
};

UnderlinedCell.prototype.minHeight = function() {
    return this.inner.minHeight() + 1;
};

UnderlinedCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height - 1)
                     .concat([repeat("-", width)]);
};

function RTextCell(text) {
    CellText.call(this, text);
}

RTextCell.prototype = Object.create(CellText.prototype);
RTextCell.prototype.draw = function(width, height) {
    var result = [];
    for (var i = 0; i < height; i++) {
        var line = this.text[i] || "";
        result.push(repeat(" ", width - line.length) + line);
    }
    return result;
};

function StretchCell(inner, width, height) {
    this.inner = inner;
    this.width = width;
    this.height = height;
}

StretchCell.prototype.minWidth = function() {
    return Math.max(this.inner.minWidth(), this.width);
};

StretchCell.prototype.minHeight = function() {
    return Math.max(this.inner.minHeight(), this.height);
};

StretchCell.prototype.draw = function(width, height) {
    return this.inner.draw(width, height);
};

function repeat(string, times) {
    var result = "";
    for (var i = 0; i < times; i++)
        result += string;
    return result;
}

function dataTable(data) {
    var keys = Object.keys(data[0]);
    var headers = keys.map(function(name) {
        return new UnderlinedCell(new CellText(name));
    });
    var body = data.map(function (row) {
        return keys.map(function (name) {
            var value = row[name];
            if (typeof value == "number")
                return new RTextCell(String(value));
            else
                return new CellText(String(value));
            
        });
    });
    return [headers].concat(body);
}

Object.defineProperty(CellText.prototype, "heightProp", {
    get: function() {return this.text.length}
});

var cell = new CellText("noo\nway");
console.log(cell.heightProp);

var rs = [];

for (var i = 0; i < 5; i++) {
    var row = [];
    for (var j = 0; j < 5; j++) {
        if ((j + i) % 2 == 0)
            row.push(new CellText("##"));
        else
            row.push(new CellText(" "));
    }
    rs.push(row);
}

var rows = [
     [new CellText("name"),  new CellText("country"),  new CellText("height")],
     [new CellText("Dodo"),  new CellText("France"),  new CellText('12234')],
     [new CellText("Bob"),  new CellText("Belgium"),  new CellText('23456')],
     [new CellText("Bica"),  new CellText("Ductch"),  new CellText('6432')],
     [new CellText("Fouta"),  new CellText("Allemagne"),  new CellText('43213')]
];

function col(rows) {
    return rows[0].map(function (_, i) {
        return rows.reduce(function(max, row) {
            console.log("row[i]:" + row[i].text);
            return Math.max(max, row[i].minWidth());
        }, 0);
    });
}

console.log(drawTable(dataTable(MOUNTAINS)));

function logFive(seq) {
    if (seq.length > 5) {
        for (var i = 0 ; i < 5; i++)
            console.log(seq.current());
    } else {
        for (var i = 0; i < seq.length; i++)
            console.log(seq.current());
    }
}

