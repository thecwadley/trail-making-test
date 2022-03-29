let circles = [];
let titleB = "<b>[Presentation Test]</b> How to take the test: Part B";
let descriptionB =
  "Using your school-issued chromebook's touchscreen feature, connect the dots from number to letter, ascending (1, A, 2, B, 3, etc). Keep your finger on the screen the entire time. If you go to the incorrect circle, it will be indicated.";
let exampleB = "https://drive.google.com/uc?id=1NRbHwhuIqjQDIwqDJN9_KtsjTrF_oVLW";

let titleA = "<b>[Presentation Test]</b> How to take the test: Part A";
let descriptionA = "Using your school-issued chromebook's touchscreen feature, connect the dots from 1 to 2 to 3, etc. Keep your finger on the screen the entire time. If you go to the incorrect circle, it will be indicated.";
let exampleA = "https://drive.google.com/uc?id=1BN4MI4OtGgwPvwML0GSg28n0X2eaP2PI";
function loadPage(result) {
  $("body").show();
  $("canvas").hide();
  $("#continue").click(function () {
    circles = [];
    number = 1;
    setup();
    $("canvas").show();
    startTime = new Date();
    $("#introduction").hide();
  });

  $("#return").click(function () {
    if (testType === "a") {
      $("#return").hide();
      $("#continue").show();

      currentLabels = aLabels;

      testType = "a";
      $("#introduction").show();
      $("#title").html(titleA);
      $("#description").html(descriptionA);
      $("#example").prop("src", exampleA);
      $("#example").show();
      $("canvas").hide();

      $("canvas").remove();
      circles = [];
    } else if (testType === "b") {
      $("#return").hide();
      $("#continue").show();

      currentLabels = bLabels;

      testType = "b";
      $("#introduction").show();
      $("#title").html(titleB);
      $("#description").html(descriptionB);
      $("#example").prop("src", exampleB);
      $("#example").show();
      $("canvas").hide();

      $("canvas").remove();
      circles = [];
    }
  });
}

// Daniel Shiffman
// Code for: https://youtu.be/XATr_jdh-44

let testType = "a";
let number = 1;
let aLabels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52];

let currentLabels = aLabels;

let bLabels = [1, "A", 2, "B", 3, "C", 4, "D", 5, "E", 6, "F", 7, "G", 8, "H", 9, "I", 10, "J", 11, "K", 12, "L", 13, "M", 14, "N", 15, "O", 16, "P", 17, "Q", 18, "R", 19, "S", 20, "T", 21, "U", 22, "V", 23, "W", 24, "X", 25, "Y", 26, "Z"];

function setup() {
  createCanvas(window.innerWidth - 40, window.innerHeight - 192);

  // Lets make sure we don't get stuck in infinite loop
  var protection = 0;

  // Try to get to 500
  while (circles.length < $("#circleNumb").val()) {
    // Pick a random circle
    var circle = {
      x: random(width),
      y: random(height),
      r: 35,
      text: currentLabels[number - 1].toString(),
    };

    let xval = 40 + 50;
    let yval = 100 + 50;

    if (circle.x < xval) {
      circle.x += xval;
    } else if (circle.x > window.innerWidth - xval) {
      circle.x -= xval;
    }

    if (circle.y < yval) {
      circle.y += yval / 3;
    } else if (circle.y > window.innerHeight - yval - 100) {
      circle.y -= yval;
    }

    // Does it overlap any previous circles?
    var overlapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var d = dist(circle.x, circle.y, other.x, other.y);
      if (d < circle.r + other.r + 50) {
        overlapping = true;
      }
    }

    // If not keep it!
    if (!overlapping) {
      circles.push(circle);
      number++;
    }

    // Are we stuck?
    protection++;
    if (protection > 10000) {
      break;
    }
  }

  // Draw all the circles
  for (var i = 0; i < circles.length; i++) {
    fill("#ffffff");
    stroke("#000000");
    strokeWeight(3);
    ellipse(circles[i].x, circles[i].y, circles[i].r * 2, circles[i].r * 2);
    fill("#000000");
    textSize(circles[i].r);

    let disp;

    if (circles[i].text.toString().length == 1) {
      disp = 10;
    } else {
      disp = 20;
    }
    text(circles[i].text, circles[i].x - disp, circles[i].y + 10);
  }

  number = 0;
  loop();
}

function nextPart() {
  if (currentLabels == bLabels) {
    // Finished!!!
  } else {
    number = 1;
    currentLabels = bLabels;
    circles = [];
    $("canvas").remove();
    circles = [];
    //setup();
  }
}

function draw() {
  stroke("#000000");
  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    /* var distance = dist(
         mouseX,
         mouseY,
         circles[number].x,
         circles[number].y
  ); */

    function changeCircle(correct, index) {
      let increase;
      let color;
      if (correct) {
        color = "#00ff00";
      } else if (!correct) {
        color = "#ff0000";
      }

      push();
      fill("#ffffff");
      stroke(color);
      strokeWeight(3);
      ellipse(circles[index].x, circles[index].y, circles[index].r * 2, circles[index].r * 2);
      fill(color);
      textSize(circles[index].r);

      let disp;

      if (circles[index].text.toString().length == 1) {
        disp = 10;
      } else {
        disp = 20;
      }
      text(circles[index].text, circles[index].x - disp, circles[index].y + 10);

      if (correct) {
        number++;
      }

      if (number == circles.length) {
        noLoop();

        let fullTime = new Date() - startTime;

        /*if (currentLabels != bLabels) {
                $("#introduction").show();
                $("#title").html(titleB);
                $("#description").html(descriptionB);
                $("#example").prop("src", exampleB);
                $("canvas").hide();
              }*/

        $("#introduction").show();
        $("#title").html("All Done!");
        $("#continue").hide();
        $("#return").show();
        $("#description").html("Your time was " + fullTime / 1000 + " seconds!");
        $("#example").css("display", "none");
        $("canvas").hide();

        $("canvas").remove();
        circles = [];
        // setup();
      }

      pop();
    }

    let test = true;

    for (let i = 0; i < circles.length; i++) {
      let distance = dist(mouseX, mouseY, circles[i].x, circles[i].y);
      let correct;
      if (i != number && distance < circles[i].r + 5) {
        correct = false;
      } else if (i == number && distance < circles[i].r + 5) {
        correct = true;
      }

      if ((correct === false || correct === true) && i >= number) {
        test = false;
        changeCircle(correct, i);
      }
    }

    //console.log(distance, circles[number].r + 5);
  }
}

var startTime = new Date();

loadPage();

$("#nav-a").click(function () {
  currentLabels = aLabels;

  testType = "a";
  $("#introduction").show();
  $("#title").html(titleA);
  $("#description").html(descriptionA);
  $("#example").prop("src", exampleA);
  $("#example").show();
  $("canvas").hide();

  $("canvas").remove();
  circles = [];
  // setup();
});

$("#nav-b").click(function () {
  console.log("yay");
  currentLabels = bLabels;

  testType = "b";
  $("#introduction").show();
  $("#title").html(titleB);
  $("#description").html(descriptionB);
  $("#example").prop("src", exampleB);
  $("#example").show();
  $("canvas").hide();

  $("canvas").remove();
  circles = [];
  // setup();
});

// https://codepen.io/komarovdesign/pen/PPRbgb

$('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter(".quantity input");
$(".quantity").each(function () {
  var spinner = $(this),
    input = spinner.find('input[type="number"]'),
    btnUp = spinner.find(".quantity-up"),
    btnDown = spinner.find(".quantity-down"),
    min = input.attr("min"),
    max = input.attr("max");

  btnUp.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue >= max) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue + 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });

  btnDown.click(function () {
    var oldValue = parseFloat(input.val());
    if (oldValue <= min) {
      var newVal = oldValue;
    } else {
      var newVal = oldValue - 1;
    }
    spinner.find("input").val(newVal);
    spinner.find("input").trigger("change");
  });
});
