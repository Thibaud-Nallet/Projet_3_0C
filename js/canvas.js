class Canvas {

    constructor() {
        this.trace = [];
        this.canvasElt = document.getElementById("signatureCanvas");
        this.contexte = this.canvasElt.getContext("2d");
        this.contexte.lineWidth = 3; //Taille du pinceau
        this.contexte.strokeStyle = "#b30f18"; //Couleur du pinceau
        this.creerSignature();
        this.gererBouton();
    }; //-- constructor --

    /* ------------------------------------------------------------------------------ */
    /* --                  Crée une signature dans le canvas                       -- */
    /* ------------------------------------------------------------------------------ */

    afficherCanvas() {
        const conteneurCanvas = document.getElementById("conteneurCanvas");
        conteneurCanvas.style.display = "block";
    }; //-- afficherCanvas --

    creerSignature() {
        const canvas = $("#signatureCanvas");
        const contexte = this.contexte;
        canvas.mousedown((event) => {
            event.preventDefault();
            this.trace.push([
                event.pageX - canvas.offset().left,
                event.pageY - canvas.offset().top
            ]);
            canvas.bind("mousemove", (event) => {
                this.trace.push([
                    event.pageX - canvas.offset().left,
                    event.pageY - canvas.offset().top
                ]);
                contexte.beginPath();
                const L = this.trace.length;
                contexte.moveTo(this.trace[L - 2][0], this.trace[L - 2][1]);
                contexte.lineTo(this.trace[L - 1][0], this.trace[L - 1][1]);
                contexte.stroke();
            }).mouseup("mouseup", (event) => {
                event.preventDefault();
                canvas.unbind("mousemove");
            }); //-- mouseup --
        }); //-- mousemove --
    }; //-- creerSignature --

    /* ------------------------------------------------------------------------------ */
    /* --                Met en marche les boutons clear et annuler                -- */
    /* ------------------------------------------------------------------------------ */

    gererBouton() {
        $('#effacer').click(() => this.restaurerCanvas());
        $("#annuler").click(() => {
            $("#descriptionStation").show();
            $("#boutonResa").show();
            this.cacherCanvas();
        });
    }; //-- gererBouton --

    restaurerCanvas() {
        this.contexte.clearRect(0, 0, 400, 200);
        this.trace = [];
        document.getElementById("valider").disabled = true;
    }; //-- restaurerCanvas --

    cacherCanvas() {
        this.restaurerCanvas();
        $("#conteneurInput").hide(500);
    }; //-- cacherCanvas --

} //-- Canvas --