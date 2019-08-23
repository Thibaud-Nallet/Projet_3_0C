class Caroussel {
    
    constructor(element, tableaux) {
        this.conteneur = document.getElementById(element);
        this.tableaux = tableaux;
        this.rep = "./images/";
        this.index = 0;
        this.creerElt();
        this.carousselAuto();
    }; //-- constructor --

    //Methode pour créer la structure du DOM permettant l'affichage
    creerElt() {
        //Conteneur de l'image
        const figureElt = document.createElement("figure");
        figureElt.classList.add("figure");
        this.conteneur.appendChild(figureElt);
        //Image
        const imgElt = document.createElement("img");
        imgElt.src = this.rep + this.tableaux[this.index].url;
        imgElt.alt = this.tableaux[this.index].alt;
        imgElt.id = "img";
        //Description
        const figcaptionElt = document.createElement("figcaption");
        figcaptionElt.classList.add("figcaption");
        //Element de la description
        const titreElt = document.createElement("h2");
        titreElt.textContent = this.tableaux[this.index].titre;
        titreElt.id = "titre";
        const pElt = document.createElement("p");
        pElt.textContent = this.tableaux[this.index].texte;
        pElt.id = "texte"
        //Descendance
        figcaptionElt.appendChild(titreElt);
        figcaptionElt.appendChild(pElt);
        figureElt.appendChild(figcaptionElt);
        figureElt.appendChild(imgElt);

        return figureElt;
    }; //-- creerElt --

    //Methode pour afficher la création du DOM
    afficherCaroussel() {
        const imgElt = document.getElementById("img");
        imgElt.src = this.rep + this.tableaux[this.index].url;
        imgElt.alt = this.tableaux[this.index].alt;
        const titreElt = document.getElementById("titre");
        titreElt.innerHTML = this.tableaux[this.index].titre;
        const pElt = document.getElementById("texte");
        pElt.innerHTML = this.tableaux[this.index].texte;
    }; //-- afficherCaroussel --

    //Méthode gérant l'avancée
    avancerCaroussel() {
        this.index++;
        if (this.index > this.tableaux.length - 1) {
            this.index = 0;
        };
        this.afficherCaroussel();
    }; //-- avancerCaroussel --

    //Méthode gérant le recul
    reculerCaroussel() {
        this.index--;
        if (this.index < 0) {
            this.index = this.tableaux.length - 1;
        };
        this.afficherCaroussel();
    }; //-- reculerCaroussel --

    //Méthode gérant le défilement du caroussel
    carousselAuto() {
        this.carousselStop();
        this.defilementCaroussel = setInterval(() => this.avancerCaroussel(), 5000);
    }; //-- carousselAuto --

    //Méthode gérant la fin
    carousselStop() {
        clearInterval(this.defilementCaroussel);
    }; //-- carousselStop --

    //Initialisation des événements
    evenementCaroussel() {
        document.getElementById("left").addEventListener("click", () => this.reculerCaroussel());
        document.getElementById("right").addEventListener("click", () => this.avancerCaroussel());
        document.getElementById("stop").addEventListener("click", () => this.carousselStop());
        document.getElementById("play").addEventListener("click", () => this.carousselAuto());
        document.getElementById("stop").addEventListener("mouseover", () => document.getElementById("infobulle").style.display = "block");
        document.getElementById("stop").addEventListener("mouseout", () => document.getElementById("infobulle").style.display = "none");
        document.getElementById("play").addEventListener("mouseover", () => document.getElementById("infobulle2").style.display = "block");
        document.getElementById("play").addEventListener("mouseout", () => document.getElementById("infobulle2").style.display = "none");
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 39) {
                this.avancerCaroussel();
            } else if (e.keyCode === 37) {
                this.reculerCaroussel();
            }
        });
    }; //-- evenementCaroussel --

} //-- Caroussel --