import React, {useEffect, useState} from 'react';
import style from './recipe.module.css'; //to add css module only for this component, will not matter if use same class name

//essentially, passing data from App component's state to Recipe component through props
const Recipe = ({title, calories, image, ingredients}) => { //destructure props with {}
    // State to manage serving size
    const [servingSize, setServingSize] = useState(1);

    // const adjustIngredients = ingredients.map(ingredients => ({
    //     ...ingredients, 
    //     amount: (ingredients.amount *servingSize)
    // }));

    const ingredient_quantity = ingredients.map(ingredient => ({
        quantity: ingredient.quantity
    }));

    const adjusted_quantities = ingredient_quantity.map(item => item.quantity * servingSize);

    // // Log the serving size whenever it changes
    // useEffect(() => {
    //     console.log("Serving Size changed:", servingSize);
    
    //     // Correcting the map function
    //     const ingredient_quantity = ingredients.map(ingredient => ({
    //         quantity: ingredient.quantity
    //     }));

    //     const adjusted_quantities = ingredient_quantity.map(item => item.quantity * servingSize);


    //     console.log("Ingredient_quantity:", ingredients);
    
    // }, [servingSize]);
    

    return(
        <div className={style.recipe}>
            <h1 className="display-4 p-3">{title}</h1>
            <ul>
                {/* Map through the ingredients array */}
                {ingredients.map((ingredient, index) => (
                    <li className="lead" key={ingredient.text}>
                        {/* Display the adjusted quantity, unit, and text */}
                        {adjusted_quantities[index]} {ingredient.text.slice(1)}
                    </li>
                ))}
            </ul>
            <p>Calories: {Math.floor(calories)}g</p>
            <div className= "serving-container">
                <p className="serving-size" style={{ display: 'inline-block', marginRight: '10px' }}>Serving Size</p>
                <input 
                className="number-input" 
                type="number" 
                min="0" 
                max="100" 
                step="1" 
                value={servingSize} 
                onChange={(e) => setServingSize(Number(e.target.value))} style={{ display: 'inline-block' }} 
                />
            </div>
            <img className={style.image} src={image} alt="Cannot display :("/>
        </div>
    );
}

export default Recipe;