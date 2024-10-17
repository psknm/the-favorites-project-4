import {model, Schema} from "mongoose";

const DriverSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    broadcast_name: {
        type: String
    },
    driver_number: {
        type: Number,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    zodiac_sign: {
        type: String
    },
    country_name: {
        type: String,
        required: true
    },
    team_name: {
        type: String,
        required: true
    },
    years_driving: {
        type: Number
    },
    wins_2024: {
        type: Number,
        required: true
    },
    podiums_2024: {
        type: Number,
        required: true
    },
    points_2024: {
        type: Number,
        required: true
    },
    _status: {
        type: String,
        default: "active"
    }
})

const Driver = model("Driver", DriverSchema)

export default Driver;