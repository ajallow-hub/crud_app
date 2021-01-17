 let courseId = null;

      document.querySelector("#year").textContent = new Date().getFullYear();

      const modalOpen = document.querySelector("#open-modal");
      const modalClose = document.querySelector(".close");
      const confirmDeleteAlert = document.querySelector("#confirm-delete");
      const successAlert = document.querySelector("#alert-success");
      const courseNameToDelete = document.querySelector("#course-to-delete");
      const modalBackdrop = document.querySelector(".m-backdrop");
      const saveCourseButton = document.querySelector("#save");
      const coursesTable = document.querySelector("table");
      const processDeleteButton = document.querySelector("#process-delete");
      const cancelDeleteButton = document.querySelector("#cancel-delete");
      const alertMessage = document.querySelector("#message");

      // form fields
      const name = document.querySelector("#name");
      const description = document.querySelector("#description");
      const level = document.querySelector("#level");

      const closeModal = () => {
        modalBackdrop.style.display = "none";
      };

      modalClose.addEventListener("click", () => {
        closeModal();
      });
      modalOpen.addEventListener("click", () => {
        saveCourseButton.textContent = "Save";
        modalBackdrop.style.display = "block";
        name.value = "";
        description.value = "";
        level.value = "";
      });

      // populate courses table on page load
      let courses = localStorage.getItem("courses");
      courses = JSON.parse(courses);
      if (courses !== null) {
        UI.refreshCoursesTable(courses);
      }

      // add a new to localstorage and then update our courses table
      saveCourseButton.addEventListener("click", e => {
        e.preventDefault();
        const courseName = name.value;
        const courseDescription = description.value;
        const courseLevel = level.value;

        if (saveCourseButton.textContent.trim() == "Save") {
          const newCourse = new Course(
            courseName,
            courseDescription,
            courseLevel
          );

          let response = newCourse.save();
          console.log(response);
          console.log(JSON.parse(response));

          let courses = JSON.parse(response);

          UI.refreshCoursesTable(courses);
          successAlert.classList.replace("hide", "show");
          alertMessage.textContent =
            "You have successfully created a new Course";
          setTimeout(() => {
            successAlert.classList.replace("show", "hide");
          }, 5000);
        } else {
          // put your update course logic here
          // alert("course id to update is " + courseId);
          const courseToUpdate = new Course(
            courseName,
            courseDescription,
            courseLevel
          );

          let courses = courseToUpdate.update(courseId);
          // get all courses from the localStorage

          UI.refreshCoursesTable(courses);
          successAlert
            .querySelector(".alert")
            .classList.replace("alert-success", "alert-info");
          successAlert.classList.replace("hide", "show");
          alertMessage.textContent =
            "You have successfully updated Course details";
          setTimeout(() => {
            successAlert.classList.replace("show", "hide");
            successAlert
              .querySelector(".alert")
              .classList.replace("alert-info", "alert-success");
          }, 5000);
        }

        closeModal();
      });
      coursesTable.addEventListener("click", e => {
        if (e.target.getAttribute("id") == "edit-course") {
          console.log("clicked edit");
          console.log(e.target.parentNode.getAttribute("id"));
          modalBackdrop.style.display = "block";

          courseId = e.target.parentNode.getAttribute("id");
          let courses = localStorage.getItem("courses");
          courses = JSON.parse(courses);

          let courseToEdit = courses[courseId];
          name.value = courseToEdit.name;
          description.value = courseToEdit.description;
          level.value = courseToEdit.level;
          if (saveCourseButton.textContent.trim() == "Save") {
            saveCourseButton.textContent = "Update";
          }
        }
        if (e.target.getAttribute("id") == "delete-course") {
          console.log("clicked delete");

          courseId = e.target.parentNode.getAttribute("id");
          let courses = localStorage.getItem("courses");
          courses = JSON.parse(courses);

          let courseToDelete = courses[courseId];
          courseNameToDelete.textContent = courseToDelete.name;
          confirmDeleteAlert.classList.replace("hide", "show");
        }
      });
      processDeleteButton.addEventListener("click", e => {
        // get all courses from localStorage
        let courses = JSON.parse(localStorage.getItem("courses"));
        // use splice to remove the course you want you to delete using the courseId,
        courses.splice(courseId, 1);

        console.log(courses);
        localStorage.setItem("courses", JSON.stringify(courses));
        UI.refreshCoursesTable(courses);
        confirmDeleteAlert.classList.replace("show", "hide");
        successAlert.classList.replace("hide", "show");
        alertMessage.textContent = "You have successfully deleted course";
        setTimeout(() => {
          successAlert.classList.replace("show", "hide");
          successAlert
            .querySelector(".alert")
            .classList.replace("alert-info", "alert-success");
        }, 5000);
      });
      cancelDeleteButton.addEventListener("click", e => {
        confirmDeleteAlert.classList.replace("show", "hide");
      });
