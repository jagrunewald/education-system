$(document).ready(() => {
  const urlSearch = new URLSearchParams(window.location.search);
  const ra = urlSearch.get("ra");
  console.log('ra', ra)

  if(ra) {
    fetchStudent(ra);
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
    }

    fetch("http://localhost:3000/students/save", {
      method: "POST",
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
      console.log(data);
      document.location.href = "studentsList.html";
    })

  })

});

function fetchStudent(ra) {
  fetch(`http://localhost:3000/students/find/${ra}`)
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

