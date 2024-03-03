'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('[data-start]');
const dataPicker = document.querySelector('#datetime-picker');

let userSelectedDate;

button.disabled = true;

const onClose = selectedDates => {
  if (selectedDates[0].getTime() < new Date().getTime()) {
    iziToast.show({
      message: 'Please choose a date in the future.',
      messageColor: 'red',
      position: 'topCenter',
    });
    button.disabled = true;
  } else {
    userSelectedDate = selectedDates[0];
    button.disabled = false;
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

flatpickr(dataPicker, options);

button.addEventListener('click', () => {
  button.disabled = true;
  dataPicker.disabled = true;

  const timeDifferent = userSelectedDate.getTime() - Date.now();
  startTimer(timeDifferent);
});

const addLeadingZero = value => value.toString().padStart(2, '0');

const setDisplayData = ({ days, hours, minutes, seconds }) => {
  const dataDays = document.querySelector('[data-days]');
  const dataHours = document.querySelector('[data-hours]');
  const dataMinutes = document.querySelector('[data-minutes]');
  const dataSeconds = document.querySelector('[data-seconds]');

  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return setDisplayData({ days, hours, minutes, seconds });
};

const startTimer = time => {
  if (time < 0) {
    return;
  }

  convertMs(time);

  setTimeout(() => {
    startTimer(time - 1000);
  }, 1000);

  if (time === 0) {
    dataPicker.disabled = false;
  }
};
