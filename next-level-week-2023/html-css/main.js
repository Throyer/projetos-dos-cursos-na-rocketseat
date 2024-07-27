/**
 * @typedef {{pergunta: string; respostas: string[]; correta: number;}} Questao
 */

const perguntas = [
  {
    pergunta: "O que é uma função em JavaScript?",
    respostas: [
      "Um bloco de código projetado para executar uma tarefa específica.",
      "Um tipo de variável que armazena dados.",
      "Uma estrutura de controle que permite repetição."
    ],
    correta: 0
  },
  {
    pergunta: "Qual a forma correta de declarar uma variável em JavaScript?",
    respostas: [
      "var minhaVariavel;",
      "int minhaVariavel;",
      "dim minhaVariavel;"
    ],
    correta: 0
  },
  {
    pergunta: "Qual operador é usado para atribuir um valor a uma variável?",
    respostas: [
      "==",
      "=",
      "==="
    ],
    correta: 1
  },
  {
    pergunta: "Como você escreve 'Hello World' em um alerta?",
    respostas: [
      "alertBox('Hello World');",
      "msg('Hello World');",
      "alert('Hello World');"
    ],
    correta: 2
  },
  {
    pergunta: "Qual a saída de 'typeof NaN'?",
    respostas: [
      "number",
      "NaN",
      "undefined"
    ],
    correta: 0
  },
  {
    pergunta: "Qual o método usado para adicionar um novo elemento ao final de um array?",
    respostas: [
      "push()",
      "pop()",
      "shift()"
    ],
    correta: 0
  },
  {
    pergunta: "Qual declaração é usada para criar uma constante em JavaScript?",
    respostas: [
      "let",
      "const",
      "var"
    ],
    correta: 1
  },
  {
    pergunta: "Qual o resultado de '2' + 2 em JavaScript?",
    respostas: [
      "4",
      "22",
      "NaN"
    ],
    correta: 1
  },
  {
    pergunta: "Como você pode adicionar um comentário em JavaScript?",
    respostas: [
      "// Este é um comentário",
      "/* Este é um comentário */",
      "Ambos estão corretos"
    ],
    correta: 2
  },
  {
    pergunta: "Qual método converte uma string em um número?",
    respostas: [
      "parseFloat()",
      "toString()",
      "parseInt()"
    ],
    correta: 2
  },
];

const quiz = document.querySelector("#quiz");
const template = document.querySelector("template");

/**
 * @type {Set<Questao>}
 */
const corretas = new Set();

const atualizaTotalDeAcertos = () => {
  /**
   * @type {HTMLSpanElement}
   */
  const total = document.querySelector("#acertos span");
  
  total.textContent = `${corretas.size} de ${perguntas.length}`;
}

atualizaTotalDeAcertos();


/**
 * Criar novo elemento
 * @param {Questao} item
 * @param {number} questionIndex
 * @returns {Node} node
 */
const criarElementoHtmlDePergunta = (item, questionIndex) => {
  const { pergunta, respostas, correta } = item;

  const template = document.querySelector("template");

  /**
   * @type {HTMLDivElement}
   */
  const node = template.content.cloneNode(true);

  const h3 = node.querySelector("h3");
  h3.textContent = pergunta

  respostas.forEach((resposta, optionIndex) => {
    /**
     * @type {HTMLElement}
     */
    const dt = node.querySelector("dl dt").cloneNode(true);
    
    const span = dt.querySelector("span");
    const input = dt.querySelector("input");
  
    span.textContent = resposta;
    input.setAttribute('name', `pergunta-${questionIndex}`);
    input.setAttribute('value', optionIndex);

    input.onchange = (event) => {
      const estaCorreta = event.target.value == correta;
      
      corretas.delete(item);
      if (estaCorreta) {
        corretas.add(item);
      }

      atualizaTotalDeAcertos();
    }
  
    node.querySelector("dl").appendChild(dt);
  });

  node.querySelector("dl dt").remove();

  return node;
}

perguntas.forEach((item, index) => quiz.appendChild(criarElementoHtmlDePergunta(item, index)))