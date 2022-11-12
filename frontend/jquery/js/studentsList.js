$(document).ready(function() {
  fetchStudentsList();
  $("body").on("click", ".remove-student", function() {
    const ra = $(this).data("ra");
    const confirmation = confirm("Você realmente deseja excluir esse estudante?");
    
    if(confirmation) {
      deleteStudent(ra);
    }
    
  });
});

const deleteStudent = (ra) => {
  fetch(`http://localhost:3000/students/delete/${ra}`, {
      method: 'DELETE',
    }).then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('data',data);
      fetchStudentsList();
    });
}

function fetchStudentsList() {
  $(".loader").show("slow");
  $(".content-page").hide("fast");

  fetch("http://localhost:3000/students/list")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const table = $("#studentList tbody");
      table.html("");
      data.map((student) => {
        table.append(`

          <tr>
            <td>${student.ra}</td>
            <td>${student.nome}</td>
            <td>${student.cpf}</td>
            <td>
              <a href="studentManager.html?ra=${student.ra}">Editar</a>
              <a href="#" class="remove-student" data-ra="${student.ra}">Excluir</a>
            </td>
          </tr>

        `);
    
      });

      $(".loader").hide("fast");
      $(".content-page").show("slow");
    });
}
