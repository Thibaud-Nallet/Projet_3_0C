class Chrono {

    constructor() {
        //Initialisation du temps de decompte
        this.minutes = 20; // Minutes du compte à rebours
        this.secondes = 0; // Secondes du compte à rebours;
    }; //-- constructor --

    /* ------------------------------------------------------------------------------ */
    /* --                       Gère le lancement du chrono                        -- */
    /* ------------------------------------------------------------------------------ */
    
    initChrono() {
        // Mis en place des sessions storage
        sessionStorage.setItem("minutes", this.minutes);
        sessionStorage.setItem("secondes", this.secondes);
        // Lancement du compte à rebours
        this.compteARebours = setInterval(() => this.initCompteur(), 1000);
    }; //-- initChrono --

    initCompteur() {
        if (this.minutes < 10) { // Si il reste moins de 10 minutes, ajoute un 0 devant les minutes
            this.minutesElt = "0" + this.minutes;
        } else {
            this.minutesElt = this.minutes;
        }
        if (this.secondes < 10) { // Si il reste moins de 10 secondes
            this.secondesElt = "0" + this.secondes;
        } else {
            this.secondesElt = this.secondes;
        }
        // Insertion du compte à rebours dans le HTML
        document.getElementById("min").innerHTML = this.minutesElt;
        document.getElementById("min2").innerHTML = this.minutesElt;
        document.getElementById("sec").innerHTML = this.secondesElt;
        document.getElementById("sec2").innerHTML = this.secondesElt;
        // Lance le fonctionnement du compte à rebours
        this.compteurStart();
    }; //-- initCompteur --

    compteurStart() {
        if ((this.minutes >= 0) && (this.secondes > 0)) {
            this.secondes--; // On diminue les secondes
            sessionStorage.setItem("secondes", this.secondes); // Modification de la session storage
        } else if ((this.minutes > 0) && (this.secondes <= 0)) {
            this.secondes = 59;
            this.minutes--;
            sessionStorage.setItem("minutes", this.minutes);
            sessionStorage.setItem("secondes", this.secondes);
        } else if ((this.minutes === 0) && (this.secondes === 0)) {
            myBooking.finChrono();
            // Appel de la méthode "reservationTerminer"
            this.compteAReboursTerminer = setTimeout(() => {
                this.restaurerChrono();
                myBooking.afficherTexteNoResa();
            }, 4000);
        }
    }; //-- compteurStart --

    /* ------------------------------------------------------------------------------ */
    /* --                     Gère la restauration du chrono                       -- */
    /* ------------------------------------------------------------------------------ */

    //Methode appelée au click du bouton Annuler
    restaurerChrono() {
        // Arrêt du compte à rebours
        clearInterval(this.compteARebours);
        /// Reset des attributs du compte à rebours
        this.minutes = 20;
        this.secondes = 0;
        // Suppression de la session storage
        sessionStorage.removeItem('minutes');
        sessionStorage.removeItem('secondes');
        document.getElementById("min").innerHTML = "";
        document.getElementById("sec").innerHTML = "";
        // Arrêt de l'appel à la méthode
        clearTimeout(this.compteAReboursTerminer);
    }; //-- restaurerChrono --

    //Methode de récupération en cas de refresh 
    relancementChrono() {
        sessionStorage.getItem("minutes");
        sessionStorage.getItem("secondes");
        this.minutes = document.getElementById("min").innerHTML = sessionStorage.getItem("minutes");
        this.secondes = document.getElementById("sec").innerHTML = sessionStorage.getItem("secondes");
        this.initCompteur();
    }; //-- relancementChrono --

} //-- chronometre --