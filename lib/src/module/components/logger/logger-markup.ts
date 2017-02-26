export function generateMarkup(draw) {
    return ` 
 <p><b>Selected Object:</b></p>
            <p style="color: ${draw.color}">Missed rendering frames meter: ${draw.animation.lagTime}</p>
            <ul> 
                <li>Id: ${draw.animation.engine.shapeCollection.selectedObject} </li>
                <li>
                    Center: ${draw.animation.engine.shapeCollection.collection[draw.animation.engine.shapeCollection.selectedObject].center.x.toPrecision(3)},
                    ${draw.animation.engine.shapeCollection.collection[draw.animation.engine.shapeCollection.selectedObject].center.y.toPrecision(3)}
                </li>
                <li>Angle:  ${draw.animation.engine.shapeCollection.collection[draw.animation.engine.shapeCollection.selectedObject].angle.toPrecision(3)} </li>
            </ul> 
            <hr>
            <p>
                <b>Control</b>: of selected object
            </p>
            <ul>
            <li>
                <b>Arrow keys</b> 
                <b>QE</b>: Position [Move + Rotate]
            </li>
            <li>
                <b>key W/ key S</b>:SelectObject</li>
            </ul>
            <p><b>H</b>: Fix object</p>
            <p><b>R</b>: Reset System</p>
            <hr>
            <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>`;
}
