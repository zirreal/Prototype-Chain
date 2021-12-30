const input = document.querySelector('.input');
const btn = document.querySelector('.btn');
let arr = [];

const getValidate = () => {
    const value = input.value.trim();

    if(window[value]) {
        if(document.querySelector('.error')) {
            document.querySelector('.error').remove();
        }
        input.classList.remove('is-invalid');
        if(typeof window[input.value.trim()] === 'function') {
            const title = `${input.value}: type - ${typeof window[input.value.trim()]}`;
            createList(title);
        } else {
            createList('Без Названия');
        }
    } else {
        if(document.querySelector('.error')) {
            document.querySelector('.error').remove();
        }
        input.classList.add('is-invalid');
        createError();
    }

};


const getProto = (el) => {
    const firstElement = Object.getPrototypeOf(el);
    arr.push(el);
    arr.push(firstElement);
    
    for(let i = 0; i < arr.length; i++) {
        if(Object.getPrototypeOf(arr[arr.length - 1]) !== null)  {
        
            arr.push(Object.getPrototypeOf(arr[arr.length - 1]));
        }  

        if(arr[i].name != '') {
            arr[i] = `${arr[i].name} : ${typeof arr[i]}`;
        } else {
            arr.splice(i,1);
        }
    
        if(typeof arr[i] !== 'string') {
            arr[i] = `${arr[i].constructor.name} : ${typeof arr[i]}`;
        }
    }


    return arr;
}

const createList = (text) => {

    getProto(window[input.value.trim()]);

    if(document.querySelector('.list-group')) {
        document.querySelector('.list-group').remove();
    }

    const list = document.createElement('ol');
    const title = document.createElement('h2');
    
    title.textContent = text;

    list.classList.add('list-group', 'list-group-numbered');
    list.append(title);
    
        if(arr != '') {
            arr.forEach(element => {
                const item = document.createElement('li');
                item.classList.add('list-group-item', 'main-item', 'lead');
                item.innerHTML = `${element}`;

                let el = window[element.split(" ")[0]];
                const  insideList = document.createElement('ol');
                insideList.classList.add('list-group', 'list-group-numbered', 'inside-list');

                for(let i in el.prototype) {
                    const insideItem = document.createElement('li');
                    insideItem.classList.add('list-group-item', 'secondary-item');
                    insideItem.innerHTML = `${i}`;
                    
                    insideList.append(insideItem);
                    item.append(insideList);
                }

                item.addEventListener('click', (e) => {
                    if(e.currentTarget.children.length === 0) {
                        item.classList.add('disabled')
                    } else {
                        e.currentTarget.children[0].classList.toggle('active')
                    }
                })

                list.append(item);

                if(item.textContent === 'null') {
                    item.remove();
                }
            })
        } else return

    document.querySelector('.container').append(list);
}

const createError = () => {
    if(document.querySelector('.list-group')) {
        document.querySelector('.list-group').remove();
    }

    const div = document.createElement('div');
    div.classList.add('error');
    if(!input.value) {
        div.textContent = 'Поля для вводе пустое. Введите значение';
    } else {
        div.textContent = 'Такого класса не существует. Попробуйте ввести другое значение';
    }
    

    document.querySelector('.container').append(div);
}

btn.addEventListener('click', () => {
    getValidate();
    input.value = '';
    arr = [];
})