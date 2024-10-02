import React from 'react';

const Title = () => {
    return(
        <div className="title container">
            <div className="border rounded m-3 p-5 shadow bg-warning">
                <h1 className="display-1 p-3">Plan Your Next Meal</h1>
                <h3 className="lead">
                    Not sure what recipe to follow for your meal today? Enter your dish and find a bunch of unique recipes all in one place!<br />
                    Explore a treasure trove of tens of thousands of recipes from around the globe, all powered by the Edamam Recipe API! 
                    Enter <strong>ANY</strong> sort of food (e.g.: pasta, chicken enchilada, dumpling, etc.) to see its magic.  
                    <span className="spinner-grow spinner-grow-sm"></span>
                </h3>
            </div>
        </div>
    );
}

export default Title;
