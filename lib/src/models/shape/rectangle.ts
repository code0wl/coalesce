import { Vector } from '../../module/components/vector/engine.vector';

export interface Rectangle {
    rigidShapeType: string;
    height: number;
    width: number;
    vertexes: Array<Vector>;
    compass: Array<Vector>;
}