// Tableau contenant toutes les idées de projets à afficher aléatoirement
const ideas = [
  "Créer un site vitrine pour un freelance",
  "Développer une to-do list simple en java-script",
  "Créer un générateur de citations",
  "Réaliser une page portfolio personnelle",
  "Créer un formulaire de contact avec validation java-script",
  "Développer un mini jeu de devinettes",
  "Créer un convertisseur de devises",
  "Créer une page FAQ interactive",
  "Développer un compteur interactif",
  "Créer un générateur de mots de passe simples"
]

// Récupération des éléments du DOM (zone d'affichage et bouton)
const ideaText = document.getElementById("idea")
const generateBtn = document.getElementById("generate-btn")

// Stocke l'index de la dernière idée affichée
let lastIndex = null
// Contiendra l'index de l'idée générée aléatoirement
let randomIndex

 // Génération d'une nouvelle idée au clic sur le bouton
generateBtn.addEventListener("click", () => {
    // Désactive le bouton et affiche un message pendant la génération
    generateBtn.disabled = true
    ideaText.textContent = "Génération en cours..."
    // Lance la génération après un court délai
    setTimeout (() => {
    // Génère un index aléatoire différent du précédent
do {
    randomIndex = Math.floor(Math.random() * ideas.length)
} 
    while (randomIndex === lastIndex)
    // Affiche l'idée selectionnée
    ideaText.textContent = ideas[randomIndex]
    // Mémorise l'index pour le prochain clic
     lastIndex = randomIndex
    // Réactive le bouton après la génération
    generateBtn.disabled = false
}, 500)

})