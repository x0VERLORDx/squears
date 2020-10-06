class TableSquares extends HTMLElement {
	constructor() {
		super();
		this.shadow = this.attachShadow({ mode: "open" });

		this.shadow.innerHTML = `
		<link rel="stylesheet" href="style.css" />
		<div id="wraper">
			<button class="delColButton"></button>
			<button class="delRowButton"></button>
			<table class="table">
				<tr><td class="square"></td></tr>
			</table>
			<button class="addColButton"></button>
			<button class="addRowButton"></button>
		</div>`;
	}

	connectedCallback() {
		// initialysing variables
		const squares = this;
		let cols = this.getAttribute("cols");
		let rows = this.getAttribute("rows");
		let colIndex = 0;
		let rowIndex = 0;
		const boxSize = 54;
		const wraperPadding = 60;
		// initialysing elements

		const tbl = this.shadow.querySelector(".table");
		const addRowBtn = this.shadow.querySelector(".addRowButton");
		const addColBtn = this.shadow.querySelector(".addColButton");
		const delRowBtn = this.shadow.querySelector(".delRowButton");
		const delColBtn = this.shadow.querySelector(".delColButton");
		let wraper = this.shadow.querySelector("#wraper");

		//initialysing table

		for (let j = 1; j != rows; j++) {
			addRow();
		}
		for (let i = 1; i != cols; i++) {
			addCol();
		}
		function wraperCorSet() {
			let startTop = wraper.getBoundingClientRect().top;
			let startLeft = wraper.getBoundingClientRect().left;
			wraper.style.top = startTop + "px";
			wraper.style.left = startLeft + "px";
			console.log(wraper.style.top, wraper.style.left);
		}
		// event list

		tbl.addEventListener("mouseover", tblOnmouseover);
		tbl.addEventListener("mouseout", delBtnStyleHide);
		delRowBtn.addEventListener("mouseover", show);
		delRowBtn.addEventListener("mouseout", delBtnStyleHide);
		delColBtn.addEventListener("mouseover", show);
		delColBtn.addEventListener("mouseout", delBtnStyleHide);
		delRowBtn.addEventListener("click", delRowBtnOnclick);
		delColBtn.addEventListener("click", delColBtnOnclick);
		addRowBtn.addEventListener("click", addRowBtnOnclick);
		addColBtn.addEventListener("click", addColBtnOnclick);

		// table functions

		function tblOnmouseover(event) {
			// index seting function
			let cell = event.target;
			if (cell.tagName.toLowerCase() == "td") {
				rowIndex = cell.parentNode.rowIndex;
				colIndex = cell.cellIndex;
			}
			moveDelColBtn();
			moveDelRowBtn();
			show();
		}

		// onclick functions (buttons)

		function delRowBtnOnclick() {
			delRow();
			delBtnStyleHide();
		}

		function delColBtnOnclick() {
			delCol();
			delBtnStyleHide();
		}

		function addRowBtnOnclick() {
			rowIndex = rows;
			addRow();
			rows++;
		}

		function addColBtnOnclick() {
			colIndex = cols;
			cols++;
			addCol();
		}

		// visibility changeing functions for del buttons

		function show() {
			if (rows > 1) {
				delRowBtn.style.opacity = 1;
				delRowBtn.style.visibility = "visible";
			}
			if (cols > 1) {
				delColBtn.style.opacity = 1;
				delColBtn.style.visibility = "visible";
			}
		}

		function delBtnStyleHide() {
			delRowBtn.style.opacity = 0;
			delRowBtn.style.visibility = "hidden";
			delColBtn.style.opacity = 0;
			delColBtn.style.visibility = "hidden";
		}
		//function for moveing delColBtn

		function moveDelColBtn() {
			delColBtn.style.left = colIndex * boxSize + wraperPadding + "px";
		}

		// function for moveing delRowBtn

		function moveDelRowBtn() {
			delRowBtn.style.top = rowIndex * boxSize + wraperPadding + "px";
		}

		//adding functions

		//adding colon function

		function addCol() {
			for (let i = 0; i < rows; i++) {
				let currentRow = squares.shadow.querySelectorAll("tr")[i];
				let currentCell = squares.shadow.querySelectorAll("td")[i];
				let newCell = currentCell.cloneNode(true);
				currentRow.appendChild(newCell);
			}
		}

		//adding row function
		function addRow() {
			const currentRow = squares.shadow.querySelector("tr");
			let newRow = currentRow.cloneNode(true);
			tbl.appendChild(newRow);
		}

		//del functions
		//function for deleteing row with certain index
		function delRow() {
			if (rows > 1) {
				squares.shadow.querySelector("table").deleteRow(rowIndex);
				rows--;
			}
		}

		//function for deleteing colon with certain index
		function delCol() {
			let currentRow = squares.shadow.querySelectorAll("tr");
			let currentCell = squares.shadow.querySelector("td");
			if (cols > 1) {
				for (let i = 0; i < currentRow.length; i++) {
					let rowD = currentRow[i];
					let currentCol = rowD.childNodes[colIndex];
					currentCol.parentNode.removeChild(currentCol);
				}
				cols--;
			}
		}
		//adding drag n drop

		function wraperPos() {
			wraper.style.position = "absolute";
		}
		setTimeout(wraperCorSet, 0);
		setTimeout(wraperPos, 10);

		tbl.onmousedown = function (event) {
			let shiftX = event.clientX - wraper.getBoundingClientRect().left;
			let shiftY = event.clientY - wraper.getBoundingClientRect().top;

			moveAt(event.pageX, event.pageY);

			function moveAt(pageX, pageY) {
				wraper.style.left = pageX - shiftX + "px";
				wraper.style.top = pageY - shiftY + "px";
				console.log(wraper.style.left, wraper.style.top);
			}
			wraper.style.zIndex = 100;
			function onMouseMove(event) {
				moveAt(event.pageX, event.pageY);
			}

			document.addEventListener("mousemove", onMouseMove);

			tbl.onmouseup = function () {
				document.removeEventListener("mousemove", onMouseMove);
				wraper.onmouseup = null;
			};
		};
	}
}

customElements.define("table-squares", TableSquares);
