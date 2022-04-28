let x = ''; // first number
let y = ''; // secont number
let sign = ''; // знак операции
let finish  = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'X', '/', '%', 'x^y', 'sqrt'];

// экран 
const out = document.querySelector('.calc-screen p');
const out2 = document.querySelector('.calc-result p');

function clearAll () {
    x = ''; // first number and result
    y = ''; // second number 
    sign = ''; // знак
    finish = false;
    out.textContent = 0;
    out2.textContent = x + ' ' + sign + ' ' + y;
}

function clearSecond(){
    y = '';
    finish = false;
    sign = '';
    out.textContent = x;
    out2.textContent = x + ' ' + sign + ' ' + y;
}

function clearlast(){
    if (y ==='' && sign === ''){
        x = x.slice(0, -1);
        out.textContent = x;
        if (x === ''){
            out.textContent = 0;
        }
    } else {
        y = y.slice(0, -1);
        out.textContent = y;
        if (y === ''){
            out.textContent = 0;
        }
    }
    out2.textContent = x + ' ' + sign + ' ' + y;
    console.table(x, y , sign);
}
 
function plusminus(){
    if (y ==='' && sign === '' && x !==''){
        x *= -1;
        out.textContent = x;
    } else {
        out.textContent = 0;
        if (y !== ''){
        y *= -1;
        out.textContent = y;
    } else out.textContent = 0;
    }
    console.table(x, y , sign);
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.ce').onclick = clearSecond;
document.querySelector('.plus-minus').onclick = plusminus;
document.querySelector('.delete').onclick = clearlast;

document.querySelector('.buttons').onclick = (event) => {
    // нажата не кнопка
    if(!event.target.classList.contains('btn')) return;
    // нажата кнопка clearAll ac
    if(event.target.classList.contains('ac')) return;
    // нажата кнопка clearSecond ce
    if(event.target.classList.contains('ce')) return;
    //нажата кнопка plus-minus +/-
    if(event.target.classList.contains('plus-minus')) return;
    // нажата кнопка delete del
    if(event.target.classList.contains('delete')) return;
    out.textContent = '';
    // получаю нажатую кнопку
    const key = event.target.textContent;

    // если нажата клавиша 0-9 или .
    if (digit.includes(key)) {
        if (y ==='' && sign === '') {
            //Проверка на наличие точки в числе x
            if (key ==='.' && x.indexOf('.') > -1 && x !== '') out.textContent = x;   
            //Проверка на остутсвие 0 в начале числа
                else if (key === '0' && x === '0'){
                x = '';
                out.textContent = 0;
            } else {
                if (key !== '.' && x === 0) x = key;
                else if (key === '.' && x === '') x ='0.';
                else if (x.length +1 > 20) x = x;
                else x += key;
                out.textContent = x;
                }         
         
    }
        else if (x!=='' && y!=='' && finish) {
            y = key;
            finish = false;
            out.textContent = y;
        }
        else { 
            //Проверка на наличие точки в числе y
            if (key ==='.' && y.indexOf('.') > -1 && y !== '') out.textContent = y;   
            //Проверка на остутсвие 0 в начале числа
            else if(key === '0' && y === '0'){
                y = '0';
                out.textContent = 0;
            } else {
                if (key !== '.' && y === 0) y = key;
                else if (key === '.' && y === '') y ='0.';
                else if (y.length +1 > 20) y = y;
                else y += key
                out.textContent = y;
                }
        }
        console.table(x, y , sign);
        return;
    }

     // если нажата клавиша + - / *
     if (action.includes(key)) {
        sign = key;
        if (!finish) y = '';
        out.textContent = sign;
        out2.textContent = x + ' ' + sign;
        console.table(x, y , sign);
        return;
    }

    // нажата =
    if (key === '=') {
        if (y ==='') y = x;
        if (x === ''){
            sign = '';
            y = '';
        }
        switch (sign) {
            case "+":
                x = (+x) + (+y);
                break;
            case "-":
                x = x - y;
                break;
            case "X":
                x = x * y;
                break;
            case "/":
                if (y === '0') {
                    out.textContent = 'Ошибка';
                    x = '';
                    y = '';
                    sign = '';
                    return;
                }
                x = x / y;
                break;
            case "%":
                x = x * y / 100;
                break;
            case "x^y":
                x = x ** y;
                break;
            case "sqrt":
                x = Math.sqrt(x);
                break;
        }
        finish = true;
        out.textContent = x;
        out2.textContent = x + ' ' + sign + ' ' + y;
        console.table(x, y , sign);
    }

}