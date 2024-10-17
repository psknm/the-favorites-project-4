import { Router } from "express";
import Team from "../models/team.js";

const teamRouter = Router()

//create driver
teamRouter.post("/new", async (req, res) => {
try {
    const {
        team_name, 
        team_country,
        team_color,
        driver1_first_name,
        driver1_last_name,
        driver2_first_name,
        driver2_last_name,
        points,
        years_active,
    } = req.body
    const newTeam = new Team({
        team_name: team_name,
        team_country: team_country,
        team_color: team_color,
        driver1_first_name: driver1_first_name,
        driver1_last_name: driver1_last_name,
        driver2_first_name: driver2_first_name,
        driver2_last_name: driver2_last_name,
        points: points,
        years_active: years_active
    })
    await newTeam.save()
    res.status(201).json(
        {
            "message": "Team profile created!"
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
teamRouter.get("/", async (req, res) => {
    try {
        const teams = await Team.find({
            _status: "active"
        })
        res.status(201).json(
            {
                data: teams
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
teamRouter.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const team = await Team.findById(id)
        res.status(200).json(
            {
                data: team
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
teamRouter.patch("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            team_name, 
            team_country,
            team_color,
            driver1_first_name,
            driver1_last_name,
            driver2_first_name,
            driver2_last_name,
            points,
            years_active,
        } = req.body
        const team = await Team.findById(id)
        team.team_name = team_name,
        team.team_country = team_country,
        team.team_color = team_color,
        team.driver1_first_name = driver1_first_name,
        team.driver1_last_name = driver1_last_name,
        team.driver2_first_name = driver2_first_name,
        team.driver2_last_name = driver2_last_name,
        team.points = points,
        team.years_active = years_active
        await team.save()
        res.status(201).json(
            {
                "message": "Team info updated!", 
                data: team
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
teamRouter.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const team = await Team.findByIdAndUpdate(id, {

            _status: "deleted"

        }, {
            new: true
        })
        await team.save()
        res.status(200).json(
            {
                "message": "Team info deleted!", 
                data: team
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


export default teamRouter;