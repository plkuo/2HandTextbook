//valid by each and button
//valid by each
var courseInput=document.getElementById('courseInput');
var courseTypeInput=document.getElementById('courseTypeInput');
var collegeInput=document.getElementById('collegeInput');
var departmentInput=document.getElementById('departmentInput');
var gradeInput=document.getElementById('gradeInput');
var bookTitleInput=document.getElementById('bookTitleInput');
var authorInput=document.getElementById('authorInput');
var priceInput=document.getElementById('priceInput');
var bookStateInput=document.getElementById('bookStateInput');
var sellerNameInput=document.getElementById('sellerNameInput');
var contactInput=document.getElementById('contactInput');
var dealTypeInput=document.getElementById('dealTypeInput');
var passwordInput=document.getElementById('passwordInput');
var selfByVendorInput=document.getElementById('selfByVendorInput');

var courseValidation=false, courseTypeValidation=-1, collegeValidation=false,departmentValidation=false, gradeValidation=false, bookTitleValidation=false, priceValidation=false, bookStateValidation=false, sellerNameValidation=false, contactValidation=false, dealTypeValidation=false, passwordValidation=false;

//  authorValidation=false,
courseInput.addEventListener("input",courseValid,false);
courseTypeInput.addEventListener("change",courseTypeValid,false);
collegeInput.addEventListener("change",collegeValid,false);
departmentInput.addEventListener("change",departmentValid,false);
gradeInput.addEventListener("change",gradeValid,false);
bookTitleInput.addEventListener("input",bookTitleValid,false);
//authorInput.addEventListener("input",authorValid,false);
priceInput.addEventListener("input",priceValid,false);
bookStateInput.addEventListener("input",bookStateValid,false);
sellerNameInput.addEventListener("input",sellerNameValid,false);
contactInput.addEventListener("input",contactValid,false);
dealTypeInput.addEventListener("input",dealTypeValid,false);
passwordInput.addEventListener("input",passwordValid,false);

function courseValid(){
	courseValidation=courseInput.value!='';
	changeClass(courseValidation,$('#courseInputValidation'));
}
function courseTypeValid(){	
	courseType=courseTypeInput.value;
	if(courseType=='0'){		
		courseTypeValidation=0;		
	}else if(courseType=='1'){
		courseTypeValidation=1;
	}else{
		courseTypeValidation=2;
	}
	changeClass(courseTypeValidation,$('#courseTypeInputValidation'));
	console.log(courseTypeValidation);
}
function collegeValid(){
	collegeValidation=collegeInput.value!='';
	changeClass(collegeValidation,$('#collegeInputValidation'));
	if(collegeInput.value==''){
		$('#departmentInputValidation').removeClass('has-error has-success');
	}
}
function departmentValid(){
	departmentValidation=departmentInput.value!='';
	changeClass(departmentValidation,$('#departmentInputValidation'));
}
function gradeValid(){
	gradeValidation=gradeInput.value!='';
	changeClass(gradeValidation,$('#gradeInputValidation'));
}
function bookTitleValid(){
	bookTitleValidation=bookTitleInput.value!='';
	changeClass(bookTitleValidation,$('#bookTitleInputValidation'));
}
function authorValid(){
	authorValidation= authorInput.value!='';
	changeClass(authorValidation,$('#authorInputValidation'));
}
function priceValid(){
	var priceIn=parseInt(priceInput.value,10);
	priceInput.value=priceIn;
	priceValidation=(priceIn>=0)&&(priceIn<=5000);
	changeClass(priceValidation,$('#priceInputValidation'));
}
function bookStateValid(){
	bookStateValidation=bookStateInput.value!='';
	changeClass(bookStateValidation,$('#bookStateInputValidation'));
}
function sellerNameValid(){
	sellerNameValidation=sellerNameInput.value!='';
	changeClass(sellerNameValidation,$('#sellerNameInputValidation'));
}
function contactValid(){
	contactValidation=contactInput.value!='';
	changeClass(contactValidation,$('#contactInputValidation'));
}
function dealTypeValid(){
	dealTypeValidation=dealTypeInput.value!='';
	changeClass(dealTypeValidation,$('#dealTypeInputValidation'));
}
function passwordValid(){
	passwordValidation=passwordInput.value!='';
	changeClass(passwordValidation,$('#passwordInputValidation'));
}

function changeClass(validSuccess,DivForValid){
	DivForValid.removeClass("has-success");
	if(validSuccess){		
		DivForValid.addClass("has-success");
	}else{
		DivForValid.addClass("has-error");
	}
}

//valid by button
function submitValid(){
	validAllInput();
	var courseTypeAllValidation=false;
	if(courseTypeValidation==1){
		if(collegeValidation&&departmentValidation&&gradeValidation){
			courseTypeAllValidation=true;
		}
	}else if(courseTypeValidation==0){
	}else{
		courseTypeAllValidation=true;
	}

	var validResult=(courseValidation&&courseTypeAllValidation&&bookTitleValidation&&priceValidation&&bookStateValidation&&sellerNameValidation&&contactValidation&&dealTypeValidation&&passwordValidation)
	console.log("valid : "+(validResult));
	console.log(courseValidation+" : "+courseTypeAllValidation+" : "+bookTitleValidation+" : "+priceValidation+" : "+bookStateValidation)
	console.log(sellerNameValidation+" : "+contactValidation+" : "+dealTypeValidation+" : "+passwordValidation)
	console.log(collegeValidation+" : "+departmentValidation+" : "+gradeValidation);
	if(validResult){
		removeClassAfterSuccess();
		courseValidation=false,  bookTitleValidation=false, priceValidation=false, bookStateValidation=false,  passwordValidation=false, selfByVendorValidation=false, createDateValidation=false;
	}else{
		validAllInput();
	}	
		//courseTypeValidation=false, collegeValidation=false,sellerNameValidation=false, contactValidation=false, dealTypeValidation=false,
		return validResult;
	}	

	function removeClassAfterSuccess(){
		$('#courseInputValidation').removeClass('has-error has-success');
	//$('#courseTypeInputValidation').removeClass('has-error has-success');
	//$('#collegeInputValidation').removeClass('has-error has-success');
	//$('#departmentInputValidation').removeClass('has-error has-success');
	//$('#gradeInputValidation').removeClass('has-error has-success');
	$('#bookTitleInputValidation').removeClass('has-error has-success');
	//$('#authorInputValidation').removeClass('has-error has-success');
	$('#priceInputValidation').removeClass('has-error has-success');
	$('#bookStateInputValidation').removeClass('has-error has-success');
	//$('#sellerNameInputValidation').removeClass('has-error has-success');
	//$('#contactInputValidation').removeClass('has-error has-success');
	//$('#dealTypeInputValidation').removeClass('has-error has-success');
	$('#passwordInputValidation').removeClass('has-error has-success');
	//$('#selfByVendorInputValidation').removeClass('has-error has-success');
}

function validAllInput(){
	courseValid();
	courseTypeValid();
	collegeValid();
	departmentValid();
	gradeValid();
	bookTitleValid();
	priceValid();
	bookStateValid();
	sellerNameValid();
	contactValid();
	dealTypeValid();
	passwordValid();
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