const apiManager = new APIManager();
const render = new Renderer();

$("#Search").on("click", () => {
  // check if the check box has clicked (daiary or gluten or both ) => then change the params of get api
  const ingredient = $("#ingredient-input").val();
  let gluten = $("#glutenB").is(":checked");
  let dairy = $("#dairyB").is(":checked");

  if (gluten == true && dairy == false) {
    $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${true}&dairy=${false}`
    ).then((result) => {
      console.log(result);
      render.RenderRecipesOfIngredent(result);
    });
  }
  if (gluten == false && dairy == true) {
    $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${false}&dairy=${true}`
    ).then((result) => {
      console.log(result);
      render.RenderRecipesOfIngredent(result);
    });
  }
  if (dairy == true && gluten == true) {
    $.get(
      `http://localhost:3000/recipes/${ingredient}?gluten=${true}&dairy=${false}`
    ).then((result) => {
      console.log(result);
      render.RenderRecipesOfIngredent(result);
    });
  }
  if (dairy == false && gluten == false) {
    $.get(`http://localhost:3000/recipes/${ingredient}`).then((result) => {
      console.log(result);
      render.RenderRecipesOfIngredent(result);
    });
  }
});
/*$(document).on('click', 'img', function () {
  let firstIngredient = $(this).closest(".recipe").find('ul li').first().text()
  alert(firstIngredient)

});*/
