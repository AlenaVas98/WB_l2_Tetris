let overlay = document.querySelector(".overlay");
let modal = document.querySelector(".modal");
let speed = 0;

//проверка на выбор скорости
modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("easy")) {
    speed = 1000;
  } else if (e.target.classList.contains("normal")) {
    speed = 500;
  } else if (e.target.classList.contains("hard")) {
    speed = 200;
  }
  if (e.target.classList.contains("button")) {
    modal.style.display = "none";
    overlay.style.display = "none";
    StartGame();
  }
});

function StartGame() {
  let mainBody = document.createElement("div");
  mainBody.classList.add("mainBody");
  // создание поля для игры
  for (let i = 1; i < 181; i++) {
    let div = document.createElement("div");
    div.classList.add("grid");
    mainBody.appendChild(div);
  }

  let root = document.getElementsByClassName("root")[0];
  root.appendChild(mainBody);

  // добавления координатов для дальнейшего перемещения фигур по ним

  let divs = document.getElementsByClassName("grid");
  let i = 0;
  for (let y = 18; y > 0; y--) {
    for (let x = 1; x < 11; x++) {
      divs[i].setAttribute("posX", x);
      divs[i].setAttribute("posY", y);
      i++;
    }
  }
  // место начала игры
  let x = 5;
  let y = 15;

  let figures = [
    //line
    [
      [0, 1],
      [0, 2],
      [0, 3],
      // 90 degree rotation
      [
        [-1, 1],
        [0, 0],
        [1, -1],
        [2, -2],
      ],
      // 180 degree rotation
      [
        [1, -1],
        [0, 0],
        [-1, 1],
        [-2, 2],
      ],
      // 270 degree rotation
      [
        [-1, 1],
        [0, 0],
        [1, -1],
        [2, -2],
      ],
      // 360 degree rotation
      [
        [1, -1],
        [0, 0],
        [-1, 1],
        [-2, 2],
      ],
    ],
    //square
    [
      [1, 0],
      [0, 1],
      [1, 1],
      // 90 degree rotation
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      // 180 degree rotation
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      // 270 degree rotation
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      // 360 degree rotation
      [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
    ],
    //L
    [
      [1, 0],
      [0, 1],
      [0, 2],

      // 90 degree rotation
      [
        [0, 0],
        [-1, 1],
        [1, 0],
        [2, -1],
      ],
      // 180 degree rotation
      [
        [1, -1],
        [1, -1],
        [-1, 0],
        [-1, 0],
      ],
      // 270 degree rotation
      [
        [-1, 0],
        [0, -1],
        [2, -2],
        [1, -1],
      ],
      // 360 degree rotation
      [
        [0, -1],
        [0, -1],
        [-2, 0],
        [-2, 0],
      ],
    ],
    //L2
    [
      [1, 0],
      [1, 1],
      [1, 2],
      // 90 degree rotation
      [
        [0, 0],
        [0, 0],
        [1, -1],
        [-1, -1],
      ],
      // 180 degree rotation
      [
        [0, -1],
        [-1, 0],
        [-2, 1],
        [1, 0],
      ],
      // 270 degree rotation
      [
        [2, 0],
        [0, 0],
        [1, -1],
        [1, -1],
      ],
      // 360 degree rotation
      [
        [-2, 0],
        [1, -1],
        [0, 0],
        [-1, 1],
      ],
    ],
    // lightning
    [
      [1, 0],
      [-1, 1],
      [0, 1],
      // 90 degree rotation
      [
        [0, -1],
        [-1, 0],
        [2, -1],
        [1, 0],
      ],
      // 180 degree rotation
      [
        [0, 0],
        [1, -1],
        [-2, 0],
        [-1, -1],
      ],
      // 270 degree rotation
      [
        [0, -1],
        [-1, 0],
        [2, -1],
        [1, 0],
      ],
      // 360 degree rotation
      [
        [0, 0],
        [1, -1],
        [-2, 0],
        [-1, -1],
      ],
    ],
    // lightning2
    [
      [1, 0],
      [1, 1],
      [2, 1],
      // 90 degree rotation
      [
        [2, -1],
        [0, 0],
        [1, -1],
        [-1, 0],
      ],
      // 180 degree rotation
      [
        [-2, 0],
        [0, -1],
        [-1, 0],
        [1, -1],
      ],
      // 270 degree rotation
      [
        [2, -1],
        [0, 0],
        [1, -1],
        [-1, 0],
      ],
      // 360 degree rotation
      [
        [-2, 0],
        [0, -1],
        [-1, 0],
        [1, -1],
      ],
    ],
    //triangle
    [
      [1, 0],
      [2, 0],
      [1, 1],
      // 90 degree rotation
      [
        [1, -1],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      // 180 degree rotation
      [
        [0, 0],
        [-1, 0],
        [-1, 0],
        [1, -1],
      ],
      // 270 degree rotation
      [
        [1, -1],
        [1, -1],
        [1, -1],
        [0, 0],
      ],
      // 360 degree rotation
      [
        [-2, 0],
        [0, -1],
        [0, -1],
        [-1, -1],
      ],
    ],
  ];

  let currentFigure = 0;
  let figureBody = 0;
  let rotate = 1;

  // отрисовываем рандомную фигуру
  function createFigure() {
    function getRandom() {
      return Math.round(Math.random() * (figures.length - 1));
    }
    rotate = 1;
    currentFigure = getRandom();
    figureBody = [
      document.querySelector(`[posX="${x}"][posY="${y}"]`),
      document.querySelector(
        `[posX="${x + figures[currentFigure][0][0]}"][posY="${
          y + figures[currentFigure][0][1]
        }"]`
      ),
      document.querySelector(
        `[posX="${x + figures[currentFigure][1][0]}"][posY="${
          y + figures[currentFigure][1][1]
        }"]`
      ),
      document.querySelector(
        `[posX="${x + figures[currentFigure][2][0]}"][posY="${
          y + figures[currentFigure][2][1]
        }"]`
      ),
    ];

    for (let i = 0; i < figureBody.length; i++) {
      figureBody[i].classList.add("figure");
    }
  }
  createFigure();
  let score = 0;
  let boxScore = document.querySelector(".score");
  boxScore.innerHTML = `Ваши очки: ${score}`;

  // создаем логику падения фигур
  function move() {
    let moveFigure = true;
    //создаем фигуру и передаем в неё координаты
    let coordinates = [
      [figureBody[0].getAttribute("posX"), figureBody[0].getAttribute("posY")],
      [figureBody[1].getAttribute("posX"), figureBody[1].getAttribute("posY")],
      [figureBody[2].getAttribute("posX"), figureBody[2].getAttribute("posY")],
      [figureBody[3].getAttribute("posX"), figureBody[3].getAttribute("posY")],
    ];
    // проверяем на падения фигуры
    for (let i = 0; i < coordinates.length; i++) {
      if (
        coordinates[i][1] == 1 ||
        document
          .querySelector(
            `[posX="${coordinates[i][0]}"][posY="${coordinates[i][1] - 1}"]`
          )
          .classList.contains("set")
      ) {
        moveFigure = false;
        break;
      }
    }

    if (moveFigure) {
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove("figure");
      }
      figureBody = [
        document.querySelector(
          `[posX="${coordinates[0][0]}"][posY="${coordinates[0][1] - 1}"]`
        ),
        document.querySelector(
          `[posX="${coordinates[1][0]}"][posY="${coordinates[1][1] - 1}"]`
        ),
        document.querySelector(
          `[posX="${coordinates[2][0]}"][posY="${coordinates[2][1] - 1}"]`
        ),
        document.querySelector(
          `[posX="${coordinates[3][0]}"][posY="${coordinates[3][1] - 1}"]`
        ),
      ];
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.add("figure");
      }
    } else {
      for (let i = 0; i < figureBody.length; i++) {
        figureBody[i].classList.remove("figure");
        figureBody[i].classList.add("set");
      }
      // логика очистки заполненного ряда
      for (let i = 1; i < 15; i++) {
        let count = 0;
        for (let k = 1; k < 11; k++) {
          if (
            document
              .querySelector(`[posX="${k}"][posY="${i}"]`)
              .classList.contains("set")
          ) {
            count++;
            if (count == 10) {
              score += 10;
              boxScore.innerHTML = `Ваши очки: ${score}`;
              for (let m = 1; m < 11; m++) {
                document
                  .querySelector(`[posX="${m}"][posY="${i}"]`)
                  .classList.remove("set");
              }
              let set = document.querySelectorAll(".set");
              let newSet = [];
              for (let s = 0; s < set.length; s++) {
                let setCoordinates = [
                  set[s].getAttribute("posX"),
                  set[s].getAttribute("posY"),
                ];
                if (setCoordinates[1] > i) {
                  set[s].classList.remove("set");
                  newSet.push(
                    document.querySelector(
                      `[posX="${setCoordinates[0]}"][posY="${
                        setCoordinates[1] - 1
                      }"]`
                    )
                  );
                }
              }
              for (let a = 0; a < newSet.length; a++) {
                newSet[a].classList.add("set");
              }
              i--;
            }
          }
        }
      }
      // проверяем на конец игры
      for (let n = 1; n < 11; n++) {
        if (
          document
            .querySelector(`[posX="${n}"][posY="15"]`)
            .classList.contains("set")
        ) {
          clearInterval(interval);
          alert(`Игра закончена! Ваши очки: ${score}`);
          window.location.reload();
          break;
        }
      }
      createFigure();
    }
  }

  // создаем интервал после которого будет запускаться функция
  let interval = setInterval(() => {
    move();
  }, speed);

  // логика передвижения фигур по игровому полю
  window.addEventListener("keydown", function (e) {
    let coordinates1 = [
      figureBody[0].getAttribute("posX"),
      figureBody[0].getAttribute("posY"),
    ];
    let coordinates2 = [
      figureBody[1].getAttribute("posX"),
      figureBody[1].getAttribute("posY"),
    ];
    let coordinates3 = [
      figureBody[2].getAttribute("posX"),
      figureBody[2].getAttribute("posY"),
    ];
    let coordinates4 = [
      figureBody[3].getAttribute("posX"),
      figureBody[3].getAttribute("posY"),
    ];

    let flag = true;
    function getNewState(a) {
      flag = true;
      let figureNew = [
        document.querySelector(
          `[posX="${+coordinates1[0] + a}"][posY="${coordinates1[1]}"]`
        ),
        document.querySelector(
          `[posX="${+coordinates2[0] + a}"][posY="${coordinates2[1]}"]`
        ),
        document.querySelector(
          `[posX="${+coordinates3[0] + a}"][posY="${coordinates3[1]}"]`
        ),
        document.querySelector(
          `[posX="${+coordinates4[0] + a}"][posY="${coordinates4[1]}"]`
        ),
      ];
      for (let i = 0; i < figureNew.length; i++) {
        if (!figureNew[i] || figureNew[i].classList.contains("set")) {
          flag = false;
        }
      }
      if (flag == true) {
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.remove("figure");
        }
        figureBody = figureNew;
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.add("figure");
        }
      }
    }
    if (e.keyCode == 37) {
      getNewState(-1);
    } else if (e.keyCode == 39) {
      getNewState(1);
    } else if (e.keyCode == 40) {
      move();
    } else if (e.keyCode == 38) {
      // логика поворота фигур
      flag = true;
      let figureNew = [
        document.querySelector(
          `[posX="${
            +coordinates1[0] + figures[currentFigure][rotate + 2][0][0]
          }"][posY="${
            +coordinates1[1] + figures[currentFigure][rotate + 2][0][1]
          }"]`
        ),
        document.querySelector(
          `[posX="${
            +coordinates2[0] + figures[currentFigure][rotate + 2][1][0]
          }"][posY="${
            +coordinates2[1] + figures[currentFigure][rotate + 2][1][1]
          }"]`
        ),
        document.querySelector(
          `[posX="${
            +coordinates3[0] + figures[currentFigure][rotate + 2][2][0]
          }"][posY="${
            +coordinates3[1] + figures[currentFigure][rotate + 2][2][1]
          }"]`
        ),
        document.querySelector(
          `[posX="${
            +coordinates4[0] + figures[currentFigure][rotate + 2][3][0]
          }"][posY="${
            +coordinates4[1] + figures[currentFigure][rotate + 2][3][1]
          }"]`
        ),
      ];
      for (let i = 0; i < figureNew.length; i++) {
        if (!figureNew[i] || figureNew[i].classList.contains("set")) {
          flag = false;
        }
      }
      if (flag == true) {
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.remove("figure");
        }
        figureBody = figureNew;
        for (let i = 0; i < figureBody.length; i++) {
          figureBody[i].classList.add("figure");
        }
        if (rotate < 4) {
          rotate++;
        } else {
          rotate = 1;
        }
      }
    }
  });
}
