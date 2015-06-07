/// <reference path="../typings/jquery/jquery.d.ts"/>
$(document).ready(function () {

  generateGrid(16);
  var clearButton = $("#clear-button");
  var error = $("#error-message");
  var info = $("#grid-info");
  var input = $("input[type='text']");
  var size = input.val();
  var sizeDisplay = $("#current-size");
  var newButton = $("#new-button");


  clearButton.on("click", function () {
    clear();
  });

  input.keypress(function (e) {
    if (e.keyCode == 13) {
      newGrid();
    }
  });

  newButton.on("click", function () {
    info.fadeIn("fast");
    newGrid();
  });


  $("#double-button").on("click", function () {
    input.val("");
    error.hide();
    if ($(this).text() === "reset") {
      size = 16;
      generateGrid(size);
      $(this).text("double");
      error.hide();
      $("#current-size").text("[16]");
    } else if (size >= 32) {
        $(this).text("reset");
        generateGrid(64);
    } else {
        size = $("tr").length * 2;
        generateGrid(size);
        $("#current-size").text("[" + size + "]");
    }
  });

  function generateGrid(gridSize) {
    $("tbody").empty();
    var table = $("tbody");
    if (gridSize >= 64) {
      gridSize = 64;
      $("#current-size").html("[64]<br>maximum");
    }
    for (var i = 0; i < gridSize; i++) {
      var row = $("<tr></tr>");
      for (var j = 0; j < gridSize; j++) {
        var cell = $("<td></td>");
        row.append(cell);
      }
      table.append(row);
    }
    $("td").on("mouseenter", function () {
      $(this).addClass("filled");
    });
  }

  function clear() {
    $("td").removeClass("filled");
  }

  function newGrid() {
    if ($.isNumeric(input.val())) {
      error.hide();
      if (input.val() > 64) {
        input.val("64");
      }
      size = input.val();
      if (size == $("tr").length) {
        clear();
      } else {
        sizeDisplay.text("[" + size + "]");
        generateGrid(size);
      }
    } else if (input.val() != "") {
      error.show();
    } {

    }
  }
});