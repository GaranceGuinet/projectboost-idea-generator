const ideas = [
  {
    title: "Créer un site vitrine pour un freelance",
    category: "HTML/CSS",
    difficulty: "Débutant",
    description:
      "Créer un site responsive présentant l'activité, les services et les coordonnées d'un freelance.",
    skills: ["HTML sémantique", "CSS", "Responsive design"],
  },
  {
    title: "Développer une to-do list",
    category: "JavaScript",
    difficulty: "Débutant",
    description:
      "Créer une application permettant d'ajouter, terminer et supprimer des tâches.",
    skills: ["DOM", "Événements", "Tableaux"],
  },
  {
    title: "Créer un générateur de citations",
    category: "JavaScript",
    difficulty: "Débutant",
    description:
      "Afficher aléatoirement une citation à chaque clic sur un bouton.",
    skills: ["DOM", "Math.random()", "Tableaux"],
  },
  {
    title: "Réaliser un portfolio personnel",
    category: "HTML/CSS",
    difficulty: "Débutant",
    description:
      "Créer un portfolio responsive pour présenter ses projets, compétences et informations de contact.",
    skills: ["HTML", "CSS Grid", "Flexbox"],
  },
  {
    title: "Créer un formulaire avec validation",
    category: "JavaScript",
    difficulty: "Intermédiaire",
    description:
      "Créer un formulaire et vérifier les données saisies avant leur validation.",
    skills: ["Formulaires", "DOM", "Validation"],
  },
  {
    title: "Développer un jeu de devinettes",
    category: "JavaScript",
    difficulty: "Débutant",
    description:
      "Faire deviner à l'utilisateur un nombre généré aléatoirement par l'application.",
    skills: ["Conditions", "Événements", "Math.random()"],
  },
  {
    title: "Créer un convertisseur de devises",
    category: "API",
    difficulty: "Intermédiaire",
    description:
      "Convertir un montant d'une devise vers une autre grâce à une API de taux de change.",
    skills: ["Fetch API", "Async/Await", "Formulaires"],
  },
  {
    title: "Créer une FAQ interactive",
    category: "JavaScript",
    difficulty: "Débutant",
    description:
      "Créer une FAQ dont les réponses peuvent être affichées et masquées au clic.",
    skills: ["DOM", "Événements", "CSS"],
  },
  {
    title: "Développer un compteur interactif",
    category: "JavaScript",
    difficulty: "Débutant",
    description:
      "Créer un compteur avec des boutons permettant d'augmenter, diminuer et réinitialiser sa valeur.",
    skills: ["DOM", "Événements", "Variables"],
  },
  {
    title: "Créer un générateur de mots de passe",
    category: "JavaScript",
    difficulty: "Intermédiaire",
    description:
      "Générer un mot de passe aléatoire selon une longueur et différents types de caractères.",
    skills: ["Chaînes de caractères", "Tableaux", "Math.random()"],
  },
  {
    title: "Créer une application météo",
    category: "API",
    difficulty: "Intermédiaire",
    description:
      "Afficher la météo d'une ville recherchée par l'utilisateur grâce à une API externe.",
    skills: ["Fetch API", "Async/Await", "DOM"],
  },
  {
    title: "Créer une galerie responsive",
    category: "HTML/CSS",
    difficulty: "Débutant",
    description:
      "Créer une galerie d'images qui adapte automatiquement sa disposition à la taille de l'écran.",
    skills: ["CSS Grid", "Responsive design", "Images"],
  },
];

const FAVORITES_STORAGE_KEY = "projectboost-favorites";

const ideaText = document.getElementById("idea");
const ideaDetails = document.getElementById("idea-details");
const ideaCategory = document.getElementById("idea-category");
const ideaDifficulty = document.getElementById("idea-difficulty");
const ideaDescription = document.getElementById("idea-description");
const ideaSkillsList = document.getElementById("idea-skills-list");

const generateBtn = document.getElementById("generate-btn");
const favoriteBtn = document.getElementById("favorite-btn");

const categoryFilter = document.getElementById("category-filter");
const difficultyFilter = document.getElementById("difficulty-filter");

const favoritesList = document.getElementById("favorites-list");
const favoritesEmpty = document.getElementById("favorites-empty");

let lastIdeaTitle = null;
let currentIdea = null;

function loadFavorites() {
  try {
    const storedFavorites = JSON.parse(
      localStorage.getItem(FAVORITES_STORAGE_KEY),
    );

    if (!Array.isArray(storedFavorites)) {
      return [];
    }

    return storedFavorites.filter((title) =>
      ideas.some((idea) => idea.title === title),
    );
  } catch {
    return [];
  }
}

let favoriteTitles = loadFavorites();

function saveFavorites() {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteTitles));
}

function isFavorite(title) {
  return favoriteTitles.includes(title);
}

function updateFavoriteButton() {
  if (!currentIdea) {
    favoriteBtn.hidden = true;
    return;
  }

  favoriteBtn.hidden = false;

  favoriteBtn.textContent = isFavorite(currentIdea.title)
    ? "Retirer des favoris"
    : "Ajouter aux favoris";
}

function renderFavorites() {
  favoritesList.replaceChildren();

  favoritesEmpty.hidden = favoriteTitles.length > 0;

  favoriteTitles.forEach((title) => {
    const idea = ideas.find((item) => item.title === title);

    if (!idea) {
      return;
    }

    const listItem = document.createElement("li");
    listItem.classList.add("favorite-item");

    const titleElement = document.createElement("span");
    titleElement.textContent = idea.title;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.classList.add("remove-favorite-btn");
    removeButton.textContent = "Retirer";
    removeButton.setAttribute(
      "aria-label",
      `Retirer ${idea.title} des favoris`,
    );

    removeButton.addEventListener("click", () => {
      favoriteTitles = favoriteTitles.filter(
        (favoriteTitle) => favoriteTitle !== idea.title,
      );

      saveFavorites();
      renderFavorites();
      updateFavoriteButton();
    });

    listItem.append(titleElement, removeButton);
    favoritesList.appendChild(listItem);
  });
}

function getFilteredIdeas() {
  const selectedCategory = categoryFilter.value;
  const selectedDifficulty = difficultyFilter.value;

  return ideas.filter((idea) => {
    const categoryMatches =
      selectedCategory === "all" || idea.category === selectedCategory;

    const difficultyMatches =
      selectedDifficulty === "all" || idea.difficulty === selectedDifficulty;

    return categoryMatches && difficultyMatches;
  });
}

function getRandomIdea(filteredIdeas) {
  if (filteredIdeas.length === 1) {
    return filteredIdeas[0];
  }

  let selectedIdea;

  do {
    const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
    selectedIdea = filteredIdeas[randomIndex];
  } while (selectedIdea.title === lastIdeaTitle);

  return selectedIdea;
}

function displayIdea(idea) {
  currentIdea = idea;

  ideaText.textContent = idea.title;
  ideaCategory.textContent = idea.category;
  ideaDifficulty.textContent = idea.difficulty;
  ideaDescription.textContent = idea.description;

  ideaSkillsList.replaceChildren();

  idea.skills.forEach((skill) => {
    const listItem = document.createElement("li");
    listItem.textContent = skill;
    ideaSkillsList.appendChild(listItem);
  });

  ideaDetails.hidden = false;

  updateFavoriteButton();
}

generateBtn.addEventListener("click", () => {
  const filteredIdeas = getFilteredIdeas();

  if (filteredIdeas.length === 0) {
    currentIdea = null;

    ideaText.textContent =
      "Aucune idée ne correspond aux critères sélectionnés.";

    ideaDetails.hidden = true;
    favoriteBtn.hidden = true;

    return;
  }

  generateBtn.disabled = true;
  favoriteBtn.hidden = true;

  ideaText.textContent = "Génération en cours...";
  ideaDetails.hidden = true;

  setTimeout(() => {
    const selectedIdea = getRandomIdea(filteredIdeas);

    displayIdea(selectedIdea);

    lastIdeaTitle = selectedIdea.title;

    generateBtn.disabled = false;
  }, 500);
});

favoriteBtn.addEventListener("click", () => {
  if (!currentIdea) {
    return;
  }

  if (isFavorite(currentIdea.title)) {
    favoriteTitles = favoriteTitles.filter(
      (title) => title !== currentIdea.title,
    );
  } else {
    favoriteTitles.push(currentIdea.title);
  }

  saveFavorites();
  renderFavorites();
  updateFavoriteButton();
});

renderFavorites();
