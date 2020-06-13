import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';


class Metronome extends Component {

    constructor(props) {
        super(props);

        this.state= {
            playing: false,
            bpm: 100,
            count: 0,
            beatsPerMeasure: 4
        }
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        this.timer = null;
    }

    handleBpmChange = (event) => {
        const bpm = event.target.value;
        if (this.state.playing) {
            clearInterval(this.timer);
            // Start Playing
            this.timer = setInterval(
                this.playClick,
                // specify timeout in ms for this.playClick to run
                (60 / bpm) * 1000
            )
            this.setState({ bpm });
        } else {
            this.setState({ bpm });
        }
    }

    startStop = () => {
        if (this.state.playing) {
            // to stop 
            clearInterval(this.timer)
            this.setState({
                playing: false
            })
        } else {
            // start playing
            this.timer = setInterval(
                this.playClick,
                // specify timeout in ms for this.playClick to run
                (60 / this.state.bpm) * 1000
            )
            this.setState({
                playing: true
            })
            this.playClick()
        }
    }

    playClick = () => {

        const { count, beatsPerMeasure } = this.state;

        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState({
            count: this.state.count + 1
        })

       
    }

    render() {

        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM </div>
                    <input 
                           type="range" 
                           min="60" 
                           max="240" 
                           value={bpm}
                           onChange={this.handleBpmChange} 
                    />
                </div>
                {/*Using ternary IF playing is true, display 'Stop', if playing is false, display 'Start'*/}
                <button onClick={ this.startStop } > 
                    {playing ? 'Stop' : 'Start'} 
                </button>
            </div>
        )
    }
}

export default Metronome;
