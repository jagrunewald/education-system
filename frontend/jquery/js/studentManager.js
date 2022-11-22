$(document).ready(() => {
  if(isEditingMode()) {
    setReadOnlyFields();
    fetchStudent();
  } else {
    $(".loader").hide();
    $(".content-page").show("slow");
  }

  $("#student-form").submit((event) => {
    event.preventDefault();

    const body = {
      name: $("#name").val(),
      ra: $("#ra").val(),
      cpf: $("#cpf").val(),
      email: event.target.email.value,
    };

    let methodEndpoint;
    let urlEndpoint;

    if(isEditingMode()) {
      methodEndpoint = "PUT";
      urlEndpoint = `http://localhost:3000/students/edit/${getRAFromUrl()}`;
    } else {
      methodEndpoint = "POST";
      urlEndpoint = `http://localhost:3000/students/save`;
    }

    fetch(urlEndpoint, {
        method: methodEndpoint,
        body: JSON.stringify(body),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        document.location.href = "studentsList.html";
      });
  });
});

function setReadOnlyFields() {
  const studentForm = $("#student-form");
  studentForm.find("#ra").attr("readonly", true);
  studentForm.find("#cpf").attr("readonly", true);
}

function fetchStudent() {
  fetch(`http://localhost:3000/students/find/${getRAFromUrl()}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const studentForm = $("#student-form");
      studentForm.find("#name").val(data.nome);
      studentForm.find("#email").val(data.email);
      studentForm.find("#ra").val(data.ra);
      studentForm.find("#cpf").val(data.cpf);
      
      $(".loader").hide("fast");
      $(".content-page").show("slow");
    });
  }

function isEditingMode() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.has("ra");
}

function getRAFromUrl() {
  const urlSearch = new URLSearchParams(window.location.search);
  return urlSearch.get("ra");
}
