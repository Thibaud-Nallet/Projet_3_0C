class CompteurVelo {

    constructor() {
        this.secondesInitiales = 1200;
        this.secondesVelo = 1200;
        this.intervalVelo = null;
    }; //-- constructor --

    initVelo() {
        sessionStorage.setItem("tempsPasse", this.tempsPasse);
        this.intervalVelo = setInterval(() => this.initDeplacement(), 1000);
    }; //-- initVelo --

    initDeplacement() {
        this.divCadre = document.getElementById("finChrono");
        this.divVelo = document.getElementById("cadreVelo");
        this.vitesse = 1; // Valeur du déplacement en pixels
        // Conversion en nombre du diamètre du ballon (valeur de la forme "XXpx")
        this.tailleDivVelo = parseFloat(getComputedStyle(this.divVelo).width);
        this.deplacementVelo();
    }; //-- initDeplacement --

    deplacementVelo() {
        // Conversion en nombre de la largeur du cadre (valeur de la forme "XXpx")
        const xMax = parseFloat(getComputedStyle(this.divCadre).width);
        const distanceTotaleAParcourir = xMax - this.tailleDivVelo;
        this.tempsPasse = this.secondesVelo--;
        sessionStorage.setItem("tempsPasse", this.tempsPasse);
        const tempsParcouru = this.secondesInitiales - this.tempsPasse;
        const PourcentageDuTempsParcouru = tempsParcouru / (this.secondesInitiales);
        const positionDuVelo = PourcentageDuTempsParcouru * distanceTotaleAParcourir;
        if (tempsParcouru < this.secondesInitiales) {
            this.divVelo.style.left = positionDuVelo + "px";
        } else {
            this.stopperVelo();
        }
    }; //-- deplacementVelo --

    stopperVelo() {
        clearInterval(this.intervalVelo);
        this.secondesVelo = 1200;
        sessionStorage.removeItem("tempsPasse");
    }; //-- stopperVelo --

    relancementVelo() {
        sessionStorage.getItem("tempsPasse");
        this.secondesVelo = sessionStorage.getItem("tempsPasse");
        this.tempsPasse = this.secondesVelo--;
        this.initDeplacement();
    }; //-- relancementChrono --

} //-- velo --