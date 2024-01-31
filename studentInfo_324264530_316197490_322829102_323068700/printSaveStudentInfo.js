// Data Access Tier - logic related to the data access tier

function processInfo(id, name, lastName, address, sport, lang, knowlage) {
  var dbString = stringify(id, name, lastName, address, sport, lang, knowlage);
  localStorage.setItem(id, dbString);
}

function stringify(id, name, lastName, address, sport, lang, knowlage) {
  var nameStr = "name: " + name;
  var lastNameStr = "lastName: " + lastName;
  var addrStr = "address: " + address;
  var sportStr = "sport: " + sport;
  var langStr = "lang: " + lang;
  var knowlageStr = "knowlage: " + knowlage;
  var dbStr =
    "{" +
    nameStr +
    "," +
    lastNameStr +
    "," +
    addrStr +
    "," +
    sportStr +
    "," +
    langStr +
    "," +
    knowlageStr +
    "}";
  return dbStr;
}
function getStudentsDb() {
  var students = []; //rows: number of student. cols: number of info params
  for (i = 0; i < localStorage.length; i++) {
    var studentId = localStorage.key(i);
    var studentInfo = localStorage.getItem(studentId);
    var tmpStudent = [];
    tmpStudent[0] = studentId;
    tmpStudent[1] = getName(studentInfo);
    tmpStudent[2] = getLastName(studentInfo);
    tmpStudent[3] = getAddr(studentInfo);
    tmpStudent[4] = getSport(studentInfo);
    tmpStudent[5] = getLang(studentInfo);
    tmpStudent[6] = getKnowlage(studentInfo);
    students[i] = tmpStudent;
  }
  return students;
}

function removeIdFromDb(id) {
  var tmpStudents = getStudentsDb();
  console.log("IM removeIdFromDb function");
  console.log("The first Array: ");
  for (i = 0; i < tmpStudents.length; i++) {
    console.log(tmpStudents[i]);
  }

  console.log("\n");
  console.log("\n");

  // Find the index of the student with the specified id
  var indexNeeded = -1;
  for (i = 0; i < tmpStudents.length; i++) {
    if (tmpStudents[i][0] === id) {
      indexNeeded = i;
      break;
    }
  }

  if (indexNeeded !== -1) {
    // Remove the student with the specified id from the array
    tmpStudents.splice(indexNeeded, 1);

    console.log("Array after removal: ");
    for (i = 0; i < tmpStudents.length; i++) {
      console.log(tmpStudents[i]);
    }

    // Update the local storage with the modified array
    updateLocalStorage(tmpStudents);

    return tmpStudents;
  } else {
    console.log("Student with id " + id + " not found.");
    return tmpStudents;
  }
}

function updateLocalStorage(students) {
  // Update the local storage with the modified array
  localStorage.clear();

  for (i = 0; i < students.length; i++) {
    var student = students[i];
    var dbString = stringify(
      student[0],
      student[1],
      student[2],
      student[3],
      student[4],
      student[5],
      student[6]
    );
    localStorage.setItem(student[0], dbString);
  }
}
function getName(studentInfo) {
  var nameIndex = studentInfo.indexOf("name") + 6;
  var endNameIndex = studentInfo.indexOf("lastName") - 1;
  return studentInfo.substring(nameIndex, endNameIndex);
}
function getLastName(studentInfo) {
  var lastNameIndex = studentInfo.indexOf("lastName") + 10;
  var endLastNameIndex = studentInfo.indexOf("address") - 1;
  return studentInfo.substring(lastNameIndex, endLastNameIndex);
}

function getAddr(studentInfo) {
  var addrIndex = studentInfo.indexOf("address") + 9;
  var endAddrIndex = studentInfo.indexOf("lang") - 1;
  return studentInfo.substring(addrIndex, endAddrIndex);
}

function getSport(studentInfo) {
  var sportIndex = studentInfo.indexOf("sport") + 10;
  var endSportIndex = studentInfo.indexOf("address") - 1;
  // return studentInfo.substring(sportIndex, endSportIndex);
}

function getLang(studentInfo) {
  var langIndex = studentInfo.indexOf("lang") + 6;
  var endLangIndex = studentInfo.indexOf("knowlage") - 1;
  return studentInfo.substring(langIndex, endLangIndex);
}
function getKnowlage(studentInfo) {
  var knowIndex = studentInfo.indexOf("knowlage") + 10;
  var endKnowIndex = studentInfo.indexOf("}");
  return studentInfo.substring(knowIndex, endKnowIndex);
}
