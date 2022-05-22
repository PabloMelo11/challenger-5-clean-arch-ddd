Testes

1 - Deve reduzir o estoque ao realizar o pedido de um item
2 - Deve aumentar o estoque ao cancelar um pedido

Considere

É possível considerar a utilização SKU (Stock Keeping Unit) na modelagem, mas não é obrigatório
Imagine o estoque como um conjunto de eventos de entrada e saída
Contexto

SKU representa uma unidade em estoque e abrange a variação de tipos de um determinado item, por exemplo, guitarra preta, branca e verde, amplificador 110v e 220v, cabo de 1m, 2m, 3m, 4m e 5m. Apesar de todos eles referenciarem o mesmo item, são variações que podem ser escolhidas na hora da compra e que são fundamentais para o controle do estoque. Outros exemplos inclem camiseta do AC/DC e do Metallica são itens, os tamanhos P, M e G são variações desse item, logo, a SKU considera individualmente cada uma dessas variações.
