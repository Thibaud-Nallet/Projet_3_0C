class Reservation {
    
    constructor() {
        this.boutonChrono = document.getElementById("valider");
        this.chrono = new Chrono(); //Appelle la classe du chrono
        this.velo = new CompteurVelo(); //Appelle la classe du bandeau de reservation
        this.initReservation();
        this.verificationSessionStorage();
    }; //-- constructor --

    initReservation() {
        this.myCanvas = new Canvas(); //Appelle la classe du canvas
        this.afficherCanvas();
        this.lancerChrono();
        this.lancementFormulaire();
        this.annulerChrono();
    }; //-- initResa --

    /* ------------------------------------------------------------------------------ */
    /* --             Gère l'affichage et la verification du canvas                -- */
    /* ------------------------------------------------------------------------------ */

    afficherCanvas() {
        document.getElementById("boutonResa").addEventListener('click', () => {
            document.getElementById("descriptionStation").style.display = "none";
            document.getElementById("conteneurInput").style.display = "block";
        });
    }; //-- afficherCanvas --

    lancementFormulaire() {
        //Methode qui lance la vérification
        const nomElt = document.getElementById("nom");
        const prenomElt = document.getElementById("prenom");
        const canvasElt = document.getElementById("signatureCanvas");
        nomElt.addEventListener("keyup", () => this.verifFormulaire());
        prenomElt.addEventListener("keyup", () => this.verifFormulaire());
        canvasElt.addEventListener("click", () => this.verifCanvas());
    }; //-- lancementFormulaire --

    verifFormulaire() {
        //Methode qui vérifie les éléments et débloque si nécessaire le bouton ou le canvas
        const nomValeur = document.getElementById("nom").value;
        const prenomValeur = document.getElementById("prenom").value;
        if (nomValeur !== '' && prenomValeur !== '') {
            document.getElementById("conteneurCanvas").style.display = "block"; //Affiche le canvas
            this.boutonChrono.disabled = true;
        } else {
            document.getElementById("conteneurCanvas").style.display = "none"
        } //if
    }; //-- verifFormulaire --

    verifCanvas() {
        this.boutonChrono.disabled = false;
    }; //-- verifCanvas --

    /* ------------------------------------------------------------------------------ */
    /* --                   Gère l'affichage du chronomètre                        -- */
    /* ------------------------------------------------------------------------------ */

    lancerChrono() {
        this.boutonChrono.addEventListener("click", () => {
            this.startCompteur = this.chrono.initChrono(); //Lance le décompte du chronomètre
            this.afficherTexteChrono();
            this.myCanvas.cacherCanvas();
            this.afficherVeloCompteur();
        });
    }; //-- lancerChrono --

    afficherTexteChrono() {
        // Recupère la session storage du nom de la station dans son attribut
        this.nomStation = sessionStorage.getItem("nomStation");
        // On cache les différentes parties de la page sauf la section de location
        document.getElementById("aucuneResa").style.display = "none";
        document.getElementById("conteneurInput").style.display = "none";
        document.getElementById("chrono").style.display = "block";
        // Insert le nom et le prenom (localStorage classReservation.lancementFormulaire)
        const nomRecup = document.getElementById("nom").value;
        localStorage.setItem("nomRecup", nomRecup);
        document.getElementById("nomClient").textContent = localStorage.getItem("nomRecup");
        const prenomRecup = document.getElementById("prenom").value;
        localStorage.setItem("prenomRecup", prenomRecup);
        document.getElementById("prenomClient").textContent = localStorage.getItem("prenomRecup");
        // Insert le nom de la station
        document.getElementById("station").innerHTML = sessionStorage.getItem("nomStation");
    }; //-- afficherChrono --

    afficherTexteNoResa() {
        document.getElementById("aucuneResa").style.display = "block";
        document.getElementById("finResa").style.display = "none";
        document.getElementById("annulResa").style.display = "none";
    }; //-- afficherTexteNoResa --

    afficherVeloCompteur() {
        this.velo.initVelo();
        document.getElementById("cadreVelo").style.display = "block";
        document.getElementById("traitRouge").style.display = "block";
        $("#finChrono").css("background-color", "rgba(0,0,0,0)");
    }; //-- afficherVeloCompteur --

    finChrono() {
        document.getElementById("finResa").style.display = "block";
        document.getElementById("chrono").style.display = "none";
        document.getElementById("descriptionStation").style.display = "block";
        document.getElementById("cadreVelo").style.display = "none";
        document.getElementById("traitRouge").style.display = "none";
        $("#finChrono").css("background-color", "white");
    }; //-- finChrono --

    annulerChrono() {
        // Méthode d'annulation d'une réservation
        document.getElementById("boutonAnnuler").addEventListener("click", () => {
            this.boutonChrono.disabled = true; // Désactive le bouton du canvas
            // Fait apparaître le message de confirmation de la suppression
            document.getElementById("annulResa").style.display = "block";
            document.getElementById("chrono").style.display = "none";
            // Le message disparaît après 3 secondes
            setTimeout(() => {
                this.afficherTexteNoResa();
                document.getElementById("descriptionStation").style.display = "block";
                document.getElementById("min").innerHTML = "";
                document.getElementById("sec").innerHTML = "";
            }, 2000);
            // Lance la méthode de fin d'une réservation afin de supprimer les sessions storage et arrêter le compte à rebours
            this.chrono.restaurerChrono();
            clearInterval(this.compteARebour);
            // Annule le deplacement du vélo
            this.velo.stopperVelo();
            clearInterval(this.intervalVelo);
            document.getElementById("cadreVelo").style.display = "none";
            document.getElementById("traitRouge").style.display = "none";
            $("#finChrono").css("background-color", "white");
        });
    }; //-- annulerChrono --

    /* ------------------------------------------------------------------------------ */
    /* --                 Gère l'affichage du sessionStorage                       -- */
    /* ------------------------------------------------------------------------------ */

    // Méthode qui vérifie si une réservation est en cours au lancement de la page et lors du rafraîchissement
    verificationSessionStorage() {
        if (sessionStorage.getItem("minutes") > 0) { // Si une réservation est en cours
            //Affiche le texte et les infos stockés dans le storage
            this.infoStorage();
            this.texteStorage();
            // Relance les comptes à rebours
            this.compteARebour = setInterval(() => this.chrono.relancementChrono(), 1000);
            this.intervalVelo = setInterval(() => this.velo.relancementVelo(), 1000);
        } // if
    }; //-- verificationSessionStorage --

    infoStorage() {
        //Methode pour récuperer tous les éléments du storage
        document.getElementById("nom").value = localStorage.getItem("nomRecup");
        document.getElementById("prenom").value = localStorage.getItem("prenomRecup");
        this.minutes = sessionStorage.getItem("minutes");
        this.secondes = sessionStorage.getItem("secondes");
        this.nomStation = sessionStorage.getItem("nomStation");
        this.nomClient = localStorage.getItem("nomRecup");
        this.prenomClient = localStorage.getItem("prenomRecup");
    }; //-- infoStorage --

    texteStorage() {
        //Methode qui affiche les éléments 
        document.getElementById("cadreVelo").style.display = "block";
        document.getElementById("traitRouge").style.display = "block";
        $("#finChrono").css("background-color", "rgba(0,0,0,0)");
        document.getElementById("infoStation").style.display = "none"; //Bloque l'affichage d'une nouvelle station
        document.getElementById("descriptionStation").style.display = "none";
        document.getElementById("aucuneResa").style.display = "none";
        document.getElementById("nomClient").textContent = this.nomClient;
        document.getElementById("prenomClient").textContent = this.prenomClient;
        document.getElementById("station").textContent = this.nomStation
        document.getElementById("chrono").style.display = "block";
    }; //-- texteStorage --

} // -- reservation --