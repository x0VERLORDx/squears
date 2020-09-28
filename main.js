class TableInitialize extends HTMLElement {
	constructor() {
		super();
		body.insertAdjacentHTML(
			"afterbegin",
			'<div id="wraper"><button class="delColButton"></button><button class="delRowButton"></button><table class="table"><tr><td class="square"></td></tr></table><button class="addColButton"></button><button class="addRowButton"></button></div>'
		);
	}

	get count() {
		return this.getAttribute("count");
	}
	set count(val) {
		this.setAttribute("count", val);
	}
	static get observedAttributes() {
		return ["count"];
	}
	attributeChangedCallback(prop, oldVal, newVal) {
		if (prop === "count") this.render();
	}
	//console.log('hi')
	render() {
		let cols = count;
		console.log(cols);
	}

	connectedCallback() {
		(function () {
			// initialysing variables
			let cols = 1;
			let rows = 1;
			let colIndex = 0;
			let rowIndex = 0;
			const boxSize = 54;
			const wraperPadding = 60;
			// initialysing elements

			const tbl = document.getElementsByClassName("table")[0];
			const addRowBtn = document.getElementsByClassName(
				"addRowButton"
			)[0];
			const addColBtn = document.getElementsByClassName(
				"addColButton"
			)[0];
			const delRowBtn = document.getElementsByClassName(
				"delRowButton"
			)[0];
			const delColBtn = document.getElementsByClassName(
				"delColButton"
			)[0];

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
					// console.log(rowIndex,colIndex); //index check
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
			}

			function addColBtnOnclick() {
				colIndex = cols;
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
				delColBtn.style.left =
					colIndex * boxSize + wraperPadding + "px";
			}

			// function for moveing delRowBtn

			function moveDelRowBtn() {
				delRowBtn.style.top = rowIndex * boxSize + wraperPadding + "px";
			}

			//adding functions

			//adding colon function

			function addCol() {
				for (let i = 0; i < rows; i++) {
					let currentRow = document.getElementsByTagName("tr")[i];
					let currentCell = document.getElementsByTagName("td")[i];
					let newCell = currentCell.cloneNode(true);
					currentRow.appendChild(newCell);
				}
				cols++;
			}

			//adding row function
			function addRow() {
				const currentRow = document.getElementsByTagName("tr")[0];
				let newRow = currentRow.cloneNode(true);
				tbl.appendChild(newRow);
				rows++;
			}

			//del functions
			//function for deleteing row with certain index
			function delRow() {
				if (rows > 1) {
					document
						.getElementsByTagName("table")[0]
						.deleteRow(rowIndex);
					rows--;
				}
			}

			//function for deleteing colon with certain index
			function delCol() {
				let currentRow = document.getElementsByTagName("tr");
				let currentCell = document.getElementsByTagName("td");
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
			tbl.onmousedown = function (event) {
				let shiftX =
					event.clientX - wraper.getBoundingClientRect().left;
				let shiftY = event.clientY - wraper.getBoundingClientRect().top;

				moveAt(event.pageX, event.pageY);

				function moveAt(pageX, pageY) {
					wraper.style.left = pageX - shiftX + "px";
					wraper.style.top = pageY - shiftY + "px";
				}

				function onMouseMove(event) {
					moveAt(event.pageX, event.pageY);
				}

				document.addEventListener("mousemove", onMouseMove);

				tbl.onmouseup = function () {
					document.removeEventListener("mousemove", onMouseMove);
					wraper.onmouseup = null;
				};
			};
		})();
	}
}

customElements.define("table-initialize", TableInitialize);
