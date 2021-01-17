class UI {
  static refreshCoursesTable(courses) {
    console.log("refreshing table");

    let tbody = "";
    courses.forEach((course, index) => {
      tbody =
        tbody +
        `<tr>
                 <td>${course.name}</td>
                 <td>${course.description}</td>
                 <td class="text-capitalize">${course.level}</td>
                 <td>
                     <button class="btn  btn-sm rounded-0" id=${index}>
                     <i class="fas fa-edit text-info fa-lg" id='edit-course'
                    style="cursor: pointer"></i>
                        </button>
                     <button class="btn  btn-sm rounded-0" id=${index}>
                        <i class="fas fa-trash text-danger fa-lg" id='delete-course'
                    style="cursor: pointer"></i>
                        </button>
                 </td>
             </tr>`;
    });

    document.querySelector("tbody").innerHTML = tbody;
  }
}
