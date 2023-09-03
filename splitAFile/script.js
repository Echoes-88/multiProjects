// Récupérer le bouton de sélection de fichier
const boutonFichier = document.getElementById('bouton-fichier');
const boutonReformer = document.getElementById('bouton-reformer');

    // Tableau pour stocker les parties du fichier
    const parties = [];

// Ajouter un événement au clic sur le bouton de sélection de fichier
boutonFichier.addEventListener('click', () => {
    console.log("click")
  // Ouvrir la boîte de dialogue de sélection de fichier
  const inputFichier = document.createElement('input');
  inputFichier.type = 'file';
  inputFichier.addEventListener('change', () => {
    const fichier = inputFichier.files[0];
    if (fichier) {
      // Définir la taille de chaque partie
      const taillePartie = Math.ceil(fichier.size / 4);
      let debut = 0;
      let fin = taillePartie;
      
      // Découper le fichier en 4 parties
      for (let i = 1; i <= 4; i++) {
        const partie = fichier.slice(debut, fin);
        debut = fin;
        fin = debut + taillePartie;
        
        // Créer un bouton de téléchargement pour chaque partie
        const boutonTelechargement = document.createElement('a');
        boutonTelechargement.innerHTML = `Télécharger la partie ${i}`;
        boutonTelechargement.href = URL.createObjectURL(partie);
        boutonTelechargement.download = `partie-${i}.dat`;
        document.body.appendChild(boutonTelechargement);
      }
      

    }
  });
  inputFichier.click();
});

boutonReformer.addEventListener("click", ()=> {


  // Ouvrir la boîte de dialogue de sélection de fichiers
  const inputFichier = document.createElement('input');
  inputFichier.type = 'file';
  inputFichier.multiple = true;
  
  inputFichier.addEventListener('change', async () => {
    const fichiers = inputFichier.files;
    if (fichiers.length === 4) {

        console.log("fichiers", fichiers)

        const myArray = Array.from(fichiers);

       const sortedFiles = myArray.sort((a, b) => a.name.localeCompare(b.name))



        for (let i = 0; i <= 3; i++) {
            const partie = sortedFiles[i]
            if (partie) {
                console.log(partie)
                console.log(i)
              const buffer = await lirePartie(partie);
              parties.push(buffer);
            } else {
              throw new Error(`Partie ${i} manquante`);
            }
          }
      console.log(parties)
          // Combiner les parties en un seul Blob
          const fichier = new Blob(parties);
          console.log(fichier)

                // Création de l'URL à partir du Blob
      const url = URL.createObjectURL(fichier);
      // Création du lien de téléchargement
      const lienTelechargement = document.createElement('a');
      lienTelechargement.href = url;
      lienTelechargement.download = 'fichier.dat';
      document.body.appendChild(lienTelechargement);
  
      // Clic sur le lien pour déclencher le téléchargement
      lienTelechargement.click();
    } else {
      console.error("Veuillez sélectionner 4 fichiers.");
    }
  });
  
  inputFichier.click();

    });





// Fonction pour lire chaque partie en tant que ArrayBuffer
function lirePartie(partie) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(partie);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
  });
}

// Fonction pour combiner les parties en un seul Blob
async function combinerParties() {
  try {
    // Lire chaque partie en tant que ArrayBuffer
    for (let i = 1; i <= 4; i++) {
      const partie = document.querySelector(`[download="partie-${i}.dat"]`);
      if (partie) {
        const buffer = await lirePartie(partie);
        parties.push(buffer);
      } else {
        throw new Error(`Partie ${i} manquante`);
      }
    }

    // Combiner les parties en un seul Blob
    const fichier = new Blob(parties);

    // Retourner le Blob contenant toutes les parties combinées
    return fichier;
  } catch (erreur) {
    console.error(erreur);
  }
}

// Fonction pour télécharger le fichier reconstitué
async function telechargerFichier() {
    try {
      // Combinaison des parties en un seul Blob
      const fichier = await combinerParties();
  
      // Création de l'URL à partir du Blob
      const url = URL.createObjectURL(fichier);
  
      // Création du lien de téléchargement
      const lienTelechargement = document.createElement('a');
      lienTelechargement.href = url;
      lienTelechargement.download = 'fichier.dat';
      document.body.appendChild(lienTelechargement);
  
      // Clic sur le lien pour déclencher le téléchargement
      lienTelechargement.click();
    } catch (erreur) {
      console.error(erreur);
    }
  }