// main.js
import { h, render, Component } from 'preact';
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mensajeEntrada: '',
      numColumnas: 1,
      mensajeSalida: '',
    };
  }

  handleCifrar = () => {
    const { mensajeEntrada, numColumnas } = this.state;
    const mensajeCifrado = this.escitalaCifrar(mensajeEntrada, numColumnas);
    this.setState({ mensajeSalida: mensajeCifrado });
  };

  handleDescifrar = () => {
    const { mensajeEntrada, numColumnas } = this.state;
    const mensajeDescifrado = this.escitalaDescifrar(mensajeEntrada, numColumnas);
    this.setState({ mensajeSalida: mensajeDescifrado });
  };

  escitalaCifrar = (mensaje, numColumnas) => {
    const mensajeLimpio = mensaje.replace(/\s/g, '');
    const numRows = Math.ceil(mensajeLimpio.length / numColumnas);
    const grid = new Array(numRows).fill(null).map(() => new Array(numColumnas).fill(" "));

    for (let i = 0; i < mensajeLimpio.length; i++) {
      const fila = Math.floor(i / numColumnas);
      const col = i % numColumnas;
      grid[fila][col] = mensajeLimpio[i];
    }

    let mensajeCifrado = "";

    for (let col = 0; col < numColumnas; col++) {
      for (let fila = 0; fila < numRows; fila++) {
        mensajeCifrado += grid[fila][col];
      }
    }

    return mensajeCifrado;
  };

  escitalaDescifrar = (mensaje, numColumnas) => {
    const numRows = Math.ceil(mensaje.length / numColumnas);
    const grid = new Array(numRows).fill(null).map(() => new Array(numColumnas).fill(" "));

    let k = 0;

    for (let col = 0; col < numColumnas; col++) {
      for (let fila = 0; fila < numRows; fila++) {
        if (k < mensaje.length) {
          grid[fila][col] = mensaje[k++];
        }
      }
    }

    let mensajeDescifrado = "";

    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numColumnas; j++) {
        if (grid[i][j] !== " ") {
          mensajeDescifrado += grid[i][j];
        }
      }
    }

    return mensajeDescifrado;
  };

  render() {
    return (
      <div id="contenedor">
        <h1>Cifrado de Escítala</h1>
        <div class="contenedor-formulario">
          <label for="mensajeEntrada">Mensaje:</label>
          <input
            type="text"
            id="mensajeEntrada"
            placeholder="Mensaje a cifrar/descifrar"
            value={this.state.mensajeEntrada}
            onInput={(e) => this.setState({ mensajeEntrada: e.target.value })}
          />
          <label for="numColumnas">Número de columnas:</label>
          <input
            type="number"
            id="numColumnas"
            placeholder="Número de columnas"
            value={this.state.numColumnas}
            onInput={(e) => this.setState({ numColumnas: parseInt(e.target.value) || 1 })}
          />
          <button onClick={this.handleCifrar}>Cifrar</button>
          <button onClick={this.handleDescifrar}>Descifrar</button>
        </div>
        <div class="contenedor-resultado">
          <label for="mensajeSalida">Resultado:</label>
          <input
            type="text"
            id="mensajeSalida"
            placeholder="Mensaje cifrado/descifrado"
            value={this.state.mensajeSalida}
            readonly
          />
        </div>
      </div>
    );
  }
}

render(<App />, document.body);
