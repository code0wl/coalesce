export class Vector {

    constructor(
        private x: number,
        private y: number) { }

    public lengthCalculation(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public addition(vector): Vector {
        return new Vector(vector.x + this.x, vector.y + this.y);
    }

    public subtraction(vector): Vector {
        return new Vector(vector.x - this.x, vector.y - this.y);
    }

    public scale(nth): Vector {
        return new Vector(this.x * nth, this.y * nth);
    }

    public dot(vector): number {
        return (this.x * vector.x + this.y * vector.y);
    }

    public cross(vector): number {
        return (this.x * vector.y - this.y * vector.x);
    }

    public rotate(center, angle): Vector {
        const r = [];
        const x = this.x - center.x;
        const y = this.y - center.y;
        r[0] = x * Math.cos(angle) - y * Math.sin(angle);
        r[1] = x * Math.sin(angle) + y * Math.cos(angle);
        r[0] += center.x;
        r[1] += center.y;
        return new Vector(r[0], r[1]);
    }

    public normalize(): Vector {
        let len = this.lengthCalculation();
        len = len > 0 ? 1 / len : 0;
        return new Vector(this.x * len, this.y * len);
    }

    public distance(vector): number {
        const x = this.x - vector.x;
        const y = this.y - vector.y;
        return Math.sqrt(x * x + y * y);
    };
}


