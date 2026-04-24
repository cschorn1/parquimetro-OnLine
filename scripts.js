class Parquimetro {
    constructor() {
        this.tarifas = [
            { valor: 3.00, tempo: 120 },
            { valor: 1.75, tempo: 60 },
            { valor: 1.00, tempo: 30 }
        ];
    }

    calcular(valorPago) {
        if (valorPago < 1) {
            return {
                erro: "Valor insuficiente. Tarifa mínima: R$1,00"
            };
        }

        for (let tarifa of this.tarifas) {
            if (valorPago >= tarifa.valor) {
                return {
                    tempo: tarifa.tempo,
                    troco: (valorPago - tarifa.valor).toFixed(2).replace(".", ",")
                };
            }
        }
    }
}

class UI {
    constructor() {
        this.inputValor = document.getElementById("valorPago");
        this.btnPagar = document.getElementById("pagar");
        this.tempo = document.getElementById("tempoPermanencia");
        this.troco = document.getElementById("troco");
    }

    mostrarResultado(resultado) {
        if (resultado.erro) {
            this.tempo.textContent = resultado.erro;
            this.troco.textContent = "";
            return;
        }

        this.tempo.textContent = `Tempo de permanência: ${resultado.tempo} minutos`;
        this.troco.textContent = `Troco: R$ ${resultado.troco}`;
    }

    obterValor() {
        return Number(this.inputValor.value);
    }
}

class App {
    constructor() {
        this.parquimetro = new Parquimetro();
        this.ui = new UI();

        this.init();
    }

    init() {
        this.ui.btnPagar.addEventListener("click", () => {
            const valor = this.ui.obterValor();

            const resultado = this.parquimetro.calcular(valor);

            this.ui.mostrarResultado(resultado);
        });
    }
}

// Inicializa aplicação
new App();