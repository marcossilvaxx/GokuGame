const ALTURA_CHAO = 450;
const ALTURA_PULO = 100;
let pontuacao = 0;

class Personagem{
  constructor(objeto, posicaoY){
    this.objeto = objeto;
    this.posicaoY = posicaoY;
    this.posicaoX = objeto.offsetWidth;
    this.pulando = false;
  }
  pular(){
    this.pulando = true;
    this.posicaoY -= ALTURA_PULO;
    this.objeto.style.top = this.posicaoY + "px";
    setTimeout(ok => {
      this.posicaoY = ALTURA_CHAO;
      this.objeto.style.top = this.posicaoY + "px";
      setTimeout(blz => {this.pulando = false;}, 250);
      }, 500);
  }
}
class Obstaculo{
  constructor(){
    this.objeto = null;
  }
  gerarObstaculo(){
    let obstaculos = document.getElementById("obstaculos");
    this.objeto = document.createElement("img");
    obstaculos.appendChild(this.objeto);
    this.tipoImagem = Math.floor(Math.random() * 2 + 1);
    this.objeto.src = "images/obstaculo" + this.tipoImagem + ".png";
    this.objeto.className = "obstaculo";
    setTimeout(doit => {
      this.objeto.style.left = "-300px";
      setTimeout(b => {this.objeto.parentNode.removeChild(this.objeto);}, 2000);
    }, 400);
  }
  pararObstaculo(intO){
    this.objeto.style.left = window.getComputedStyle(this.objeto).left;
    clearInterval(intO);
  }
}

class Cenario{
  constructor(objeto){
    this.objeto = objeto;
    this.posicaoX = 0;
  }

  mover(){
    this.objeto.style.backgroundPositionX = "-1000000px";
  }
  
  parar(){
    this.objeto.style.backgroundPositionX = window.getComputedStyle(this.objeto).backgroundPositionX;
  }
}

function finalizar(){
  c.parar();
  o.pararObstaculo(obs);
  o2.pararObstaculo(obs2);
  o3.pararObstaculo(obs3);
  clearInterval(pontInt);
  let i = document.getElementById("inimigo");
  i.src = "images/freeza.png";
  i.style.width = "9%";
  let pers = document.getElementById("personagem");
  pers.style.transition = "all 0s";
  pers.src = "";
  pers.src = "images/gokussj.gif";
  pers.style.width = "17%";
  pers.style.top = "370px";
  document.getElementsByTagName("body")[0].removeEventListener("keydown", trataTeclado);
  document.getElementById("obstaculos").innerHTML = "";
}

let cenario = document.getElementById("game");

let c = new Cenario(cenario);

c.mover();

let personagem = document.getElementById("personagem");

let p = new Personagem(personagem, ALTURA_CHAO);

let o = new Obstaculo();
let o2 = new Obstaculo();
let o3 = new Obstaculo();

let obs = setInterval(vai => {o.gerarObstaculo();}, 3000);
let obs2 = setInterval(vai => {o2.gerarObstaculo();}, 5000);
let obs3 = setInterval(vai => {o3.gerarObstaculo();}, 6000);

function checarColisao(obj){
  if((parseInt(window.getComputedStyle(obj.objeto).left) < 70 && parseInt(window.getComputedStyle(obj.objeto).left) > -115) && p.pulando == false){
    finalizar();
  }
}
setInterval(checar => {checarColisao(o); checarColisao(o2); checarColisao(o3);},0.1);
pontInt = setInterval(pontuar => {
  pontuacao++;
  document.getElementById("pontuacao").innerHTML = "Pontuação: "+ pontuacao;
}, 166);

function trataTeclado(){
  if(event.keyCode == 38 && !p.pulando){
    p.pular();
  }
}

document.getElementsByTagName("body")[0].addEventListener("keydown", trataTeclado);