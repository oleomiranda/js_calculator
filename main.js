const display = document.getElementById("display")
const expressionButtons = document.querySelectorAll("#expression")
const equalButton = document.getElementById("equal")
const clearButton = document.getElementById("clear")
const signalButtons = document.querySelectorAll("#signal")
const historyElement = document.getElementById("history")

let signalsReg = new RegExp(/[\+\-\/\*]/)
let windoReg = new RegExp(/[^a-z][0-9\+\/\-\.\*]+/)
let newReg = new RegExp(/[a-zA-Z\<\>\}\{\}\\\'\"\=\_\&\¨\$\#\@\!\[\]\^\~\?\,\:\;\']+/)
var isresult = false // used to check if the value in display is a result or not 

display.addEventListener("keyup", element => {
	display.setAttribute("disabled", "disabled")
	display.value = ""
})

expressionButtons.forEach(btn => {
	btn.addEventListener("click", element => {
		console.log(isresult)
		if (!isresult) {
			display.value += element.target.value // adds the numbers to the scream 
		} else {
			isresult = false
			display.value = element.target.value
		}
	})
})

signalButtons.forEach(btn => {
	btn.addEventListener("click", element => {
		signalsFunction(display, element)
	})
})

clearButton.addEventListener("click", () => { 					//Clean the numbers 
	display.value = ""
})

equalButton.addEventListener("click", () => { 					//calculates the value
	equalFunction(display.value, newReg)
})

window.addEventListener("keyup", event => {
	if (event.key === "Enter") {
		equalFunction(display.value, newReg)
	}
	if (event.key === "Backspace") {
		display.value = display.value.slice(0, -1)
	}
	else if (!newReg.test(event.key)) {
		if (!isresult) {

			let lastChar = display.value.slice(-1)
			let displayvalue = display.value.slice(0, -1)
			
			if (signalsReg.test(lastChar) && signalsReg.test(event.key)) {
				displayvalue += event.key
				display.value = displayvalue
		
			} else {

				display.value += event.key
			
			}
		} else {

			if (signalsReg.test(event.key)) {

				display.value += event.key

			} else {

				display.value = event.key

			}
			isresult = false
		}
	}
})

// --------------------- FUNCTIONS ----------------------

function equalFunction(expression, newReg) {
	isresult = true
	if (!newReg.test(expression)) {
		let result = eval(expression)
		history(expression, result)
		display.value = result
	} else {
		display.value = " "
	}
	console.log(isresult)
}

function signalsFunction(expression, element) {
	console.log(expression.value)
	let displayLastChar = expression.value.slice(-1) //get the last character of display value 
	let dpValue = expression.value //get the display value 

	// check if the last char is a signal so it can replace or not the char

	
	
	if (displayLastChar == "*" || displayLastChar == "+" || displayLastChar == "/" || displayLastChar == "-") {
		displayValue = expression.value.slice(0, -1)
		displayValue += element.target.value
		display.value = displayValue //replaces the signals
	} else {
		display.value += element.target.value //add the signal if the last char wasnt another signal 
	}

}


function history(expression, result) {
	div = document.createElement("div")
	div.innerHTML = `<h3>${expression} = ${result}</h3>`
	historyElement.appendChild(div)
	historyElement.scrollTop = historyElement.scrollHeight
}