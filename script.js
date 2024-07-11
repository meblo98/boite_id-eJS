const ideaForm = document.getElementById('idea-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const ideasList = document.getElementById('ideas-list');
const ideas = [];

ideaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const label = document.getElementById('label').value.trim();
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();

    if (!label || !category || !description) {
        errorMessage.textContent = 'Veuillez remplir tous les champs';
        errorMessage.style.display = 'block';
        setTimeout(() => {
            errorMessage.style.display = 'none';
            ideaForm.reset();
        }, 2000);
        return;
    }

    const idea = {
        label,
        category,
        description,
        approved: false
    };

    ideas.push(idea);
    ideaForm.reset();
    successMessage.textContent = 'Idée ajoutée avec succès';
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 2000);

    displayIdeas();
});

function displayIdeas() {
    ideasList.innerHTML = '';
    ideas.forEach((idea) => {
        const ideaHTML = `
            <li>
                <h3>${idea.label}</h3>
                <p>Catégorie : ${idea.category}</p>
                <p>Message descriptif : ${idea.description}</p>
                <button class="approve-btn">Approuver</button>
                <button class="disapprove-btn">Désapprouver</button>
                <button class="delete-btn">Supprimer</button>
            </li>
        `;
        ideasList.innerHTML += ideaHTML;
    });

    const approveButtons = document.querySelectorAll('.approve-btn');
    const disapproveButtons = document.querySelectorAll('.disapprove-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');

    approveButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Code pour approuver l'idée
        });
    });

    disapproveButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Code pour désapprouver l'idée
        });
    });

    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Code pour supprimer l'idée
        });
    });
}

displayIdeas();