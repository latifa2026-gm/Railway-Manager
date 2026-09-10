const prompt = require("prompt-sync")();

const trips = [
    {
        id: 1,
        departure: "Safi",
        destination: "Youssoufia",
        departureTime: "08:00",
        arrivalTime: "09:00",
        price: 25,
        availableSeats: 50
    },
    {
        id: 2,
        departure: "Youssoufia",
        destination: "Ben Guerir",
        departureTime: "09:30",
        arrivalTime: "10:30",
        price: 30,
        availableSeats: 50
    },
    {
        id: 3,
        departure: "Safi",
        destination: "Marrakech",
        departureTime: "10:00",
        arrivalTime: "12:00",
        price: 90,
        availableSeats: 50
    },
    {
        id: 4,
        departure: "Marrakech",
        destination: "Casablanca",
        departureTime: "13:00",
        arrivalTime: "16:00",
        price: 120,
        availableSeats: 50
    }
];

const tickets = [];

console.log("Données chargées avec succès.");