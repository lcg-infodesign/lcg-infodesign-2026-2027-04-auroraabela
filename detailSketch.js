let backgroundColor = '#14171C';

let data;
let selectedRow; //x continuare a leggere le righe e non il rank

let margin = 40;

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
    drawTitolo();
    drawLegenda();

    let name = data.getString(selectedRow, "institution name");
    let continent = data.getString(selectedRow, "continent");
    let rank = data.getString(selectedRow, "ranking");
    let location = data.getString(selectedRow, "location full");
    let size = data.getString(selectedRow, "size");
    let score = data.getNum(selectedRow, "qs overall score");
    let reputation = data.getNum(selectedRow, "academic reputation");

    

    drawCopertina(colorScale[continent]);
    drawPagina();
    drawPaginaSx(rank, name, location, continent, size);
    drawSegnalibro(colorScale[continent]);
    drawRettangoli(xBook + pageWidth + 30, yBook + pageHeight - 160, "Punteggio QS", score, colorScale[continent]);
    drawRettangoli(xBook + pageWidth + 30, yBook + pageHeight - 75, "Reputazione accademica", reputation, colorScale[continent]);
    
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

function drawPaginaSx(rank, name, location, continent, size) {

    fill("#14171C");
    textSize(40);
    text(rank + "ª", xBook + 30, yBook + 70);

    fill("#14171C");
    textSize(16);
    text(name, xBook + 30, yBook + 92, pageWidth - 60); //ultimo valore x far finire il testo e andare a capo

    fill("#555555");
    textSize(15);
    text(location, xBook + 30, yBook + pageHeight - 80);

    fill("#555555");
    textSize(15);
    text("Continente: " + continent, xBook + 30, yBook + pageHeight - 55);

    fill("#555555");
    textSize(15);
    text("Dimensione campus: " + size, xBook + 30, yBook + pageHeight - 30);

}

function drawSegnalibro(colore) {

    noStroke();
    fill(colore);
    rect(xBook + pageWidth * 2 - 40, yBook - 10, 16, 140);

}

function drawRettangoli(x, y, etichetta, valore, colore) {

    fill("#14171C");
    textSize(15);
    text(etichetta, x, y);

    let numRettangoli = 20;
    let numRettangoliPieni = valore / 5;

    let larghezza = 8;
    let altezza = 35;
    let padding = 4;
    let posX = x;

    for (let i = 0; i < numRettangoli; i++) {
        if (i < numRettangoliPieni) {
            noStroke();
            fill(colore);
        } else {
            noFill();
            strokeWeight(1);
            stroke(colore);
        } 
        rect(posX, y + 12, larghezza, altezza);
        posX += larghezza + padding;
    }

    noStroke();

    fill("#14171C");
    textSize(18);
    text(valore, posX + 8, y + 12 + altezza/2 + 6);

}

function drawTitolo() {

    fill("#FFF6E6");
    textSize(32);
    text("L'università", margin, 75);
    
    fill("#8B909A");
    textSize(16);
    text("I punteggi e le sue caratteristiche", margin, 95);

}

function drawLegenda() {

   let xLegenda = margin;
   let yLegenda = yBook + 20;
   
   fill("#E8E6DF");
   textSize(16);
   text("All'interno del libro, consulta le caratteristiche", xLegenda, yLegenda);
   text("dell'Università: rank, nome, Stato di appartenenza", xLegenda, yLegenda + 20);
   text("e dimensione del campus.", xLegenda, yLegenda + 40);
   text("Per punteggi e reputazione, ogni rettangolo pieno", xLegenda, yLegenda + 80);
   text("indica 5 punti, fino ad un totale di 100.", xLegenda, yLegenda + 100);

}
