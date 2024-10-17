import { Router } from "express";
import Track from "../models/track.js";

const trackRouter = Router()

//create driver
trackRouter.post("/", async (req, res) => {
try {
    const {
        track_name,
        track_country,
        lap_count_2024,
        turn_count_2024,
        fastest_lap_2024,
        fastest_lap_holder_first_name,
        fastest_lap_holder_last_name,
        is_Sprint,
        pole_first_name,
        pole_last_name,
        winner_first_name,
        winner_last_name,
        p2_first_name,
        p2_last_name,
        p3_first_name,
        p3_last_name,
    } = req.body
    const newTrack = new Track({
        track_name: track_name,
        track_country: track_country,
        lap_count_2024: lap_count_2024,
        turn_count_2024: turn_count_2024,
        fastest_lap_2024: fastest_lap_2024,
        fastest_lap_holder_first_name: fastest_lap_holder_first_name,
        fastest_lap_holder_last_name: fastest_lap_holder_last_name,
        is_Sprint: is_Sprint,
        pole_first_name: pole_first_name,
        pole_last_name: pole_last_name,
        winner_first_name: winner_first_name,
        winner_last_name: winner_last_name,
        p2_first_name: p2_first_name,
        p2_last_name: p2_last_name,
        p3_first_name: p3_first_name,
        p3_last_name: p3_last_name
    })
    await newTrack.save()
    res.status(201).json(
        {
            "message": "Track details created!"
        }
    )
} catch (error) {
    res.status(400).json(
        {
            "message": error.message
        }
    )
}
})

// get all drivers
trackRouter.get("/", async (req, res) => {
    try {
        const tracks = await Track.find({
            _status: "active"
        })
        res.status(201).json(
            {
                data: tracks
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                "message": error.message
            }
        )
    }
})

//get 1 driver
trackRouter.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const track = await Track.findById(id)
        res.status(200).json(
            {
                data: track
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                "message": error.message
            }
        )
    }
})

//edit driver
trackRouter.patch("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            track_name,
            track_country,
            lap_count_2024,
            turn_count_2024,
            fastest_lap_2024,
            fastest_lap_holder_first_name,
            fastest_lap_holder_last_name,
            is_Sprint,
            pole_first_name,
            pole_last_name,
            winner_first_name,
            winner_last_name,
            p2_first_name,
            p2_last_name,
            p3_first_name,
            p3_last_name,
        } = req.body
        const track = await Track.findById(id)
            track.track_name = track_name,
            track.track_country = track_country,
            track.lap_count_2024 = lap_count_2024,
            track.turn_count_2024 = turn_count_2024,
            track.fastest_lap_2024 = fastest_lap_2024,
            track.fastest_lap_holder_first_name = fastest_lap_holder_first_name,
            track.fastest_lap_holder_last_name = fastest_lap_holder_last_name,
            track.is_Sprint = is_Sprint,
            track.pole_first_name = pole_first_name,
            track.pole_last_name = pole_last_name,
            track.winner_first_name = winner_first_name,
            track.winner_last_name = winner_last_name,
            track.p2_first_name = p2_first_name,
            track.p2_last_name = p2_last_name,
            track.p3_first_name = p3_first_name,
            track.p3_last_name = p3_last_name
        await track.save()
        res.status(201).json(
            {
                "message": "Track details updated!", 
                data: track
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                "message": error.message
            }
        )
    }
    })

//delete driver
trackRouter.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const track = await Track.findByIdAndUpdate(id, {

            _status: "deleted"

        }, {
            new: true
        })
        await track.save()
        res.status(200).json(
            {
                "message": "Track info deleted!", 
                data: track
            }
        )
    } catch (error) {
        res.status(400).json(
            {
                "message": error.message
            }
        )
    }
    })


export default trackRouter;