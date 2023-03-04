class APIManager {
  constructor() {
    this.data = [];
  }
  getData() {
    return [...this.data];
  }
  buildNewURecipes(DataRecipes) {}

  getRecipesOfIngredent() {
    const ingredient = $("#ingredient-input").val();
    return $.get(`http://localhost:3000/recipes/${ingredient}`).then(
      (result) => {
        this.data = result.result;
      }
    );
  }
}
