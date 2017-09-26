//$('#bookTitleInputValidation').addClass("has-success");
var pricevalidation=document.getElementById('priceInput');


//pricevalidation.onchange=priceInputValid();
document.getElementById('priceInput').addEventListener('change',priceInputValid(), false);


function priceInputValid(){
	console.log("!!");
}

function submitValid(course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor){
	course==""
	//courseType==""
	//college==""
	//department==""
	//grade==""
	bookTitle==""
	author==""
	price==""
	bookState==""
	sellerName==""
	contact==""
	dealType==""
	password==""
	//selfByVendor
}
/*
courseInput
courseTypeInput
collegeInput
departmentInput
gradeInput
bookTitleInput
authorInput
priceInput
bookStateInput
sellerNameInput
contactInput
dealTypeInput
passwordInput
selfByVendorInput
createDateInput*/