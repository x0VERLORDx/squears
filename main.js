(function (){
    let cols = 4;
    let rows = 4;
    let colIndex = 0;
    let rowIndex = 0;
    const tbl = document.getElementsByClassName('table')[0];
    const vZone = document.getElementById('visionZone');
    const addRowBtn = document.getElementsByClassName('addRowButton')[0];
    const addColBtn = document.getElementsByClassName('addColButton')[0];
    const delRowBtn = document.getElementsByClassName('delRowButton')[0];
    const delColBtn = document.getElementsByClassName('delColButton')[0];

// функции для видимости кнопок

vZone.addEventListener ("mouseover", function (){
    if(rows > 1){
        delRowBtn.style.visibility = "visible";
    }
    if(cols > 1){
        delColBtn.style.visibility = "visible"; 
    }
});
vZone.addEventListener ("mouseout", function(){
    delColBtn.style.visibility = "hidden";
    delRowBtn.style.visibility = "hidden";
}); 

// функция для определения индекса 

tbl.addEventListener ("mouseover", indexSet);

function indexSet(event) {

    let cell = event.target;
    if (cell.tagName.toLowerCase() != 'td')
        return;
    rowIndex = cell.parentNode.rowIndex;
    colIndex = cell.cellIndex;
};

 //функция для передвижения кнопки удаления колонки


 tbl.addEventListener ("mouseover", moveTop);
 function moveTop () {
    const delay = 2;
    let i = 0;
    startTimer = function () {
        let left = delColBtn.offsetLeft;
        i = left + 1;

        if (i < colIndex * 54 + 64) {
            setTimeout(startTimer,delay);
            delColBtn.style.left = left + 1 + 'px';
            //console.log(left);
        }
        
        
        else if (i > 64 && i > colIndex * 54 + 64){
            delColBtn.style.left = left - 1 + 'px';
            setTimeout(startTimer,delay);
        }

        if (i == colIndex * 54 + 64) {
            return
        }
    }
    const timer = setTimeout(startTimer,delay);

};

tbl.addEventListener ("mouseover", moveLeft);
function moveLeft () {
    const delay = 2;
    let j = 0;
    startTimer1 = function () {
        bottom = delRowBtn.offsetTop;
        j = bottom + 1;
        if (j < rowIndex * 54 + 64) {
            setTimeout(startTimer1,delay);
            delRowBtn.style.top = bottom + 1 + 'px';
        }

        else if ( j > 64 && j > rowIndex * 54 + 64){
            setTimeout(startTimer1,delay);
            delRowBtn.style.top = bottom - 1 + 'px'; 
        }
    }
    const timer = setTimeout(startTimer1,delay);
}


// удаления при клике на кнопку
delRowBtn.addEventListener ("click", function(){
	delRow();
    addRowBtn.style.top = rows * 54 + 60 + 'px';
    delRowBtn.style.visibility = "hidden";   // при нажатии делает кнопку невидимой
});
delColBtn.addEventListener ("click", function(){
    delCol();
    addColBtn.style.left = cols * 54 + 60 + 'px';
    delColBtn.style.visibility = "hidden";
});

//добавления при клике
addRowBtn.addEventListener ("click", function(){
    rowIndex = rows;
    delRowBtn.style.top = rows *54 + 64 + 'px';
    addRow();
    addRowBtn.style.top = rows * 54 + 60 + 'px';
    
});

addColBtn.addEventListener ("click", function(){
    colIndex = cols;
    delColBtn.style.left = cols * 54 +64 + 'px';
    addCol();
    addColBtn.style.left = cols * 54 + 60 + 'px';
    
});

//функция добавления колонки
function addCol() {
    for (let i = 0; i < rows; i++) {
        let currentRow = document.getElementsByTagName('tr')[i];
        let currentCell = document.getElementsByTagName('td')[i]
        let newCell = currentCell.cloneNode(true);
        currentRow.appendChild(newCell);
    }
    cols++;	
}

//функция добавления ряда
function addRow() {
	const currentRow = document.getElementsByTagName('tr')[0];
	let newRow = currentRow.cloneNode(true);
	tbl.appendChild(newRow); 
	rows++;   
}

//функция удаления рада с выбраным индексом 
function delRow() {
	if (rows > 1) {
        document.getElementsByTagName('table')[0].deleteRow(rowIndex);
        rows--;
    }
}

//функция удаления колонки с выбраным индексом
function delCol() {
	let currentRow = document.getElementsByTagName('tr');
    let currentCell = document.getElementsByTagName('td');
    if (cols > 1){
    	for (let i = 0; i < currentRow.length; i++) {
            let rowD = currentRow[i];
            let currentCol = rowD.childNodes[colIndex];
            currentCol.parentNode.removeChild(currentCol); 
        }
        cols--;
    }
}
})();

