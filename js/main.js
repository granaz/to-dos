/**
 * To do's
 */

var thisStorage = localStorage;

function checkItem(thisItem) {
    var item = $(thisItem).closest("li");

    // Add & Remove Class
    if ($(item).hasClass("list-group-item-success")) {
        $(item).removeClass("list-group-item-success");

        // Remove time
        $(item).find("span").remove();
    } else {
        $(item).addClass("list-group-item-success");

        // Add hour of finishied Task
        var label = $(thisItem).closest("label");

        // Generating Time
        var dateAndTime = new Date().toLocaleString('pt-BR');

        $(label).append("<span class='finished'>(Término: " + dateAndTime + ")</span>");
    }
}

function addItem() {
    var task = prompt("Enter a task name:", "ex.: everyday tasks");

    if(task == "") return false;

    var item = '<li class="list-group-item"><label><input type="checkbox" onclick="checkItem($(this));"> ' + task + '</label></li>';

    $("#ToDoGroup").append(item);
}

function save() {
    var value = $("#ToDoGroup").html();

    // Create cookie
    pushStorage("todo_list", value);
}

function load() {
    var loading = getStorage("todo_list");

    $("#ToDoGroup").html(loading);

    // Check if the item was clicked
    var items = $("#ToDoGroup").find("li");

    for (let i = 0; i < items.length; i++) {
        if ($(items[i]).hasClass("list-group-item-success")) $(items[i]).find("input").attr("checked", true);
    }
}

function pushStorage(name, value) {
    thisStorage.setItem(name, value);
}

function getStorage(name) {
    return thisStorage[name];
}