import { Router } from "express";
import Driver from "../models/driver.js";

const driverRouter = Router()

//create driver
driverRouter.post("/new", async (req, res) => {
try {
    const {
        first_name, 
        last_name, 
        broadcast_name, 
        driver_number, 
        birthday, 
        zodiac_sign, 
        country_name, 
        team_name, 
        years_driving, 
        wins_2024, 
        podiums_2024, 
        points_2024
    } = req.body
    const newDriver = new Driver({
        first_name: first_name, 
        last_name: last_name, 
        broadcast_name: broadcast_name, 
        driver_number: driver_number, 
        birthday: birthday, 
        zodiac_sign: zodiac_sign, 
        country_name: country_name, 
        team_name: team_name, 
        years_driving: years_driving, 
        wins_2024: wins_2024, 
        podiums_2024: podiums_2024, 
        points_2024: points_2024
    })
    await newDriver.save()
    res.status(201).json(
        {
            "message": "Driver profile created!"
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
driverRouter.get("/", async (req, res) => {
    try {
        const drivers = await Driver.find({
            _status: "active"
        })
        res.status(201).json(
            {
                data: drivers
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
driverRouter.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const driver = await Driver.findById(id)
        res.status(200).json(
            {
                data: driver
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
driverRouter.patch("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            first_name, 
            last_name, 
            broadcast_name, 
            driver_number, 
            birthday, 
            zodiac_sign, 
            country_name, 
            team_name, 
            years_driving, 
            wins_2024, 
            podiums_2024, 
            points_2024
        } = req.body
        const driver = await Driver.findById(id)
        driver.first_name = first_name,
        driver.last_name = last_name,
        driver.broadcast_name = broadcast_name,
        driver.driver_number = driver_number,
        driver.birthday = birthday,
        driver.zodiac_sign = zodiac_sign,
        driver.country_name = country_name,
        driver.team_name = team_name,
        driver.years_driving = years_driving,
        driver.wins_2024 = wins_2024,
        driver.podiums_2024 = podiums_2024,
        driver.points_2024 = points_2024

        await driver.save()
        res.status(201).json(
            {
                "message": "Driver profile updated!", 
                data: driver
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
driverRouter.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const driver = await Driver.findByIdAndUpdate(id, {

            _status: "deleted"

        }, {
            new: true
        })
        await driver.save()
        res.status(200).json(
            {
                "message": "Driver profile deleted!", 
                data: driver
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


export default driverRouter;