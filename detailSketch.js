let backgroundColor = '#14171C';

let data;
let selectedRow; //x continuare a leggere le righe e non il rank

//disegno libro
let xBook = 500;
let yBook = 130;
let pageWidth = 360;
let pageHeight = 480;

let colorScale = {
  'North America': '#EF6989',
  'Europe': '#4CC9F0',
  'Asia': '#FFD166',
  'Oceania': '#06D6A0',
  'South America': '#B28DFF',
}

async function setup() {

    data = await loadTable("assets/ranking.csv", ",", "header");
    
    let params = getURLParams();

    selectedRow = int(params.row);

    createCanvas(windowWidth, windowHeight);

}

function draw() {

    background(backgroundColor);

    let name = data.getString(selectedRow, "institution name");
    let continent = data.getString(selectedRow, "continent");
    let rank = data.getString(selectedRow, "ranking");
    let location = data.getString(selectedRow, "location full");
    let size = data.getString(selectedRow, "size");
    let score = data.getString(selectedRow, "qs overall score");
    let reputation = data.getNum(selectedRow, "academic reputation");

    

    drawCopertina(colorScale[continent]);
    drawPagina();
    drawPaginaSx(rank, name, location, continent, size, score);
    drawSegnalibro(colorScale[continent]);
    drawRettangoli(xBook + pageWidth + 30, yBook + 80, "Reputazione accademica", reputation, colorScale[continent]);
    
}


function drawPagina() {

    fill("#F3EBDD");
    rect(xBook, yBook, pageWidth, pageHeight);

    fill("#E8DFCF");
    rect(xBook + pageWidth, yBook, pageWidth, pageHeight);

    stroke(0, 60);
    strokeWeight(2);
    line(xBook + pageWidth, yBook, xBook + pageWidth, yBook + pageHeight);

    noStroke();

}

function drawCopertina(colore) {

    noStroke();
    fill(colore);
    rect(xBook - 15, yBook + 8, pageWidth * 2 + 30, pageHeight + 8);

}

function drawPaginaSx(rank, name, location, continent, size, score) {

    fill("#14171C");
    textSize(40);
    text(rank + "ª", xBook + 30, yBook + 70);

    fill("#14171C");
    textSize(16);
    text(name, xBook + 30, yBook + 110);

    fill("#555555");
    textSize(15);
    text(location, xBook + 30, yBook + 160);

    fill("#555555");
    textSize(15);
    text("Continente: " + continent, xBook + 30, yBook + 185);

    fill("#555555");
    textSize(15);
    text("Dimensione campus: " + size, xBook + 30, yBook + 210);

    fill("#14171C");
    textSize(18);
    text("Punteggio QS: " + score, xBook + 30, yBook + pageHeight - 40);

}

function drawSegnalibro(colore) {

    noStroke();
    fill(colore);
    rect(xBook + pageWidth * 2 - 40, yBook - 10, 16, 140);

}

function drawRettangoli(x, y, etichetta, valore, colore) {

    fill("#555555");
    textSize(12);
    text(etichetta, x, y);

    let numRettangoli = 20;
    let numRettangoliPieni = valore / 5;

    let larghezza = 5;
    let altezza = 15;
    let padding = 3;
    let posX = x;

    for (let i = 0; i < numRettangoli; i++) {
        if (i < numRettangoliPieni) {
            noStroke();
            fill(colore);
        } else {
            noFill();
            stroke(colore);
        } 
        rect(posX, y + 6, larghezza, altezza);
        posX += larghezza + padding;
    }

    noStroke();

    fill("#14171C");
    text(valore, posX + 6, y + 19);

}
