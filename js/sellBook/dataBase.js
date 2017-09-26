//dataSheet:course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor

function CreatingNewInfo(){
    if(INDEX_EDIT_BOOKINFO<0){
        return true;
    }else{return false;}
}

function Book(course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor){
    this.course=course;
    this.courseType=courseType;
    this.college=college;
    this.department=department;
    this.grade=grade;
    this.bookTitle=bookTitle;
    this.author=author;
    this.price=price;
    this.bookState=bookState;
    this.sellerName=sellerName;
    this.contact=contact;
    this.dealType=dealType;
    this.password=password;
    this.selfByVendor=selfByVendor;
    this.createDate=new Date();
}


var bookSellRef= new Firebase('https://ntu2ndbookplatform.firebaseio.com/');
    //targetDataRef.setPriority(10);
    //var titleListRef = bookSellRef.child('titleList');
    var booksDataRef=bookSellRef.child('bookData');

    var course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor;

    function submitBookInfoForm(){
        console.log("out");
        course=document.getElementById('courseInput').value;
        courseType=document.getElementById('courseTypeInput').value;
        college=document.getElementById('collegeInput').value;
        department=document.getElementById('departmentInput').value;
        grade=document.getElementById('gradeInput').value;
        bookTitle=document.getElementById('bookTitleInput').value;
        author=document.getElementById('authorInput').value;
        price=document.getElementById('priceInput').value;
        bookState=document.getElementById('bookStateInput').value;
        sellerName=document.getElementById('sellerNameInput').value;
        contact=document.getElementById('contactInput').value;
        dealType=document.getElementById('dealTypeInput').value;
        password=document.getElementById('passwordInput').value;
        selfByVendor=document.getElementById('selfByVendorInput').checked;

        var submitSuccess=submitValid();

        //valid
        if(submitSuccess){
            var bookInfoPush= new Book(course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor);
            
            // create or edit
            console.log('create? :'+CreatingNewInfo())
            if(CreatingNewInfo()){
                booksDataRef.push(bookInfoPush);
            }else{
                var bookTobeModify= bookInfoArray[INDEX_EDIT_BOOKINFO];
                console.log('mod course '+bookTobeModify.child('course').val());
                console.log('ref :'+bookTobeModify.ref());
                bookTobeModify.ref().set(bookInfoPush);
                bookPasswordInput.value=password;
                bookSearch();
                //ModifyBookInfo(bookInfoPush);
                //bookPasswordInput.innerHTML=password;
                
                //remove old data
                //bookInfoArray[INDEX_EDIT_BOOKINFO].remove();
                //reset state to create new 
                
                INDEX_EDIT_BOOKINFO=-1;
                changeEditPageName();

            }

            document.getElementById('courseInput').value ="";
            //document.getElementById('departmentInput').value = null;
            //document.getElementById('gradeInput').value=null;
            document.getElementById('bookTitleInput').value=null;
            document.getElementById('authorInput').value = null;
            document.getElementById('priceInput').value = null;
            document.getElementById('bookStateInput').value = null;
            //document.getElementById('sellerNameInput').value = null;
            //document.getElementById('contactInput').value = null;
            //document.getElementById('dealTypeInput').value = null;
            document.getElementById('passwordInput').value = null;
            //document.getElementById('selfByVendorInput').value = null;
            //console.log('enter');






        }else{
            //console.log("price<0:"+price);
            //console.log('null out');
            //console.log("valid error");

        }

        //console.log(course + "<br>" +courseType + "<br>" + college + "<br>" + department + "<br>" + grade + "<br>" + bookTitle + "<br>" + author + "<br>" + price + "<br>" + bookState + "<br>" + sellerName + "<br>" + contact + "<br>" + dealType + "<br>" + password + "<br>" + selfByVendor);


    }


    var testBookInfo="";

    function dataOn(){
        booksDataRef.on('child_added', function (snapshot) {
            var courseAdd = snapshot.child('course').val();
            var departmentAdd = snapshot.child('department').val();
            var gradeAdd = snapshot.child('grade').val();
            var bookTitleAdd = snapshot.child('bookTitle').val();
            var priceAdd = snapshot.child('price').val();
            var bookStateAdd = snapshot.child('bookState').val();
            var sellerNameAdd = snapshot.child('sellerName').val();
            var contactAdd = snapshot.child('contact').val();
            var dealTypeAdd = snapshot.child('dealType').val();
            var passwordAdd = snapshot.child('password').val();
            var selfByVendorAdd = snapshot.child('selfByVendor').val();


            var thisBookInfo1 = courseAdd + " " + departmentAdd + " " + gradeAdd + " " + bookTitleAdd + " " + priceAdd + " " + bookStateAdd + " " + sellerNameAdd + " " + contactAdd + " " + dealTypeAdd + " " + passwordAdd + " " + selfByVendorAdd;

            if (testBookInfo == null) {
                testBookInfo = thisBookInfo1;
            }
            else {
                testBookInfo = testBookInfo + '<br>' + thisBookInfo1;

            }
            
        });
}

var submitBookDataBtn = document.getElementById('submitBookData');
submitBookDataBtn.addEventListener('click', submitBookInfoForm, false);

dataOn();

function departmentToggle(value){
    if(value=='1'){
        $(departmentForm).fadeIn(500);
    }else if(value=='2'||value=='3'||value=='0'){
        $(departmentForm).fadeOut(500);
    }else{}
}

$(departmentForm).hide();