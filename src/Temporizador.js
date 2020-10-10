import React, { Component } from "react"
import "./App.css"

class Temporizador extends Component {
    state = {
        timerLigado: false,
        timerInicio: 0,
        timerTempo: 0,
        parcialCount: 0,
        parcialValue: []
    }

    handleClick = () => {
        this.setState({ parcialCount: this.state.parcialCount + 1 })
        this.setState({ parcialValue: this.state.parcialValue.concat(this.state.timerTempo) })
    }

    getTempo = (tempoTotal) => {
        let centesimos = ("0" + (Math.floor(tempoTotal / 10) % 100)).slice(-2)
        let segundos = ("0" + (Math.floor(tempoTotal / 1000) % 60)).slice(-2)
        let minutos = ("0" + (Math.floor(tempoTotal / 60000) % 60)).slice(-2)
        let horas = ("0" + Math.floor(tempoTotal / 3600000)).slice(-2)

        return ({ centesimos, segundos, minutos, horas })
    }

    iniciarTimer = () => {
        this.setState({
            timerLigado: true,
            timerInicio: Date.now() - this.state.timerTempo,
            timerTempo: this.state.timerTempo
        })

        this.timer = setInterval(() => {
            this.setState({
                timerTempo: Date.now() - this.state.timerInicio
            })
        }, 10)
    }

    pararTimer = () => {
        this.setState({ timerLigado: false })
        clearInterval(this.timer)
    }

    resetTimer = () => {
        this.setState({
            timerInicio: 0,
            timerTempo: 0,
            parcialCount: 0,
            parcialValue: []
        })
    }

    render() {

        const { timerTempo } = this.state;
        let valores = this.getTempo(timerTempo)

        return (
            <div className="Cronometro">
                <div className="Cronometro-header">Cronômetro</div>
                <div className="Cronometro-display">
                    <span>{valores.horas}:</span>
                    <span>{valores.minutos}:</span>
                    <span>{valores.segundos}:</span>
                    <span>{valores.centesimos}</span>
                </div>


                {this.state.timerLigado === false && this.state.timerTempo === 0 && (
                    <button onClick={this.iniciarTimer}>Iniciar</button>
                )}
                {this.state.timerLigado === true && (
                    <button onClick={this.pararTimer}>Pausar</button>
                )}

                {this.state.timerLigado === false && this.state.timerTempo > 0 && (
                    <button onClick={this.iniciarTimer}>Continuar</button>
                )}

            </div>
        )
    }
}

export default Temporizador