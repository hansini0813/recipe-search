import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import Title from './Title';
import Footer from './Footer';
import './App.css';


const App = () => {

  //should use env variables...
  const APP_IDR = 'd40c2f29';
  const APP_KEYR = '4330d7b01907e83778c80814e2bd894c';
  const NUTRITION_TYPE = 'logging'; // or 'logging', depending on your use case

  const APP_IDN = 'a7e9b0eb'; 
  const APP_KEYN = '6f6da880a4cb80cb94c9c7e39e32738a';

//If have a counter button, this will log every time you click the button (render), even if page doesn't refresh
//useEffect(something, dependency) --> will run 'something' everytime dependency changes, so put an empty array for no change: only activates on first page load.
//can put counter inside, so every time you click counter button the value changes, and this will log
  // useEffect(() => {
  //   console.log('Effect has been run');
  // }, [])
  
//STATES
                                            //setRecipes(data.hits) will store the API data to 'recipes' state here 
const [recipes, setRecipes] = useState([]); //array because data.hits is an array (check with inspect element)
const [search, setSearch] = useState(""); //state to store user input for search bar, emtpy to begin with
const [query, setQuery] = useState("croissant"); //state to store the final query when press search
const [nutrition, setNutrition] = useState(null); // To store nutrition info


//EFFECTS
//activates on page load, and everytime [] is updated (never lel)
useEffect( () => {
  getRecipes();
  }, [query]);

//making an asynchronous call, 'await' keyword to await call to complete, although lets caller of function continue processing (asynchronous)
//also setting the state: taking the API data and storing in state
const getRecipes = async () => {
                                //after the 'search?' the 'q' signifies query: whatever is after it = what we're seraching for.
                                //JavaScript Template Literals: use back ticks (the button besides number 1) instead of strings: allow interpolation with what's inside ${}
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_IDR}&app_key=${APP_KEYR}`); //change the elements in the query to match ur ID and KEY + query
  const data = await response.json();
  console.log(data.hits); //pulling the 'hits' object (array) from the whole json object (it's where it contains the recipes)
  setRecipes(data.hits); //setting the hits array in our state above (recipe variable)
}

const extractIngredients = (recipe) => {
  return recipe.map(ingredient => ingredient.text);
};

const getNutrients = async (ingredients) => {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-details?app_id=${APP_IDN}&app_key=${APP_KEYN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Recipe Nutrition Analysis',
          ingr: ingredients,
        }),
      }
    );

    // Check if the response is okay (status code in the range 200-299)
    if (!response.ok) {
      console.error('Failed to fetch nutrition data:', response.status, response.statusText);
      return; // Exit if the response is not okay
    }

    const data = await response.json();
    console.log('Nutritional data response:', data); // Log the full API response

    // Check if the necessary data is present
    if (data.calories) {
      console.log('Calories:', data.calories); // Log calories
    } else {
      console.warn('Calories not found in the response.');
    }

    if (data.totalWeight) {
      console.log('Total Weight:', data.totalWeight); // Log total weight
    } else {
      console.warn('Total Weight not found in the response.');
    }

    setNutrition(data); // Set the nutrition data in state
};

//updating 'search' state with the onChange event target value
const updateSearch = (e) => {
  setSearch(e.target.value);
  console.log(search);
}

// Function to handle nutrient fetching for a specific recipe
const handleFetchNutrients = (recipe) => {
    const ingredients = extractIngredients(recipe.recipe.ingredients); // Extract ingredients from the recipe
    getNutrients(ingredients); // Pass the extracted ingredients to getNutrients
};

//updating query when click on search
const getSearch = (e) => {
  e.preventDefault(); //prevent page refresh when pressing submit
  setQuery(search);
  setSearch("");
}

//changing search button on mouse over and out
const buttonOver = (e) => {
  e.target.innerHTML = "Go!";
}

const buttonOut = (e) => {
  e.target.innerHTML = "Search";
}

// Function to handle popular search buttons (e.g., Pasta, Sandwiches)
const handlePopularSearch = (searchTerm) => {
    setQuery(searchTerm); // Update query with popular search term
  };

  return(
    <div className="App">
      <Title />
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" placeholder="Enter your favourite dish, I'm sure we have it! :)" value={search} onChange={updateSearch}/> {/*passes the onChange event to updateSearch, it needs to be here so can retrieve input value (as opposed to button)*/}
        <button className="search-button" type="submit" onMouseOver={buttonOver} onMouseOut={buttonOut}>Search</button>
      </form>
      {/* Popular Search Buttons */}
      <div className="popular-searches">
        <h2>Popular Searches</h2>
        <button onClick={() => handlePopularSearch('pasta')}>Pasta</button>
        <button onClick={() => handlePopularSearch('sandwiches')}>Sandwiches</button>
        <button onClick={() => handlePopularSearch('salad')}>Salad</button>
        <button onClick={() => handlePopularSearch('pizza')}>Pizza</button>
      </div>

    {/* Recipe results */}
    <div className="recipe">
    {recipes.map(recipe => ( 
        <div key={recipe.recipe.label}> {/* Wrap Recipe and Button in a parent element */}
        <Recipe 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients} 
        />
        <button onClick={() => handleFetchNutrients(recipe)}>Get Nutrients</button> {/* Button to fetch nutrients */}
        </div>
    ))}
    </div>
    {nutrition && (
    <div className="nutrition-info">
        <h2>Nutrition Facts</h2>
        <h4>Amount Per Serving</h4>
        <p>Calories: {nutrition.calories}</p>
        <p>Total Fat: {nutrition.totalNutrients.FAT.quantity} g ({nutrition.totalNutrients.FAT.percentOfDailyNeeds} %)</p>
        <p>Saturated Fat: {nutrition.totalNutrients.FASAT.quantity} g ({nutrition.totalNutrients.FASAT.percentOfDailyNeeds} %)</p>
        <p>Trans Fat: {nutrition.totalNutrients.FATRN.quantity} g</p>
        <p>Cholesterol: {nutrition.totalNutrients.CHOLE.quantity} mg ({nutrition.totalNutrients.CHOLE.percentOfDailyNeeds} %)</p>
        <p>Sodium: {nutrition.totalNutrients.NA.quantity} mg ({nutrition.totalNutrients.NA.percentOfDailyNeeds} %)</p>
        <p>Total Carbohydrate: {nutrition.totalNutrients.CHOCDF.quantity} g ({nutrition.totalNutrients.CHOCDF.percentOfDailyNeeds} %)</p>
        <p>Dietary Fiber: {nutrition.totalNutrients.FIBTG.quantity} g ({nutrition.totalNutrients.FIBTG.percentOfDailyNeeds} %)</p>
        <p>Total Sugars: {nutrition.totalNutrients.SUGAR.quantity} g</p>
        <p>Includes - Added Sugars: {nutrition.totalNutrients.SUGAR.addedSugars || 0} g</p>
        <p>Protein: {nutrition.totalNutrients.PROCNT.quantity} g ({nutrition.totalNutrients.PROCNT.percentOfDailyNeeds} %)</p>
        <p>Vitamin D: {nutrition.totalNutrients.VITD.quantity} µg ({nutrition.totalNutrients.VITD.percentOfDailyNeeds} %)</p>
        <p>Calcium: {nutrition.totalNutrients.CA.quantity} mg ({nutrition.totalNutrients.CA.percentOfDailyNeeds} %)</p>
        <p>Iron: {nutrition.totalNutrients.FE.quantity} mg ({nutrition.totalNutrients.FE.percentOfDailyNeeds} %)</p>
        <p>Potassium: {nutrition.totalNutrients.K.quantity} mg ({nutrition.totalNutrients.K.percentOfDailyNeeds} %)</p>
    </div>
    )}

      <Footer />
    </div>
  );
}

export default App;