

const createMealPlan = require("../Models/mealPlan");


const mealPlan = async (request, response) => {
  try {

    const { userId } = request.params

    const { mealName, ingredients, calories, protein, carbs, fats } = request.body;

    if(!mealName || !ingredients || !calories || !protein || !carbs || !fats){
      return response.status(400).json({message: "All fields are required"})
    }

    const userMealPlan = new createMealPlan({
      userId,
      mealName,
      ingredients,
      nutritionalInfo: {
        calories,
        protein,
        carbs,
        fats,
      }
    })

    await userMealPlan.save();

    return response.status(200).json({
      message: "Successful",
      userMealPlan,
    });
  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
};

const get_meal = async(request, response)=>{
  try {

    const { userId } = request.params

    const userMeal = await createMealPlan.findById( userId )

    if(!userMeal){
      return response.status(400).json({message: "No meal plan found"})
    }
    
    return response.status(200).json({
      message: "successfull",
      userMeal
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const update_meal = async (request, response)=>{
  try {
    
    const {userId} = request.params

    const {mealName, ingredients, calories, protein, carbs, fats} = request.body

    if(!mealName|| !ingredients|| !calories|| !protein|| !carbs|| !fats){
      return response.status(400).json({message: "All field are required"})
    }

    const updatedMeal = await createMealPlan.findByIdAndUpdate (userId,
      {mealName, ingredients, calories, protein, carbs, fats},
      {new: true}
    )

    if(!updatedMeal){
      return response.status(400).json({message: "Meal not found"})
    }

    return response.status(200).json({message: "successfull",
      updatedMeal
    })

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

const deletemeal = async (request, response)=>{
  try {
    const { userId } = request.params

    const deletedMeal = await createMealPlan.findByIdAndDelete(userId)

    return response.status(200).json({message: "Successful"})

  } catch (error) {
    return response.status(500).json({ message: error.message })
  }
}

module.exports = {
  mealPlan,
  get_meal,
  update_meal,
  deletemeal
}