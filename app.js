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

//fonction pour trouver le trajet .
function findtrajet(listTrajet, trajetid) {
    for (let trajet of listTrajet) {
        if (trajet.id === trajetid)
            return trajet;
    }

    return null;
}

//fonction pour trouver le premier place vide !
function trouver_Place_Libre_pour_Meme_trajet(list_ticket, trajetId) {
    let place = 1;

    while (true) {
        let placeoccupee = false;

        for (let ticket of list_ticket) {
            if (ticket.tripId === trajetId && ticket.seatNumber === place) {
                placeoccupee = true;
                break;
            }
        }

        if (!placeoccupee) {
            return place;
        }

        place++;
    }
}
//4. Acheter un ticket
function Acheter_un_ticket(listTrajet, tickets, Nom_passager, Id_trajet) {
    let trajet = findtrajet(listTrajet, Id_trajet);

    // Vérifier si le trajet existe
    if (trajet === null) {
        console.log("Trajet introuvable.");
        return;
    }

    // Vérifier les places disponibles
    if (trajet.availableSeats >= 1) {
        let placelibre = trouver_Place_Libre_pour_Meme_trajet(tickets, Id_trajet);
        let ticket = {
            'id': ++ticket_id,
            'passengerName': Nom_passager,
            'tripId': trajet.id,
            'seatNumber': placelibre,
            'price': trajet.price
        };

        trajet.availableSeats--;

        tickets.push(ticket);

        console.log("Ticket acheté avec succès.");

    } else {
        console.log("Train complet.");
    }
}


//5. Afficher les tickets
function Afficher_tickets(list_ticket, listTrajet) {

    if (list_ticket.length === 0) {
        console.log("Aucun ticket enregistré.");
        return;
    }
    console.log("\n=== TICKETS ===");
    for (let ticket of list_ticket) {
        let id_trip = ticket.tripId;
        let trajet = findtrajet(listTrajet, id_trip);
        console.log(`\nTicket #${ticket.id}`);
        console.log(`Passager : ${ticket.passengerName}`);
        console.log(`Trajet : ${trajet.departure} -> ${trajet.destination}`);
        console.log(`Place : ${ticket.seatNumber}`);
        console.log(`Prix : ${ticket.price} DH\n`);
    }
}
//fonction pour trouvet trajet .
function find_tiket(list_ticket, id_ticket) {
    for (const ticket of list_ticket) {
        if (ticket.id === id_ticket) {
            return ticket;
        }
    }

    return null;
}

//6. Annuler un ticket
function Annuler_un_ticket(list_ticket, list_trajet, id_ticket,) {
    let ticket = find_tiket(list_ticket, id_ticket);
    if (ticket === null) {
        console.log("Ticket introuvable.");
        return;
    }
    // retrouver le trajet associé
    let trajet = findtrajet(list_trajet, ticket.tripId);
    trajet.availableSeats++;
    // supprimer le ticket
    let index = -1;

    for (let i = 0; i < list_ticket.length; i++) {
        if (list_ticket[i].id === id_ticket) {
            index = i;
            break;
        }
    }
    //let index = list_ticket.findIndex(ticket => ticket.id === id_ticket);
    list_ticket.splice(index, 1);
    console.log("Ticket annulé avec succès.");
}


//fonction pour nettoyer un texte  afin de faire une vrai comparaison avec l'entrer du l'utilisateur.
function cleanTexte(Name) {
    return Name.trim().toLowerCase();
}
