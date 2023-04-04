
let form = document.querySelector('#form');
let inputName = document.querySelector('#inputName');
let inputEmail = document.querySelector('#inputEmail');
let inputGpa = document.querySelector('#inputGpa');
let inputAge = document.querySelector('#inputAge');
let inputDegree = document.querySelector('#inputDegree');
let errMsg = document.querySelectorAll(".errMsg");
let dataContainer = document.querySelector("#table-body");
let submitBtn = document.querySelector("#addBtn");
let inputSearch = document.querySelector("#inputSearch");
var tr = document.getElementsByTagName("tr");



let studentArr = [];
var selectedStudent = null;

form.addEventListener('submit',function(e){
    e.preventDefault();

    if(formValidation()){
        //Saving all the data in an array
        if(selectedStudent === null){
            saveData();

        }else{
            //Updating the data
            updateData();
        }
        
        //Reseting the form value blank
        resetForm();
    }
})


let formValidation = ()=>{
    isValid = true;

     // Name Validation
    if(inputName.value===""){
        errMsg[0].innerHTML = "Please fill the field first";
        isValid = false;
    }else{
        errMsg[0].innerHTML = "";
        isValid = true;
    }

     // Email Validation
    if(inputEmail.value===""){
        errMsg[1].innerHTML = "Please fill the field first";
        isValid = false;
    }else{
        errMsg[1].innerHTML = "";
        isValid = true;
    }

     // Grade Validation
    if(inputGpa.value===""){
        errMsg[2].innerHTML = "Please fill the field first";
        isValid = false;
    }else{
        errMsg[2].innerHTML = "";
        isValid = true;
    }

    // Age Validation
    if(inputAge.value===""){
        errMsg[3].innerHTML = "Please fill the field first";
        isValid = false;
    }else{
        errMsg[3].innerHTML = "";
        isValid = true;
    }

    // Degree Validation
    if(inputDegree.value===""){
        errMsg[4].innerHTML = "Please fill the field first";
        isValid = false;
    }else{
        errMsg[4].innerHTML = "";
        isValid = true;
    }

    return isValid;

}

// let count = 1;
let saveData = ()=>{
    studentArr.push({
        ID:"",
        name: inputName.value,
        age: inputAge.value,
        grade: inputGpa.value,
        degree: inputDegree.value,
        email: inputEmail.value
    });
    
    console.log("save data class")
    // Saving data in local storage
    localStorage.setItem("studentArr",JSON.stringify(studentArr));
    // console.log(studentArr);

    //Showing the data on UI
    showData();
}


let showData = ()=>{
    dataContainer.innerHTML = "";
    studentArr.forEach((student, id)=>{
        return dataContainer.innerHTML += `<tr id=${id}>
        <td>${id+1}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>
            <div class="degree-wrapper">
                <span>${student.degree}</span>
                <span class="options">
                    <span onclick="editStudent(this)" class="material-symbols-outlined">edit_square</span>
                    <span onclick="deleteStudent(this)" class="material-symbols-outlined">delete</span>
                </span>
            </div>
        </td>
        </tr>`
    });
}

let resetForm = ()=>{
    inputName.value = "";
    inputAge.value = "";
    inputGpa.value = "";
    inputDegree.value = "";
    inputEmail.value = "";
}


let editStudent = (e)=>{

    //Selecting the specific tr (which is parent)
    selectedStudent = e.parentNode.parentNode.parentNode.parentNode;

    //Updating the form input fields with the edited student detail
    inputName.value = selectedStudent.children[1].innerHTML;
    inputEmail.value = selectedStudent.children[2].innerHTML;
    inputAge.value = selectedStudent.children[3].innerHTML;
    inputGpa.value = selectedStudent.children[4].innerHTML;
    inputDegree.value = selectedStudent.children[5].children[0].children[0].innerHTML;

}

let updateData = ()=>{
    selectedStudent.children[1].innerHTML = inputName.value;
    selectedStudent.children[2].innerHTML = inputEmail.value;
    selectedStudent.children[3].innerHTML = inputAge.value;
    selectedStudent.children[4].innerHTML = inputGpa.value;
    selectedStudent.children[5].children[0].children[0].innerHTML = inputDegree.value;

    selectedStudent = null;
}


let deleteStudent = (e)=>{
    //Removing an element from UI
    e.parentNode.parentNode.parentNode.parentNode.remove();

    //Removing the element from studentArr
    studentArr.splice("e.parentNode.parentNode.parentNode.parentNode",1);

    //Removing the element from localStorage
    localStorage.setItem("studentArr", JSON.stringify(studentArr));
}


function search() {
    var  filter, td, i, txtValue, txtValue1, txtValue2;

    //inputSearch , dataContainer , tr
    filter = inputSearch.value.toUpperCase();

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}





(()=>{
    studentArr = JSON.parse(localStorage.getItem("studentArr")) || [];

    showData();
})();