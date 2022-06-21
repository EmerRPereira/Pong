// Variáveis Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro/2;

// Variáveis MovimentoBolinha
let VelocidadeX = 6;
let VelocidadeY = 6;

// Variáveis para as Raquetes
let xRaquete1 = 3;
let yRaquete1 = 160;
let xRaquete2 = 590;
let yRaquete2 = 160;
let xLarguraR = 7;
let yAlturaR = 80;

// Variáveis Movimento Raquete2
let yVelocidade2;
let Erro = 0;

// Variável Colisão
colisao = false;

// Variáveis de SOM
let Raquetada;
let BordaFundo;
let TrilhaSonora;

// Variáveis do Placar
let Placar1 = 0;
let Placar2 = 0;

function preload() {
  Raquetada = loadSound("Sonoridade/Raquetada.wav");
  BordaFundo = loadSound("Sonoridade/Borda.wav");
  TrilhaSonora = loadSound("Sonoridade/TrilhaJogo.wav");
}

function setup() {
  createCanvas(600, 400);
  TrilhaSonora.loop();
}

function draw() {
  background(50, 150, 0);
  Linha();  
  Placar();
  Bolinha();
  MovBolinha();
  BolaBorda();
  Raquete1();
  Raquete2();
  MoveRaquete1();
  MoveRaquete2();
  //ColideRaquete1();
  //ColideRaquete2();
  ColideRaquete(xRaquete1,yRaquete1);
  ColideRaquete(xRaquete2,yRaquete2);
}

function Linha() {
  stroke(255);
  strokeWeight(3);
  line(width/2, 0, width/2, height);
}

function Bolinha() {
  stroke(255, 255, 0);
  fill(255, 255, 0);
  circle(xBolinha, yBolinha, diametro);
}

function MovBolinha() {
  xBolinha += VelocidadeX;
  yBolinha += VelocidadeY;
}

function BolaBorda() {
  if (xBolinha + raio > width || xBolinha < raio) {
    BordaFundo.play();
    Pontuacao();
    VelocidadeX *= -1;
  }
  if (yBolinha + raio > height || yBolinha < raio) {
    VelocidadeY *= -1;
  }
}

function Raquete1() {
  stroke(255,0,0);
  fill(255,0,0);
  rect(xRaquete1,yRaquete1,xLarguraR,yAlturaR);
}

function Raquete2() {
  stroke(255,0,0);
  fill(255,0,0);
  rect(xRaquete2,yRaquete2,xLarguraR,yAlturaR);
}

function MoveRaquete1() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete1 -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yRaquete1 += 5;
  }
}

function MoveRaquete2() {
  yVelRaquete2 = yBolinha - yRaquete2 - yAlturaR/2 + Erro;
  yRaquete2 += yVelRaquete2;
  Erro -= random(-3,3);
  if (Erro>110 || Erro<-110) {
    Erro = 0;
  }
}

//function ColisaoRaquete1() {
//  if (xBolinha-raio < xRaquete1+xLarguraR && yBolinha-raio < yRaquete1+yAlturaR && yBolinha+raio > yRaquete1) {
//    VelocidadeX *= -1;
//   }
//}

//function ColisaoRaquete2() {
//  if (xBolinha-raio < xRaquete2+xLarguraR && yBolinha-raio < yRaquete2+yAlturaR && yBolinha+raio > yRaquete2) {
//    VelocidadeX *= -1;
//   }
//}

function ColideRaquete(m,n) {
  colisao = collideRectCircle(m,n,xLarguraR,yAlturaR,xBolinha,yBolinha,diametro);
  if (colisao) {
    Raquetada.play();
    VelocidadeX *= -1;
  }
}

function Placar() {
  fill(250,150,70);
  rect(235,2,55,23,5);
  rect(310,2,55,23,5);
  textSize(18);
  textAlign(CENTER);
  text(Placar1,263,20);
  text(Placar2,340,20);
}

function Pontuacao() {
  if (xBolinha > 590) {
    Placar1 += 1;
  }
  if (xBolinha < raio) {
    Placar2 += 1;
  }
}