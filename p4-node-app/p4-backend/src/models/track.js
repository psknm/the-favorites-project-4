import {model, Schema} from "mongoose";

const TrackSchema = new Schema({
    track_name: {
        type: String,
        required: true
    },
    track_country: {
        type: String,
        required: true
    },
    lap_count_2024: {
        type: String,
        required: true
    },
    turn_count_2024: {
        type: String,
        required: true
    },
    fastest_lap_2024: {
        type: String,
        required: true
    },
    fastest_lap_holder_first_name: {
        type: String,
        required: true
    },
    fastest_lap_holder_last_name: {
        type: String,
        required: true
    },
    is_Sprint: {
        type: Boolean,
        required: true
    },
    pole_first_name: {
        type: String,
        required: true
    },
    pole_last_name: {
        type: String,
        required: true
    },
    winner_first_name: {
        type: String,
        required: true
    },
    winner_last_name: {
        type: String,
        required: true
    },
    p2_first_name: {
        type: String,
        required: true
    },
    p2_last_name: {
        type: String,
        required: true
    },
    p3_first_name: {
        type: String,
        required: true
    },
    p3_last_name: {
        type: String,
        required: true
    },
    _status: {
        type: String,
        default: "active"
    }
})

const Track = model("Track", TrackSchema)

export default Track;