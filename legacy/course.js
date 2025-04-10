const moduleHeaders = document.querySelectorAll(".module-header")
moduleHeaders.forEach((header) => {
	header.addEventListener("click", () => {
		const module = header.parentElement
		module.classList.toggle("active")
	})
})

const form = document.getElementById("email-signup-form")
const emailInput = document.getElementById("email-input")
const messageParagraph = document.getElementById("subscription-message")

form.addEventListener("submit", (event) => {
	event.preventDefault()
	const email = emailInput.value

	if (!validateEmail(email)) {
		showMessage("Please enter a valid email address.", "error")
		return
	}

	setTimeout(() => {
		showMessage("Thank you for subscribing!", "success")
		form.reset()
	})

	function validateEmail(email) {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	}

	function showMessage(message, type) {
		messageParagraph.textContent = message
		messageParagraph.className = ""
		messageParagraph.classList.add(type === "success" ? "success" : "error")
	}
})

const slider = document.querySelector(".testimonial-slider")
const dots = document.querySelectorAll(".dot")
let currentIndex = 0

function showSlide(index) {
	const slideWidth = document.querySelector(".testimonial-item").offsetWidth
	slider.style.transform = `translateX(-${index * slideWidth}px)`

	dots.forEach((dot, i) => {
		dot.classList.toggle("active", i === index)
	})
}

dots.forEach((dot, i) => {
	dot.addEventListener("click", () => showSlide(i))
})

showSlide(currentIndex)