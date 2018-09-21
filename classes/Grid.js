class Grid {
    constructor (options) {
        this.numberOfRows = options.numberOfRows;
        this.numberOfColumns = options.numberOfColumns;
        this.targetElement = options.targetElement || document.body;
        this.cellClasses = options.cellClasses || [];
        this.gridElement = this.createGridElement();
        this.rows = [];
        this.createRows();
        this.gridElement.addEventListener("click", this.clickEvent.bind(this));
        console.log(this);
    }

    clickEvent(event) {
        if (!event.target.classList.contains("cell")) return;
        const cellElement = event.target;
        console.log(cellElement);
        console.log("Row Index: ", cellElement.dataset.rowIndex, " | Column Index: ", cellElement.dataset.colIndex);
        const rowIndex = Number(cellElement.dataset.rowIndex);
        const colIndex = Number(cellElement.dataset.colIndex);
        const clickedCell = this.findCell(rowIndex, colIndex);
        
        const above = this.findCell(rowIndex - 1, colIndex);
        const aboveRight = this.findCell(rowIndex - 1, colIndex + 1);
        const right = this.findCell(rowIndex, colIndex + 1);
        const belowRight = this.findCell(rowIndex + 1, colIndex + 1);
        const below = this.findCell(rowIndex + 1, colIndex);
        const belowLeft = this.findCell(rowIndex + 1, colIndex -1);
        const left = this.findCell(rowIndex, colIndex - 1);
        const aboveLeft = this.findCell(rowIndex - 1, colIndex - 1);
        
        const clickedCellNeighbors = [above, aboveRight, right, belowRight, below, belowLeft, left, aboveLeft];

        console.log("index", clickedCell);
        console.log("Neighbor Indexes (clockwise from top): ", clickedCellNeighbors);
    }

    createGridElement() {
        const element = document.createElement("div");
        element.classList.add("grid");
        this.targetElement.appendChild(element);
        document.addEventListener("click", (event) => {
            if (!event.target.classList.contains("cell")) return;
            const clicked = event.target;
            clicked.classList.add("clicked");
        });
        return element;
    }

    createRowElement(rowIndex) {
        const element = document.createElement("div");
        element.classList.add("row");
        element.dataset.rowIndex = rowIndex;
        this.gridElement.appendChild(element);
        return element;
    }

    createRows() {
        for (let rowIndex = 0; rowIndex < this.numberOfRows; rowIndex++) {
            this.rows[rowIndex] = [];
            const rowElement = this.createRowElement(rowIndex);
            this.createCells(rowIndex, rowElement);
        }
    }

    createCells(rowIndex, rowElement) {
        for (let colIndex = 0; colIndex < this.numberOfColumns; colIndex++) {
            const cell = new Cell (rowIndex, colIndex, this.cellClasses);
            this.rows[rowIndex][colIndex] = cell;
            rowElement.appendChild(cell.element);
        }
    }

    findCell(rowIndex, colIndex) {
        rowIndex = Number(rowIndex);
        colIndex = Number(colIndex);
        const row = this.rows[rowIndex];
        const cell = row ? row[colIndex] : null;
        return cell || null
    }
}