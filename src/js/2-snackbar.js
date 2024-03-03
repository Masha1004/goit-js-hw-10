
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');

form.addEventListener('submit', evt => {
    evt.preventDefault();

    const promise = new Promise((resolve, reject) => {
        const delay = form.delay.value;
        const state = form.state.value;
    
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`);
            }
        }, delay);
    });

    promise
        .then(value => {
            iziToast.show({
            message: value,
            messageColor: 'green',
            position: 'topCenter',
            });
        })
        .catch(error => {
            iziToast.show({
            message: error,
            messageColor: 'red',
            position: 'topCenter',
            });
        });

    form.reset();
});
