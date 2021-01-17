class Course {
  name;
  description;
  level;

  constructor(name, description, level) {
    this.name = name;
    this.description = description;
    this.level = level;
  }

  save() {
    // console.log("saving ", this);
    // localStorage
    // create an item using setItem() method, eg: localStorage.setItem(key, value)
    // delete an item using removeItem method, eg: localStorage.removeItem(key);
    // update an item using set again, eg: localStorage.setItem(key, value)
    // clear the whole storage, using clear(), eg: localStorage.clear();
    // add course to the storage
    /* localStorage.setItem(
      "course",
      JSON.stringify({
        name: this.name,
        description: this.description,
        level: this.level
      })
    );

    return localStorage.getItem("course"); */

    let courses = localStorage.getItem("courses");

    courses = JSON.parse(courses);

    if (courses === null) {
      courses = [
        { name: this.name, description: this.description, level: this.level }
      ];

      // save to localstorage
      localStorage.setItem("courses", JSON.stringify(courses));
      return localStorage.getItem("courses");
    } else {
      courses.push({
        name: this.name,
        description: this.description,
        level: this.level
      });

      localStorage.setItem("courses", JSON.stringify(courses));
      return localStorage.getItem("courses");
    }
  }

  update(courseId) {
    let courses = localStorage.getItem("courses");

    courses = JSON.parse(courses);

    courses.splice(courseId, 1, {
      name: this.name,
      description: this.description,
      level: this.level
    });

    localStorage.setItem("courses", JSON.stringify(courses));

    return courses;
  }
}
