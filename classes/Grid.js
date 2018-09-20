class Grid {
    constructor (options) {
        this.numberOfRows = options.numberOfRows;
        this.numberOfColumns = options.numberOfColumns;
        this.targetElement = options.targetElement || document.body;
        this.cellClasses = options.cellClasses || [];
        this.gridElement = this.createGridElement();
        this.rows = [];
        this.createRows();
    }

    createGridElement() {
        const element = document.createElement("div");
        element.classList.add("grid");
        this.targetElement.appendChild(element);
        document.addEventListener("click", (event) => {
            const clicked = event.target;
            clicked.classList.add("clicked")
        })
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
}