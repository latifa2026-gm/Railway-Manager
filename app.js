//Projet Fin SAS 1 YouCode — Gestion d'un train en console « Railway Manager »
// Mes fonctions demandes pour la realisation du projett :
//1. Menu principal
function Afficher_menu(){
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
        console.log("\nTrajet introuvable.\n");
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
        console.log("\nTicket acheté avec succès.\n");
        console.log(find_tiket(tickets,ticket_id));
    } else {
        console.log("\nTrain complet.\n");
    }
}
//5. Afficher les tickets
function Afficher_tickets(list_ticket, listTrajet) {
    if (list_ticket.length === 0) {
        console.log("\nAucun ticket enregistré.\n");
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
        console.log("\nTicket introuvable.\n");
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
    console.log("\nTicket annulé avec succès.\n");
}
//fonction pour nettoyer un texte  afin de faire une vrai comparaison avec l'entrer du l'utilisateur.
function cleanTexte(Name) {
    return Name.trim().toLowerCase();
}
//7. Rechercher un ticket
function Rechercher_un_ticket(list_ticket, list_trajet, Nom_passager) {
    let foundPassagerName = false;
    for (const ticket of list_ticket) {
        if (cleanTexte(ticket.passengerName) === cleanTexte(Nom_passager)) {
            // doit afficher tous les tickets appartenant à Nom_passager
            foundPassagerName = true;
            let trajet = findtrajet(list_trajet, ticket.tripId);
            console.log("\n  ==============================   ");
            console.log(`Ticket #${ticket.id}`);
            console.log(`Passager : ${ticket.passengerName}`);
            console.log(`Trajet : ${trajet.departure} -> ${trajet.destination}`);
            console.log(`Place :${ticket.seatNumber}`);
            console.log(`Prix : ${ticket.price} DH`);
            console.log("  ==============================   \n");
        }
    }
    if (!foundPassagerName)
        console.log("\nNom du passager introuvable.\n");
}
//8. Filtrer les trajets
function Filtrer_trajets(list_trajet, Ville_depart) {
    let Ville_found = false;
    for (const trajet of list_trajet) {
        if (cleanTexte(trajet.departure) === cleanTexte(Ville_depart)) {
            Ville_found = true;
            console.log(`${trajet.departure} -> ${trajet.destination} : ${trajet.price} DH `);
        }
    }
    if (!Ville_found) {
        console.log("\ndepart ville is not found !\n");
    }
}
//9. Trier les trajets on applique un tri a bulle.
function Trier_trajets(list_trajet) {
    let list_trajet_sorted = [...list_trajet];
    for (let i = 0; i < list_trajet_sorted.length; i++) {
        for (let j = 0; j < list_trajet_sorted.length - 1-i; j++) {
            if (list_trajet_sorted[j].price > list_trajet_sorted[j + 1].price) {
                let temp = list_trajet_sorted[j];
                list_trajet_sorted[j] = list_trajet_sorted[j + 1];
                list_trajet_sorted[j + 1] = temp;
            }
        }
    }
    return list_trajet_sorted;
}
//10. Bonus — Statistiques
function Nombre_totale_tickets_vendus(list_ticket) {
    return list_ticket.length;
}
function Chiffre_affaires_total(list_ticket) {
    let sum = 0;
    for (let ticket of list_ticket) {
        sum += ticket.price;
    }
    return sum;
}
//fonction Trajet le plus vendu pour Compter le nombre de tickets correspondant à chaque tripId.
function Trajet_plus_vendu(list_ticket, list_trajet) {
    if (list_ticket.length === 0) {
        return null;
    }
    let infos = [];
    let max = 0, trajet_id = null;
    for (let i = 0; i < list_trajet.length; i++) {
        let tripid = list_trajet[i].id;
        let count = 0;
        for (let j = 0; j < list_ticket.length; j++) {
            if (list_ticket[j].tripId === tripid) {
                count++;
            }
        }
        if (count > max) {
            max = count;
            trajet_id = tripid;
        }
    }
    let max_trajet = findtrajet(list_trajet, trajet_id);
    infos.push(max_trajet, max);
    return infos;
}
//mon Programme principale :
const prompt = require('prompt-sync')();
//les donnees nécessaires à la réalisation du projet:
const trips = require('./data.js');
//console.log(trips);
const tickets = [];
let ticket_id = 0;
let choix;
do {
    Afficher_menu();
    choix =Number(prompt("Votre choix :"));
    switch (choix) {
        case 0 :
            console.log("Vous avez choisi de quitter le programme. À bientôt !");
            break;
        case 1 :
            Afficher_trajets(trips);
            break;
        case 2:
            let Nom_passager_acheter_ticket = prompt("\nEntrer le nom de passager : ");
            let Id_trajet = Number(prompt("\nEntrer id de trajet que tu as veux : "));
            Acheter_un_ticket(
                trips,
                tickets,
                Nom_passager_acheter_ticket,
                Id_trajet
            );
            break;
        case 3 :
            Afficher_tickets(tickets, trips);
            break;
        case 4 :
            let id_ticket = Number(prompt("\nIdentifiant du ticket : "));
            Annuler_un_ticket(tickets, trips, id_ticket);
            break;
        case 5 :
            let Nom_passager = prompt("\nNom du passager :");
            Rechercher_un_ticket(tickets, trips, Nom_passager);
            break;
        case 6:
            let Ville_depart = prompt("\nVille de départ : ");
            Filtrer_trajets(trips, Ville_depart);
            break;
        case 7:
            Afficher_trajets(Trier_trajets(trips));
            break;
        default:
            console.log("\nChoix invalide ! faire une saisie correct .\n");
    }

} while (choix != 0);
//affichage du resultat de nombres du tikets vendu.
console.log("Nombre total de tickets :", Nombre_totale_tickets_vendus(tickets));
//affichage du resultat de la somme des prix des tickets vendu .
console.log(`Chiffre d'affaires total : ${Chiffre_affaires_total(tickets)} DH`);
//resultat du trajet plus vendu .
let resultat = Trajet_plus_vendu(tickets, trips);

if (resultat === null) {
    console.log("Aucun trajet vendu.\n");
} else {
    console.log("Trajet le plus vendu :\n");
    console.log(`${resultat[0].departure} -> ${resultat[0].destination}`);
    console.log(`${resultat[1]} tickets vendus`);
}
