async function fetchData() {
  try {
    const cocktailLetter = document
      .getElementById("cocktailLetter")
      .value.toLowerCase();
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${cocktailLetter}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const cocktailDisplay = document.getElementById("cocktailDisplay");
    cocktailDisplay.innerHTML = "";
    console.log(data);

    if (data.drinks && data.drinks.length > 0) {
      data.drinks.forEach((drink) => {
        let ingredientsList = "<ul>";
        for (let i = 1; i <= 15; i++) {
          const ingredient = drink["strIngredient" + i];
          const measure = drink["strMeasure" + i];
          if (ingredient) {
            ingredientsList += `<li>${
              measure ? measure : ""
            } ${ingredient}</li>`;
          }
        }
        ingredientsList += "</ul>";
        const drinkItem = document.createElement("div");
        drinkItem.innerHTML = `
                    <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                    <p>${drink.strDrink}</p>
                    ${ingredientsList}
                    <p>${drink.strInstructions}</p>
                `;
        cocktailDisplay.appendChild(drinkItem);
      });
    } else {
      cocktailDisplay.innerHTML =
        "<p>No cocktails found for this letter/number.</p>";
    }
  } catch (error) {
    console.error(error);
  }
}
