class Map {

    constructor() {
        this.latLng = [43.6042, 1.4436];
        this.initMap();
    }; //-- constructor --
    
    /* ------------------------------------------------------------------------------ */
    /* --                Initialise la carte ainsi que les marqueurs               -- */
    /* ------------------------------------------------------------------------------ */

    initMap() {
        // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
        this.maCarte = L.map('map').setView(this.latLng, 15);
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(this.maCarte);
    }; //-- initMap --

    recupStation(url) {
        // Appel AJAX
        ajaxGet(url, (reponse) => {
            const stations = JSON.parse(reponse);
            // Boucle d'affichage des marqueurs et des informations
            stations.forEach((station) => {
                //Définition 
                this.latLng = [station.position.lat, station.position.lng];
                const statutStation = station.status;
                const veloRestant = station.available_bikes;
                const adresseStation = station.address;
                const nomStation = station.name;
                const placeDisponible = station.available_bike_stands;
                const veloTotal = station.bike_stands;
                // Créer des icones suivant l'état de remplissage des stations
                const myIcon = this.creerIcone(statutStation, veloRestant);
                // Créer les marqueurs pour toutes les stations existantes
                const marqueur = L.marker(this.latLng, {
                    icon: myIcon
                }).addTo(this.maCarte);
                // Gérér les informations des marqueurs au clic utilisateur 
                marqueur.addEventListener("click", () => {
                    this.clicMarqueur(nomStation, adresseStation, statutStation, veloRestant, veloTotal, placeDisponible);
                    this.cacherCanvas();
                    clearInterval(this.msgAlerte);
                    this.verifLocalStorage();
                    sessionStorage.setItem("nomStation", station.name)
                }); //-- marqueur.addEventListener --
            }); //-- stations.forEach --
        }); //-- ajaxGet --
    }; //-- recupStation --

    creerIcone(statutStation, veloRestant) {
        // Définir un objet icone
        const icone = {
            iconUrl: "./images/libre.png",
            iconSize: [35, 35],
            iconAnchor: [25, 50],
            popupAnchor: [-3, -76],
            padding: "2px",
            backgroundColor: "red"
        }
        // Changer l'url de l'icone suivant le statut de la station
        if (statutStation === "OPEN" && veloRestant <= 0) {
            icone.iconUrl = "./images/complet.png";
        } else if (statutStation === "OPEN" && veloRestant <= 5) {
            icone.iconUrl = "./images/semi.png";
        }
        return L.icon(icone);
    }; //-- creerIcone -- 

    /* ------------------------------------------------------------------------------ */
    /* ----        Gère le click du marqueur et affiche l 'état des stations       -- */
    /* ------------------------------------------------------------------------------ */

    clicMarqueur(nomStation, adresseStation, statutStation, veloRestant, veloTotal, placeDisponible) {
        /*$(marqueur._icon).addClass('selectionMarqueur');*/
        // Affiche la description de la station
        this.afficherDescription(nomStation, adresseStation, statutStation, veloRestant, veloTotal, placeDisponible);
        // Gère le bouton pour la réservation
        const boutonResa = document.getElementById("boutonResa");
        boutonResa.style.display = (statutStation === "OPEN" && veloRestant <= 0) ? 'none' : 'block'; //Instruction if/else en ternaire
    }; //-- clicMarqueur -- 


    afficherDescription(nomStation, adresseStation, statutStation, veloRestant, veloTotal, placeDisponible) {
        document.getElementById("infoStation").style.display = "none";
        const receveur = document.getElementById("description");
        receveur.style.display = "block";
        receveur.innerHTML =
            `<br/> Vous êtes sur la station : <br/> <span class="texteDescription">${nomStation} </span>
                <br/><br/> Elle se situe : <br/> <span class="texteDescription">${adresseStation}</span>
                <br/><br/> Cette station est actuellement : <br/> <span class="texteDescription">${statutStation}</span>
                <br/><br/> Nombres de vélos disponibles : <span class="texteDescription">${veloRestant} / ${veloTotal} </span>
                <br/><br/> Nombres de places disponibles : <span class="texteDescription"> ${placeDisponible}</span>`;
    }; //-- afficherDescription --

    cacherCanvas() {
        const conteneurCanvas = document.getElementById("conteneurCanvas");
        conteneurCanvas.style.display = "none";
    }; //-- restaurerMarqueur --

    verifLocalStorage() {
        const nomLocal = document.getElementById("nom").value;
        const prenomLocal = document.getElementById("prenom").value;
        if (nomLocal !== '' && prenomLocal !== '') {
            document.getElementById("conteneurCanvas").style.display = "block";
        }
        if (sessionStorage.getItem("minutes") > 0) {
            $("#chrono").hide(() => $("#msgAlerte").show());
            this.msgAlerte = setInterval(() => {
                $("#chrono").show();
                $("#msgAlerte").hide();
            }, 10000)
            $(".fa-times-circle").click(() => {
                clearInterval(this.msgAlerte);
                $("#chrono").show();
                $("#msgAlerte").hide();
            }); //-- click --
        } //-- if --
    }; //-- verifLocalStorage --

} //-- Map --