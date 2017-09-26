var sellerContactInput= document.getElementById('sellerContactInput');
var bookPasswordInput= document.getElementById('bookPasswordInput');
var sellerBookSearchButton= document.getElementById('sellerBookSearchButton');
var sellersBookInfo= document.getElementById('sellersBookInfo');
var INDEX_EDIT_BOOKINFO=-1;


sellerBookSearchButton.addEventListener('click',bookSearch,false);

var findBooks=0;
var bookInfoArray=[];

var infoTable=document.createElement("TABLE");
infoTable.className='table table-bordered table-striped table-condensed';
infoTable.style.color='blue';
infoTable.style.border='5px';
sellersBookInfo.appendChild(infoTable);


var header = infoTable.createTHead();
var row = header.insertRow(0);
var infoTbody=document.createElement("TBODY");
infoTable.appendChild(infoTbody);
function createNewTable(){
	row.innerHTML='';
	infoTbody.innerHTML='';
	row.insertCell(-1).innerHTML="課程名稱";
	row.insertCell(-1).innerHTML="課程";		
	row.insertCell(-1).innerHTML="書名";
	row.insertCell(-1).innerHTML="作者";
	row.insertCell(-1).innerHTML="價錢";
	var stateCell= row.insertCell(-1);
	stateCell.innerHTML="書況說明";
	//stateCell.style.width='100px;'
	row.insertCell(-1).innerHTML="交易方式";
	row.insertCell(-1).innerHTML="代客賣書";
	row.insertCell(-1).innerHTML="編輯";
	infoTbody.insertRow(0);
	var thisRow = infoTbody.insertRow(-1);

				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
				thisRow.insertCell(-1).innerHTML=""; 
}

var allInfoData=[];
booksDataRef.on('value', function (valueSnapshot) {
	allInfoData=[];

	console.log('null? :'+valueSnapshot!=null);
	console.log('hasChildren? :'+valueSnapshot.hasChildren());
	console.log('numChildren? :'+valueSnapshot.numChildren());
	if((valueSnapshot!=null)&&(valueSnapshot.hasChildren())){

		valueSnapshot.forEach(function(childSnapshot){
			allInfoData.push(childSnapshot);
		});


		
	}
	console.log('allinfoData length:'+allInfoData.length);
	
	
});

function bookSearch(){
	createNewTable();
	//reset state to create new 
	CreateNewInfo=true;
	INDEX_EDIT_BOOKINFO=-1;
	changeEditPageName();

	bookInfoArray=[];
	$('#sellersNotes').html('');
	if((''==sellerContactInput.value)||(''==bookPasswordInput.value)){
		$('#sellersNotes').html('資料格式有誤');
	}else{		
		findBooks=0;
		console.log('searching');
		console.log(allInfoData.length);
		for(var i=0;i<allInfoData.length;i++){

			var thisInfoSnapshot=allInfoData[i];

			var contactAdd = thisInfoSnapshot.child('contact').val();
			var passwordAdd = thisInfoSnapshot.child('password').val();
			console.log(contactAdd);
			if((contactAdd==sellerContactInput.value)&&(passwordAdd==bookPasswordInput.value)){
				console.log('thisInfoSnapshotTimes:'+bookInfoArray.length);
				findBooks++;
				bookInfoArray.push(thisInfoSnapshot);
				var courseAdd = thisInfoSnapshot.child('course').val();
				var courseTypeAdd = thisInfoSnapshot.child('courseType').val();
				var collegeAdd = thisInfoSnapshot.child('college').val();
				var departmentAdd = thisInfoSnapshot.child('department').val();
				var gradeAdd = thisInfoSnapshot.child('grade').val();
				var bookTitleAdd = thisInfoSnapshot.child('bookTitle').val();
				var authorAdd = thisInfoSnapshot.child('author').val();
				var priceAdd = thisInfoSnapshot.child('price').val();
				var bookStateAdd = thisInfoSnapshot.child('bookState').val();
				var sellerNameAdd = thisInfoSnapshot.child('sellerName').val();			
				var dealTypeAdd = thisInfoSnapshot.child('dealType').val();
				var selfByVendorAdd = thisInfoSnapshot.child('selfByVendor').val();

				var courseTypeAll;
				if(courseTypeAdd=="1"){
					courseTypeAll=collegeAdd+"<br>"+departmentAdd+"  "+gradeAdd;
				}else if(courseTypeAdd=="1"){
					courseTypeAll="共同科目";
				}else{
					courseTypeAll="通識";
				}


				var thisRow = infoTbody.insertRow(-1);

				thisRow.insertCell(-1).innerHTML=courseAdd; 
				thisRow.insertCell(-1).innerHTML=courseTypeAll; 
				thisRow.insertCell(-1).innerHTML=bookTitleAdd; 
				thisRow.insertCell(-1).innerHTML=authorAdd; 
				thisRow.insertCell(-1).innerHTML=priceAdd; 
				var bookStateCell= thisRow.insertCell(-1);
				bookStateCell.innerHTML=bookStateAdd; 
				bookStateCell.style.width=20;
				thisRow.insertCell(-1).innerHTML=dealTypeAdd; 
				thisRow.insertCell(-1).innerHTML=selfByVendorAdd; 
				//create edit button in cell
				var editCell=thisRow.insertCell(-1);
				editCell.innerHTML="<button>click</button>";
				var editButton= editCell.firstChild;
				editButton.value=bookInfoArray.length-1;
				editButton.innerHTML="修改";
				editButton.className+="btn btn-info btn-block";
				editButton.addEventListener('click',editBookInfobyButton,false);
				


			}
		}
		//if have any data, delete null row
		if(bookInfoArray.length>0){
			infoTbody.deleteRow(1);
			$('#sellersNotes').html('買家書籍資料');
		}
		$('#tableFoot').html('共 '+bookInfoArray.length+' 筆資料');
		bookPasswordInput.value='';
		var tds = document.getElementsByTagName('td');

for (var i = 0; i < tds.length; i++)
    tds[i].style.width = '80px';
	}

}

function ModifyBookInfo(bookInfoObj){
	var bookTobeModify=	bookInfoArray[INDEX_EDIT_BOOKINFO];
	bookTobeModify.set(bookInfoObj);
}

function editBookInfobyButton(){	
	var index=parseInt(this.value);
	INDEX_EDIT_BOOKINFO=index;
	var infoSnapshot= bookInfoArray[index];

	//course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor

	courseInput.value = infoSnapshot.child('course').val();
	courseTypeInput.value = infoSnapshot.child('courseType').val();
	collegeInput.value = infoSnapshot.child('college').val();
	ChangeDpartmentList();
	departmentInput.value = infoSnapshot.child('department').val();

	//console.log(infoSnapshot.child('department').val());
	gradeInput.value = infoSnapshot.child('grade').val();
	bookTitleInput.value = infoSnapshot.child('bookTitle').val();
	authorInput.value = infoSnapshot.child('author').val();
	priceInput.value = infoSnapshot.child('price').val();
	bookStateInput.value = infoSnapshot.child('bookState').val();

	sellerNameInput.value = infoSnapshot.child('sellerName').val();		
	contactInput.value = infoSnapshot.child('contact').val();	
	dealTypeInput.value = infoSnapshot.child('dealType').val();
	selfByVendorInput.checked = infoSnapshot.child('selfByVendor').val();
	
	departmentToggle(courseTypeInput.value);
	changeEditPageName();
}



function changeEditPageName(){
	if(INDEX_EDIT_BOOKINFO<0){
		$('#submitBookData').html('我要賣書');
	}else{
		$('#submitBookData').html('修改資料');
	}
}