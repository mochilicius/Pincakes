// Seleciona as seções e links
const homeLink = document.getElementById('HOME');
const saboresLink = document.getElementById('SABORES');
const carrinhoLink = document.getElementById('cart');

const carrinhoSection = document.getElementById('carrinho');
const homeSection = document.getElementById('home');
const saborSection = document.getElementById('cardapio');

// mostra section baseada no URl 
// alterado para nao usar '/' pq nao funciona com back, o arquivo nao reconehce
// o objeto "window" tem as seguintes partes: href, protocol, host, pathname e hash
// o slice vai obter o nosso hash sem o # q vem antes dele, e mudar a página de acordo!!! 
// (˶˃ ᵕ ˂˶) .ᐟ.ᐟ
// fonte: https://developer.mozilla.org/en-US/docs/Web/API/Location
//aliás, adaptei pra ele ja mudar a section nessa mesma função pq tava HORRIVEL e redundante repetir isso 4 vezes seguidas
function manterURL() {
   const hash = window.location.hash.slice(1); 
   if (hash === 'home' || hash === '') {
      homeSection.style.display = 'contents';
      saborSection.style.display = 'none';
      carrinhoSection.style.display = 'none';
   } else if (hash === 'cardapio') {
      homeSection.style.display = 'none';
      saborSection.style.display = 'contents';
      carrinhoSection.style.display = 'none';
   } else if (hash === 'carrinho') {
      homeSection.style.display = 'none';
      saborSection.style.display = 'none';
      carrinhoSection.style.display = 'contents';
   }
}

// Chama a função ao carregar a página
manterURL();

// SISTEMA DE PÁGINAS
//agora usa # e window.location.hash pq a '/' nao deixava usar botão pra voltar
// razão da mudança: permitir o uso de back e forward no mouse 
homeLink.addEventListener('click', function() {
   console.log('Navegando para Home');
   window.location.hash = 'home';
   manterURL();
});

saboresLink.addEventListener('click', function() {
   console.log('Navegando para Sabores');
   window.location.hash = 'cardapio';
   manterURL();
});

carrinhoLink.addEventListener('click', function() {
   console.log('Navegando para Carrinho');
   window.location.hash = 'carrinho';
   manterURL();
});


// Lida com mudanças no hash quando o usuário navega para trás ou para frente
window.addEventListener('hashchange', manterURL);
const botoes = document.querySelectorAll('.comprar');

let carrinho = [];
let carrinhoPreco = [];
let carrinhoTotal = 0;

// SISTEMA DE INDEXAÇÃO (vetores de valor e nome pros outros sistemas funcionarem)
botoes.forEach(comprar => {
  comprar.addEventListener('click', function() {
    const produtoId = this.closest('.produtos').id; // puxa o ID do produto + próximo, ou seja, do clicado
    const produtoPrecoString = this.closest('.produtos').querySelector('.produtoPN').textContent; // puxa o preço
    const produtoPreco = parseFloat(produtoPrecoString); // converte pra float, pro vetor funcionar

    alert(` ${produtoId} (R$${produtoPreco.toFixed(2)}) adicionado ao carrinho!`); //informa o usuário que adicionou ao carrinho  // tirei o cupcake do inicio <3

    carrinho.push(produtoId);
    carrinhoPreco.push(produtoPreco);
    console.log(`Produto com ID ${produtoId} foi clicado.`);

    console.log(carrinho)
    console.log(carrinhoPreco)

    atualizarCarrinho();
  });
});

// SISTEMA VALORES!!

function atualizarCarrinho() {
  let carrinhoTotal = 0
  const listaPrecos = document.getElementById('listaPrecos');
  listaPrecos.innerHTML = ''; //limpa toda vez pra nao duplicar ou ter nenhum problema ne

  //criador de divs!!
  for (let i = 0; i < carrinhoPreco.length; i++) {
    carrinhoTotal += carrinhoPreco[i];
    const produtoDiv = document.createElement('div') // cria uma div nova, como vai ser filho nao precisa dar classe
    console.log(`Div de ${carrinho[i]} aparentemente criado.`)
    produtoDiv.textContent = `${carrinho[i]} --- R$ ${carrinhoPreco[i].toFixed(2)}`
    produtoDiv.id = `prod${i + 1}`;
    listaPrecos.appendChild(produtoDiv) // deixa como filho

    produtoDiv.addEventListener('click', function() {
      removerItemDoCarrinho(i); //ele vai chamar a função de baixo no click, ja com o index dele mesmo
    });
  }

  document.getElementById('total').textContent = `Total: R$ ${carrinhoTotal.toFixed(2)}`;
  console.log(carrinhoTotal)
}

// SISTEMA REMOÇÃO (atrelado ao de criação pq ele atribui um event listener a todos os seus items)
function removerItemDoCarrinho(i) {
  carrinho.splice(i, 1); // remove o nome 
  carrinhoPreco.splice(i, 1); // remove o preço 

  const removida = document.getElementById(`prod${i}`) //ele vai achar a div de nome prod1 prod3 etc baseado no i
  if (removida) {
    removida.remove(); // remove da lista caso ela existe
  }
  
  atualizarCarrinho()
  console.log(`Produto removido: ${carrinho[i]} / R$ ${carrinhoPreco[i].toFixed(2)}`);
  console.log(`Carrinho atualizado: ${carrinho} / R$ ${carrinhoPreco.toFixed(2)}`)
}

let pagamento = document.getElementById('enviar')
pagamento.addEventListener('click', function(event){
  
  const formulario = document.getElementById('forms')

  // verifica se user realmente preencheu (a funcao check validity verifica se tudo ta realmente certo em todos os required)
  if (formulario.checkValidity()) {
    alert(`Pagamento Confirmado!`);
  } else {
    alert(`Preencha seus dados corretamente!`);
  }
});


//teste
// PARTE DO SLIDER ME MAtaNDOOOOO
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }
    document.querySelector('.slides').style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// anotações:
//cookie foi um fracasso, localstorage tambem
//juntar as 3 paginas em uma salvou nossas vidas
// depois da remoção usar atualizarCarrinho
// função: atualizarElementos -> atualiza a lista de produtos adquiridos, seus preços, e o total, se nao ele te mata pq nao sabe oq ta fazendo
// botão de finalizar compra mostra um alerta (sem sistema real de compra) (feito)
// formulario que pede nome sobrenome e email somente (nao permite comprar caso o email seja invalido) (checkValidity) (mais facil doq o esperado)