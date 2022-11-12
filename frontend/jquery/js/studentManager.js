$(document).ready(() => {
  fetchStudent();
});

function fetchStudent() {
  const urlSearch = new URLSearchParams(window.location.search);
  const ra = urlSearch.get("ra");

  if(ra) {
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
    })
  } else {
    alert("não encontrado")
  }

}
