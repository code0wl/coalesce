export class AnimationLoop {

    public constructor() {
        this.animationLoop();
    }

    private updateUIEcho() {
        // document.getElementById("uiEchoString").innerHTML =
        //     `<p><b>Selected Object:</b>:</p> 
        //     <ul style="margin:-10px"> 
        //     <li>Id: ${gObjectNum} </li>
        //     <li>Center: ${mAllObjects[gObjectNum].mCenter.x.}
        //     toPrecision(3),
        //     ${mAllObjects[gObjectNum].mCenter.y.toPrecision(3)}</li>
        //     </ul> <hr><p><b>Control</b>: of selected object</p>
        //     <ul style="margin:-10px">
        //     <li><b>Num</b> or <b>Up/Down Arrow</b>:SelectObject</li>
        //     </ul> <hr>
        //     <b>F/G</b>: Spawn [Rectangle/Circle] at random location <hr>;
        //     `
    }

    private draw() {
        //     mContext.clearRect(0, 0, mWidth, mHeight);
        //     for (let i = 0; i < mAllObjects.length; i++) {
        //         mContext.strokeStyle = 'blue';
        //         if (i === gObjectNum)
        //             mContext.strokeStyle = 'red';
        //         mAllObjects[i].draw(mContext);
        //     }
        // 
    }

    private animationLoop() {
        requestAnimationFrame(() => this.animationLoop())
        this.updateUIEcho();
        this.draw();
    }

}