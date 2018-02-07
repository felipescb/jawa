export class Editor {
	constructor(ele) {
		this.selector = ele 
		this.element = document.querySelector(ele)
		this.nonPrintableKeys = ['Shift' , 'Alt', 'Control', 'Dead']
		this.pointer = 0
		this.cursor = 0
		this.begin()
		this.hookKeyboardEvent()
		this.hookMouseEvent()
	}

	begin() {
		var helper = 0
		while(helper != 10) {
			var line = document.createElement("div")
			line.className = 'line '
			line.className += helper
			this.element.appendChild(line)
			helper++
		}
	}

	filterKey(k) {
		if(k == 'Enter') {
			this.pointer += 1
			return true
		} 
		if(this.nonPrintableKeys.indexOf(k) > -1) {
			return true
		}

		return false
	}

	parseWriting(k) {
		if(!this.filterKey(k)) {
			var lineToWrite = this.element.querySelectorAll('.line')[this.pointer]
			lineToWrite.innerHTML = lineToWrite.innerHTML + "<span class='letter'>" + k + "</span>"
		}
	}

	drawCursor() {
		var cursorPos = [this.cursor, this.pointer]
	}

	returnCursorPos() {
	}

	hookMouseEvent() {
		document.addEventListener('click', function(ev) {
			var target = ev.target
			if(target.classList.contains('line')) {
				this.pointer = parseInt(target.className.replace(/[^0-9]/g, ''))
			}
			if(target.classList.contains('letter')) {
				target.className += 'cursor' 
			}
		}.bind(this))
	}

	hookKeyboardEvent() {
		document.addEventListener('keydown', function(ev) {
			var key = ev.key
			this.parseWriting(key)
		}.bind(this))
	}
}
