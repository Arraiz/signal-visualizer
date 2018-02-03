let todosList = [];
document.getElementById("submit_btn").addEventListener("click", function () {
    //get value of input
    let input = document.getElementById("todo_input").value;
    todosList.push(input);
    console.log(todosList);
});