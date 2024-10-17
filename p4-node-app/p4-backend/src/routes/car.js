import { Router } from "express";
import Car from "../models/car.js";

const carRouter = Router()

//create car
carRouter.post("/", async (req, res) => {
try {
    const {
        chassis_name,
        power_unit,
        fuel_brand,
        lead_designer
    } = req.body
    const newCar = new Car({
        chassis_name: chassis_name,
        power_unit: power_unit,
        fuel_brand: fuel_brand,
        lead_designer: lead_designer
    })
    await newCar.save()
    res.status(201).json(
        {
            "message": "Car created!"
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

// get all cars
carRouter.get("/", async (req, res) => {
    try {
        const cars = await Car.find({
            _status: "active"
        })
        res.status(200).json(
            {
                data: cars
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

//get 1 car
carRouter.get("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const car = await Car.findById(id)
        res.status(200).json(
            {
                data: car
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

//edit car
carRouter.patch("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const {
            chassis_name,
            power_unit,
            fuel_brand,
            lead_designer
        } = req.body
        const car = await Car.findById(id)
        car.chassis_name = chassis_name
        car.power_unit = power_unit
        car.fuel_brand = fuel_brand
        car.lead_designer = lead_designer

        await car.save()
        res.status(201).json(
            {
                "message": "Car updated!", 
                data: car
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

//delete car
carRouter.delete("/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params
        const car = await Car.findByIdAndUpdate(id, {

            _status: "deleted"

        }, {
            new: true
        })
        await car.save()
        res.status(200).json(
            {
                "message": "Car deleted!", 
                data: car
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


export default carRouter;