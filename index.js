const add = document.querySelector('#add');
const courseCode = document.querySelector('#course-code');
const unitLoad = document.querySelector('#unit-load');
const grade = document.querySelector('#grade');
const tbody = document.querySelector('#tbody');
const tfoot = document.querySelector('#tfoot');
const table = document.querySelector('#table');
const calcGp = document.querySelector('#cal-gpa');
const clear = document.querySelector('#clear');

let gpArry = [];

add.addEventListener('click', () => {
    
    if (courseCode.value === "")
    {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'The course Code was entered wrongly!',
          })
        
    }
    else if ( unitLoad.value <=0) {
        
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'The Unit Load value was entered wrongly!',
              })  
    }
    else if (grade.selectedIndex === 0) {
        {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'The grade has not being entered!',
              })
            
        }
    }
    else {

    const tr = document.createElement('tr');
    const tdCourseCode = document.createElement('td');
    tdCourseCode.innerHTML = courseCode.value;
    const tdUnitLoad = document.createElement('td');
    tdUnitLoad.innerHTML = unitLoad.value;
    const tdGrade = document.createElement('td');
    tdGrade.innerHTML = grade.options[grade.selectedIndex].text;
    tr.appendChild(tdCourseCode);
    tr.appendChild(tdUnitLoad);
    tr.appendChild(tdGrade);
    tbody.appendChild(tr);
    table.classList.remove('display-none');
    calcGp.classList.remove('display-none');
    clear.classList.remove('display-none');
    gpArry.push({'unitLoad':unitLoad.value,'grade': grade.options[grade.selectedIndex].value})
    courseCode.value = ('');
    unitLoad.value = ('');
    grade.selectedIndex = ("0");
    }
});

calcGp.addEventListener('click',() => {
    let unitLoads = 0, productOfUnitLoadsAndGrades = 0,
        sumOfProductOfUnitLoadsAndGrades =  0

        gpArry.forEach(result => {
            unitLoads += parseInt(result.unitLoad);
            productOfUnitLoadsAndGrades = parseInt(result.unitLoad) * parseInt(result.grade);
            sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades
        });
        const tr = document.createElement('tr');
    let tdTotalUnitLoad = document.createElement('td');
    tdTotalUnitLoad.innerHTML = `Your total unit Load is ${unitLoads}`;
    let tdGpa = document.createElement('td');
    tdGpa.setAttribute('colspan', '2');
    tdGpa.innerHTML = `Your GPA is ${(sumOfProductOfUnitLoadsAndGrades / unitLoads).toFixed(2)}`;

        tr.appendChild(tdTotalUnitLoad);
        tr.appendChild(tdGpa);
        if(tfoot.querySelector('tr') !== null) {
            tfoot.querySelector('tr').remove();
        }
        tfoot.appendChild(tr)
});

clear.addEventListener('click', () => {
    gpArry = [];
    tbody.querySelectorAll('*').forEach(child => child.remove());
    if(tfoot.querySelector('tr') !== null) {
        tfoot.querySelector('tr').remove();
    }
    table.classList.add('display-none');
    calcGp.classList.add('display-none');
    clear.classList.add('display-none');
})