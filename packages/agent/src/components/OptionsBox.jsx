import React from 'react'

export default function OptionsBox(props) {
    return (<div className="optionsContainer">
        <button>Undo<i className="fas fa-undo"></i></button>
        <button>Redo<i className="fas fa-redo"></i></button>
    </div>)
}