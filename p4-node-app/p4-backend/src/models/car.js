import {model, Schema} from "mongoose";

const CarSchema = new Schema({
    chassis_name: {
        type: String,
        required: true
    },
    power_unit: {
        type: String,
        required: true
    },
    fuel_brand: {
        type: String,
        required: true
    },
    lead_designer: {
        type: String,
        required: true
    },
    _status: {
        type: String,
        default: "active"
    }
})

const Car = model("Car", CarSchema)

export default Car;