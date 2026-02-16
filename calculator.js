          const display = document.getElementById("display");
          const subdisplay = document.getElementById("subvalue");
          const buttons = document.querySelectorAll(".btn");
          const themeSwitch = document.getElementById("themeSwitch")
          let currentValue = "0";
          let previousValue = "";
          let operator = "";
          let resultDisplayed = false;

          function updateDisplay() {
           display.textContent = currentValue;
           subdisplay.textContent = previousValue + "" + operator;
          }

          themeSwitch.addEventListener("change", () => {
            document.body.classList.toggle("light", themeSwitch.checked);
          });
          buttons.forEach((btn) =>{
            btn.addEventListener("click", (e) =>{
              const action = btn.dataset.action;
              const value = btn.dataset.value;
              const rect = btn.getBoundingClientRect();
              btn.style.setProperty("--x", e.clientX - rect.left);
              btn.style.setProperty("--y", e.clientY - rect.top);
              if (!action) {
                if (resultDisplayed) {
                  currentValue = value === "." ? "0." : value;
                  resultDisplayed = false;
                } 
                else {
                  if (value === ".") {
                    if (!currentValue.includes(".")) currentValue += ".";
                   } 
                    else {
                    currentValue = currentValue === "0" ? value : currentValue + value;
                    }
                }
              } 
              else {
                switch (action) {
                  case "clear":
                    currentValue = "0";
                    previousValue = "";
                    operator = "";
                    break;

                  case "plusminus":
                    currentValue = (parseFloat(currentValue) * -1).toString();
                    break;

                  case "percent":
                    currentValue = (parseFloat(currentValue) / 100).toString();
                    break;

                  case "operator":
                    if (previousValue && operator) calculate();
                    operator = value;
                    previousValue = currentValue;
                    currentValue = "0";
                    break;

                  case "equal":
                    calculate();
                    break;
                }
              }

              updateDisplay();
            });
          });

          function calculate() {
          if (!operator || !previousValue) return;

          const prev = parseFloat(previousValue);
          const curr = parseFloat(currentValue);
          let result = 0;

          switch (operator) {
            case "+": result = prev + curr; 
              break;
            case "-": result = prev - curr; 
              break;
            case "×": result = prev * curr; 
              break;
            case "÷": result = curr !== 0 ? prev / curr : "Error";
               break;
          }

          currentValue = result.toString();
          previousValue = "";
          operator = "";
          resultDisplayed = true;
        }
