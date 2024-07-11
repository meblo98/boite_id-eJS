const formIdee = document.getElementById("idea-form");
const errorMessage = document.getElementById("error-message");
const successMessage = document.getElementById("success-message");
const listeIdee = document.getElementById("ideas-list");
let idee = [];

// charge les données stockées en local
if (localStorage.getItem("ideas")) {
  idee = JSON.parse(localStorage.getItem("ideas"));
}

formIdee.addEventListener("submit", (e) => {
  e.preventDefault();
  const label = document.getElementById("label").value.trim();
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value.trim();
  // validation du formulaire
  if (!label || !category || !description) {
    errorMessage.textContent = "Veuillez remplir tous les champs";
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
      formIdee.reset();
    }, 2000);
    return;
  }
  // declarer les attribut des la table id"e
  const idea = {
    label,
    category,
    description,
    approved: false,
    status: "En attente",
  };
  // ajouter une nouvelle idée
  idee.push(idea);
  formIdee.reset();
  successMessage.textContent = "Idée ajoutée avec succès";
  successMessage.style.display = "block";
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 2000);

  // Enregistrer les idées en local
  localStorage.setItem("ideas", JSON.stringify(idee));

  displayIdeas();
});
// affichage des idées
function displayIdeas() {
    listeIdee.innerHTML = "";
    idee.forEach((idea, index) => {
      const ideaHTML = `
        <tr>
          <td>${idea.label}</td>
          <td>${idea.category}</td>
          <td>${idea.description}</td>
          <td>${idea.status}</td>
          <td>
            ${idea.status === "En attente"? `
              <i class="fas fa-thumbs-up approve-icon" data-index="${index}"></i>
              <i class="fas fa-thumbs-down disapprove-icon" data-index="${index}"></i>
            ` : ""}
            <i class="fas fa-trash-alt delete-icon" data-index="${index}"></i>
          </td>
        </tr>
      `;
      listeIdee.innerHTML += ideaHTML;
    });
  
    const approveIcons = document.querySelectorAll(".approve-icon");
    const disapproveIcons = document.querySelectorAll(".disapprove-icon");
    const deleteIcons = document.querySelectorAll(".delete-icon");
  
    approveIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const index = icon.getAttribute("data-index");
        idee[index].status = "Approuvée";
        localStorage.setItem("ideas", JSON.stringify(idee));
        displayIdeas();
      });
    });
  
    disapproveIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const index = icon.getAttribute("data-index");
        idee[index].status = "Désapprouvée";
        localStorage.setItem("ideas", JSON.stringify(idee));
        displayIdeas();
      });
    });
  
    deleteIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const index = icon.getAttribute("data-index");
        idee.splice(index, 1);
        localStorage.setItem("ideas", JSON.stringify(idee));
        displayIdeas();
      });
    });
  }

displayIdeas();
