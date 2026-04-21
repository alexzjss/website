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