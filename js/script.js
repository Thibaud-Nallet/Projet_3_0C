const urlAppelJcDecaux = "https://api.jcdecaux.com/vls/v1/stations?contract=toulouse&apiKey=df0df4629b60fb30815522beffed070d26a2a284";

//Définition d'un tableau regroupant les images et le texte du caroussel
const tableauCaroussel = [{
        url: "1.jpg",
        titre: "Bienvenue sur Vélô Toulouse",
        texte: "Le service de vélos stations à Toulouse",
        alt: "Vélo vintage dans une rue souhaitant la bienvenue"
    },
    {
        url: "2.jpg",
        titre: "Comment ça marche ?",
        texte: "Pour utiliser ce site, laissez-vous guider ...",
        alt: "Homme devant un écran d'ordinateur affichant la page d'accueil du site VélôToulouse"
    },
    {
        url: "3_1.jpg",
        titre: "1. Choisir votre station",
        texte: "Avec le site Vélô Toulouse, vous sélectionnez votre station à l'aide d'un marqueur sur la map. <br/> De plus, la zone de recherche vous permets d'affiner la localité de la station recherchée.",
        alt: "Ecran d'ordianteur expliquant la façon de cliquer sur un marqueur"
    },
    {
        url: "3_2.jpg",
        titre: "2. Valider la réservation",
        texte: "Une fois la station choisie, il ne vous reste plus qu'à valider votre réservation<br /> Signez votre réservation dans la zone prévue à cet effet, cliquez sur 'Valider', le tour est joué ! ",
        alt: "Ecran d'ordinateur expliquant qu'il faut renseigner le nom/prénom et signer dans la partie blanche"
    },
    {
        url: "3_3.jpg",
        titre: "3. Réservation en cours",
        texte: "Retrouvez toutes les informations concernant votre réservation. <br /> Vous avez aussi la possibilité de l'annuler à tout moment.",
        alt: "Ecran d'ordinateur expliquant le lieu ou se trouve la réservation que vous venez d'effectuer"
    }
];

// Crée le caroussel
const monCaroussel = new Caroussel('caroussel', tableauCaroussel);
// Prend la fonction d'initialisation du caroussel en lui demandant de  
monCaroussel.evenementCaroussel();

const maCarte = new Map();
maCarte.recupStation(urlAppelJcDecaux);

const myBooking = new Reservation();