class Calculator {
    constructor() {
        this.previousOperandElement = document.querySelector('.previous-operand');
        this.currentOperandElement = document.querySelector('.current-operand');
        this.clear();
        this.isRadians = true;
        this.setupEventListeners();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === '0') return;
        if (this.currentOperand.length === 1) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.slice(0, -1);
        }
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            case 'power':
                computation = Math.pow(prev, current);
                break;
            case 'mod':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    handleFunction(func) {
        const current = parseFloat(this.currentOperand);
        let result;

        switch (func) {
            case 'sin':
                result = this.isRadians ? Math.sin(current) : Math.sin(current * Math.PI / 180);
                break;
            case 'cos':
                result = this.isRadians ? Math.cos(current) : Math.cos(current * Math.PI / 180);
                break;
            case 'tan':
                result = this.isRadians ? Math.tan(current) : Math.tan(current * Math.PI / 180);
                break;
            case 'log':
                result = Math.log10(current);
                break;
            case 'ln':
                result = Math.log(current);
                break;
            case 'sqrt':
                result = Math.sqrt(current);
                break;
            case 'square':
                result = Math.pow(current, 2);
                break;
            case 'factorial':
                result = this.factorial(current);
                break;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'toggle':
                result = current * -1;
                break;
            case 'rad':
                this.isRadians = !this.isRadians;
                return;
        }

        this.currentOperand = result.toString();
    }

    factorial(n) {
        if (n < 0) return NaN;
        if (n === 0) return 1;
        let result = 1;
        for (let i = 1; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    updateDisplay() {
        this.currentOperandElement.textContent = this.currentOperand;
        if (this.operation != null) {
            this.previousOperandElement.textContent = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.textContent = '';
        }
    }

    setupEventListeners() {
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.appendNumber(button.innerText);
                this.updateDisplay();
            });
        });

        document.querySelectorAll('.operator').forEach(button => {
            button.addEventListener('click', () => {
                this.chooseOperation(button.dataset.action);
                this.updateDisplay();
            });
        });

        document.querySelectorAll('.function').forEach(button => {
            button.addEventListener('click', () => {
                this.handleFunction(button.dataset.action);
                this.updateDisplay();
            });
        });

        document.querySelector('.equals').addEventListener('click', () => {
            this.compute();
            this.updateDisplay();
        });

        document.querySelector('.clear').addEventListener('click', () => {
            this.clear();
            this.updateDisplay();
        });

        document.querySelector('.delete').addEventListener('click', () => {
            this.delete();
            this.updateDisplay();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9' || e.key === '.') {
                this.appendNumber(e.key);
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                this.chooseOperation(e.key);
            } else if (e.key === 'Enter' || e.key === '=') {
                e.preventDefault();
                this.compute();
            } else if (e.key === 'Backspace') {
                this.delete();
            } else if (e.key === 'Escape') {
                this.clear();
            }
            this.updateDisplay();
        });
    }
}

const calculator = new Calculator();
