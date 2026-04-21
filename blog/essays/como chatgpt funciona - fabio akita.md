https://www.youtube.com/watch?v=O68y0yRZL1Y
https://huggingface.co/ - site com database de diferentes modelos

Um neurônio pode ter cerca de 7K conexões
# Cadeias de Markov
Uma forma de analisar sequências de eventos/estados onde a probabilidade de transicionar entre estados depende apenas de alterar o estado atual, sem considerar os estados anteriores.

Isso ajuda a entender a base da ideia de predições.

Ex.:
from "eu": gosto (1.0)
from "gosto": de (1.0)
from "de": comer (0.5), jogar (0.5)
from "comer": maçãs (1.0)
from "jogar": vôlei (0.5), videogame (0.5)

Um modelo real teria trilhões de possibilidades de frases.
# Parâmetros
Pesos que o modelo aprende com base nos dados recebidos.

**N-Gram**: Sequências de n itens/tokens
Quando um texto é indexado, é mais fácil fazer por grams do que por palavras para encontrar termos semelhantes. Isso serve pros sistemas de autocorreção.

As probabilidades só fazem sentido com a composição completa da rede de pesos (um espaço vetorial multidimensional, como matrizes de n matrizes, um array de N-arrays diferentes)
```
let a = 1
let a = [1,2,3]
let a = [[1,2], [2,3], [3, 4]]
```
um vetor é um tensor de 1 dimensão, uma matriz é um tensor de 2 dimensões, etc.
# RNN - Recurrent Neural Network
rnn foram desenhados para sequências de tamanhos variados como sentenças, processando inputs um passo de cada vez, mas mantendo informações dos espaços anteriores (manter memória durante o aprendizado)
# Gradiente
Gradiente é a derivada da loss-function (função de custo).
A derivada mede a taxa de mudança de uma função, logo, ela diz como o y muda junto do x.

Gradientes de múltiplas variáveis é um vetor que aponta na direção da ascendente mais íngrime da função, importante para algoritmos como o Gradient Descendent (encontrar a função de custo mínimo para otimização de machine learning).
## Loss Function
Uma função que quantifica a discrepância entre resultados previstos com os valores reais da função (treinado pela máquina)

(28min)