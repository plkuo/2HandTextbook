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
    createDate=new Date();
}


var bookSellRef= new Firebase('https://ntu2ndbookplatform.firebaseio.com/');
    //targetDataRef.setPriority(10);
    //var titleListRef = bookSellRef.child('titleList');
    var booksDataRef=bookSellRef;//.child('targets');

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
    selfByVendor=document.getElementById('selfByVendorInput').value;

    var submitSuccess=submitValid(course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor) ;
    console.log(course);
    console.log(courseType);
    console.log(college);
    console.log(department);
        console.log(grade);
        console.log(bookTitle);
        console.log(author);
        console.log(price);
        console.log(bookState);
        console.log(sellerName);
        console.log(contact);
        console.log(dealType);
        console.log(password);
        console.log(selfByVendor);
    //valid
    if(submitSuccess){
        //console.log("price>0:"+document.getElementById('priceInput').value);
        var bookInfoPush= new Book(course,courseType,college,department,grade,bookTitle,author,price,bookState,sellerName,contact,dealType,password,selfByVendor);
        booksDataRef.push(bookInfoPush);

        document.getElementById('courseInput').value ="";
    document.getElementById('departmentInput').value = null;
    //document.getElementById('gradeInput').value=null;=null;
    //document.getElementById('bookTitleInput').value=null;
    document.getElementById('authorInput').value = null;
    document.getElementById('priceInput').value = null;
    document.getElementById('bookStateInput').value = null;
    document.getElementById('sellerNameInput').value = null;
    document.getElementById('contactInput').value = null;
    document.getElementById('dealTypeInput').value = null;
    document.getElementById('passwordInput').value = null;
    document.getElementById('selfByVendorInput').value = null;

        console.log('enter');
    
    }else{
        console.log("price<0:"+price);
        console.log('null out');
        alert
    }
    
    console.log(course + "<br>" +courseType + "<br>" + college + "<br>" + department + "<br>" + grade + "<br>" + bookTitle + "<br>" + author + "<br>" + price + "<br>" + bookState + "<br>" + sellerName + "<br>" + contact + "<br>" + dealType + "<br>" + password + "<br>" + selfByVendor);

    

    
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
        var infoForSell=document.getElementById("forSell");
        infoForSell.innerHTML = testBookInfo;
    });
}

var btn = document.getElementById('submitBookData');
btn.addEventListener('click', submitBookInfoForm, false);



    dataOn();
    


    
    function departmentToggle(value){
        if(value=='1'){
            $(departmentForm).fadeIn(500);
        }else if(value=='2'||value=='3'){
            $(departmentForm).fadeOut(500);
        }else{}
    }

