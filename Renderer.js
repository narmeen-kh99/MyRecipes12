class Renderer {
  RenderRecipesOfIngredent = function (data) {
    // empty class of AllRecipes
    $(".AllRecipes").empty();
    let source = $("#IngredentRecipes-template").html();
    const template = Handlebars.compile(source);
    const arrRespicesIN = {
      DataRE: data,
    };
    let newHTML = template(arrRespicesIN);
    $(".AllRecipes").append(newHTML);
  };
}
