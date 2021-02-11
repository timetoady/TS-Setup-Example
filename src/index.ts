import * as _ from 'lodash';
import './styles.css';

window.addEventListener('load', () => {
    const header = document.createElement('h1');
    header.innerText = 'Webpack and TS are very';

    const body = document.querySelector('body');
    body.appendChild(header);

    const food = [
        {
            id: 0,
            name: 'pizza'
        },
        {
            id: 1,
            name: 'soda'
        },
    ];

    const foodEl = document.createElement('h2');
    foodEl.innerText = _.find(food, {id: 1})?.name;

    body.appendChild(foodEl);

})