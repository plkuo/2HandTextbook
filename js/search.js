var bookSellRef= new Firebase("https://ntu2ndbookplatform.firebaseio.com/bookData");
var departments = document.getElementsByClassName("department");
var commons = document.getElementsByClassName("common");
var generals = document.getElementsByClassName("general");
var NUM_BOOK_PER_PAGE = 15;
var searchList = [];
var page = 1;
var rowDetail = 0;
var searchFlag = 0;

for(var i = 0; i < departments.length; i++) {
	departments[i].addEventListener("click", departmentSearchBook, false);
}

for(var i = 0; i < commons.length; i++) {
	commons[i].addEventListener("click", commonSearchBook, false);
}

for(var i = 0; i < generals.length; i++) {
	generals[i].addEventListener("click", generalSearchBook, false);
}

function departmentSearchBook() {
	var searchCollege = this.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML;
	var searchDepartment = this.firstChild.innerHTML;
	searchFlag = 1;

	bookSellRef.on("value", function(root) {
		searchList = [];

		root.forEach(function(rec) {
			var courseType = rec.child("courseType").val();
			var college = rec.child("college").val();
			var department = rec.child("department").val();

			if(	("1" === courseType) &&
				(searchCollege === college) &&
				(searchDepartment === department)) {
					searchList.unshift(rec);
			}
		})

		if(1 === searchFlag) {
			page = 1;
			rowDetail = 0;
			loadList();
		}

		searchFlag = 0;
	});
}

function commonSearchBook() {
	var searchCourse = this.firstChild.innerHTML;
	searchFlag = 1;

	bookSellRef.on("value", function(root) {
		searchList = [];

		root.forEach(function(rec) {
			var courseType = rec.child("courseType").val();
			var course = rec.child("course").val();

			if("2" === courseType) {
				if("其他" === searchCourse) {
					if(	(course.indexOf("國文") < 0) &&
						(course.indexOf("英文") < 0) &&
						(course.indexOf("微積分") < 0)) {
							searchList.unshift(rec);
					}
				}
				else {
					if(course.indexOf(searchCourse) >= 0) {
						searchList.unshift(rec);
					}
				}
			}
		})

		if(1 === searchFlag) {
			page = 1;
			rowDetail = 0;
			loadList();
		}

		searchFlag = 0;
	});
}

function generalSearchBook() {
	searchFlag = 1;

	bookSellRef.on("value", function(root) {
		searchList = [];

		root.forEach(function(rec) {
			var courseType = rec.child("courseType").val();

			if("3" === courseType) {
				searchList.unshift(rec);
			}
		})

		if(1 === searchFlag) {
			page = 1;
			rowDetail = 0;
			loadList();
		}

		searchFlag = 0;
	});
}

function searchBook() {
	var keyWord = document.getElementById("form-control").value;
	searchFlag = 1;

	bookSellRef.on("value", function(root) {
		searchList = [];

		root.forEach(function(rec) {
			var department = rec.child("department").val();
			var course = rec.child("course").val();
			var bookTitle = rec.child("bookTitle").val();
			var author = rec.child("author").val();
			var sellerName = rec.child("sellerName").val();

			if(	(department.indexOf(keyWord) >= 0) ||
				(course.indexOf(keyWord) >= 0) ||
				(bookTitle.indexOf(keyWord) >= 0) ||
				((null != author) && (author.indexOf(keyWord) >= 0)) ||
				(sellerName.indexOf(keyWord) >= 0)) {
					searchList.unshift(rec);
			}
		})

		if(1 === searchFlag) {
			page = 1;
			rowDetail = 0;
			loadList();
		}

		searchFlag = 0;
	});
}

function loadList() {
	var table = document.getElementById("search");
	var num = table.rows.length;
	for(var i = num - 1; i > 0; i--) {
		table.deleteRow(i);
	}

	for(var num = 1; num <= Math.min(searchList.length - NUM_BOOK_PER_PAGE * (page - 1), NUM_BOOK_PER_PAGE); num++) {
		var book = searchList[NUM_BOOK_PER_PAGE * (page - 1) + num - 1];
		var tableRow = table.insertRow(num);
		var tableData;
		var button;

		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("department").val() + "/" + book.child("grade").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("course").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("bookTitle").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("author").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("price").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("sellerName").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML = book.child("dealType").val();
 		tableData.align = "center";

 		tableData = tableRow.insertCell(-1);
 		tableData.innerHTML="<button class=\"btn btn-info\">詳細資料</button>";
 		tableData.align = "center";
 		button = tableData.firstChild;
 		button.value = num - 1;
 		button.addEventListener("click", showDetail, false);

	}

	document.getElementById("page").innerHTML = page;
	if(page === 1) {
		document.getElementById("prePage").disabled = true;
	}
	else {
		document.getElementById("prePage").disabled = false;
	}
	if(searchList.length <= NUM_BOOK_PER_PAGE * page) {
		document.getElementById("nextPage").disabled = true;
	}
	else {
		document.getElementById("nextPage").disabled = false;
	}
}

function showDetail() {
	var row = parseInt(this.value);
	var table = document.getElementById("search");
	var bookData;
	var book = searchList[NUM_BOOK_PER_PAGE * (page - 1) + row];

	if(rowDetail > 0) {
		table.deleteRow(rowDetail);
	}

	if((row + 2) === rowDetail) {
		rowDetail = 0;
	}
	else {
		bookData = table.insertRow(row + 2).insertCell(-1);
		bookData.colSpan = 8;

		bookData.innerHTML =
		"<table class=\"table table-bordered\" align=center style='background:lightblue'>" +
			"<tr>" +
				"<td align=right width=100px>書況說明</td>" +
				"<td width=500px>" + book.child("bookState").val() + "</td>" +
			"</tr>" +
			"<tr>" +
				"<td align=right width=100px>賣家</td>" +
				"<td width=500px>" + book.child("sellerName").val() + "</td>" +
			"</tr>" +
			"<tr>" +
				"<td align=right width=100px>聯絡方式</td>" +
				"<td width=500px>" + book.child("contact").val() + "</td>" +
			"</tr>" +
		"</table>";

		rowDetail = row + 2;
	}
}

function onPrePage() {
	page--;
	rowDetail = 0;
	loadList();
}

function onNextPage() {
	page++;
	rowDetail = 0;
	loadList();
}