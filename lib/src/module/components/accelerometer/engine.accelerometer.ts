export class Accelerometer {

	public bindToObject(object: Object) {
		// bind object to accelerometer
	}

	private forceInput(peripheral: string, coordinates: Object) {
		// isPeripheral active?
		// get x, y stream
		// get mouse end point stream
		// get distance and time stream between mouseup and mouse down
		// the shorter the distance the less force
		// stop stream if mouse or input is offscreen/not on canvas
	}

}