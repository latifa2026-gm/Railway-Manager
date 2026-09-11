//Projet Fin SAS 1 YouCode — Gestion d'un train en console « Railway Manager »

// Mes fonctions demandes pour la realisation du projett :

//1. Menu principal
function Afficher_menu() {
    console.log("=================================");
    console.log("         RAILWAY MANAGER         ");
    console.log("=================================");
    console.log("1. Afficher les trajets");
    console.log("2. Acheter un ticket");
    console.log("3. Afficher les tickets");
    console.log("4. Annuler un ticket");
    console.log("5. Rechercher un ticket");
    console.log("6. Filtrer les trajets");
    console.log("7. Trier les trajets");
    console.log("0. Quitter");
}


//3. Afficher les trajets
function Afficher_trajets(listTrajet) {
    console.log("=== TRAJETS DISPONIBLES ===");

    for (let trajet of listTrajet) {
        console.log(`\n#${trajet.id} ${trajet.departure} -> ${trajet.destination}`);
        console.log(`Départ : ${trajet.departureTime}`);
        console.log(`Arrivée: ${trajet.arrivalTime}`);
        console.log(`Prix : ${trajet.price} DH`);
        console.log(`Places disponibles : ${trajet.availableSeats}\n`);
    }
}

