const { Router } = require("express")

const router = new Router()
const plantController = require(`../controller/plant_controller`)

router.get('/plant', plantController.getAll)
router.get('/plant/:id', plantController.getOne)



module.exports = router