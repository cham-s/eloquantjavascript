function rowHeights(rows) {
    return rows.map(function(row) {
        return row.reduce(function(max, cell) {
            return Math.max(max, cell.minHeight());
        }, 0);
    });
}

function colWidths(rows) {
    return rows[0].map(function(_, index) {
        return rows.reduce(function(max, row) {
            return Math.max(max, row[index].minWidth());
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
}