//variables
const cart = document.getElementById('cart');
const courses = document.getElementById('list-courses');
const listCourses = document.querySelector('#list-cart tbody');
const emptyCartBtn = document.getElementById('empty-cart');

//listeners
loadEventListeners()
function loadEventListeners(){
    //When "Add Cart" Is Clicked
    courses.addEventListener('click', buyCourse);
    //When A single Course is removed from the cart
    cart.addEventListener('click', deleteCourse);
    //When "Empty Cart" is clicked
    emptyCartBtn.addEventListener('click', emptyCart);
    //After Reload Show Data from local storage
    document.addEventListener('DOMContentLoaded', readLocalStorage);
}

//Functions

//Function That Adds Course To cart
function buyCourse(e){
    e.preventDefault();
    
    if(e.target.classList.contains('add-cart')){
        const course = e.target.parentElement.parentElement;
        readDataCourse(course);
    }
}
//Function To Read The Data From The Path

function readDataCourse(course){
    const infoCourse = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.discounted').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }
    insertInCart(infoCourse);
}
//Function to insert data into the cart

function insertInCart(course){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
    <img src = "${course.image}">
    </td>
    <td>
    ${course.title}
    </td>
    <td>
    ${course.price}
    </td>
    <td class="cross">
    <a href = "#" class = "deleteCourse" data-id = "${course.id}">x</a>
    </td>
    ` ;
    listCourses.appendChild(row);
    saveCourseLocalStorage(course);
}
//Delete a single item from the cart

function deleteCourse(e){
    e.preventDefault();
    let course, courseId;
    if (e.target.classList.contains('deleteCourse')){
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    deleteCourseLocalStorage(courseId);
}
//Remove all the cart courses

function emptyCart(){
    while(listCourses.firstChild){
        listCourses.removeChild(listCourses.firstChild);
    }
    emptyLocalStorage();
    return false;
}
//Store courses in the cart to local storage

function saveCourseLocalStorage(course){
    let courses;
    courses = getCoursesLocalStorage();
    courses.push(course);
    localStorage.setItem('courses', JSON.stringify(courses));
}
function getCoursesLocalStorage(){
    let coursesLS;
    if (localStorage.getItem('courses')=== null){
        coursesLS = [];
    }
    else{
        coursesLS = JSON.parse(localStorage.getItem('courses'));
    }
    return coursesLS;
}
function readLocalStorage(){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function (course){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src = "${course.image}">
        </td>
        <td>
        ${course.title}
        </td>
        <td>
        ${course.price}
        </td>
        <td class="cross">
        <a href = "#" class = "deleteCourse" data-id = "${course.id}">x</a>
        </td>
        ` ;
        listCourses.appendChild(row);
    });   
}
function deleteCourseLocalStorage(course){
    let coursesLS;
    coursesLS = getCoursesLocalStorage();
    coursesLS.forEach(function (courseLS, index) {
        if (courseLS.id === course){
            coursesLS.splice(index,1);
        }
    });
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}
function emptyLocalStorage(){
    localStorage.clear();
