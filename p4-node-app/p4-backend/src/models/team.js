import {model, Schema} from "mongoose";

const TeamSchema = new Schema({
    team_name: {
        type: String,
        required: true
    },
    team_country: {
        type: String,
        required: true
    },
    team_color: {
        type: String,
    },
    driver1_first_name: {
        type: String,
        required: true
    },
    driver1_last_name: {
        type: String,
        required: true
    },
    driver2_first_name: {
        type: String,
        required: true
    },
    driver2_last_name: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    years_active: {
        type: Number,
        required: true
    },
    _status: {
        type: String,
        default: "active"
    }
})

const Team = model("Team", TeamSchema)

export default Team;