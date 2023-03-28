let nav = 0;

const calendar = document.getElementById('calendar');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function load() {
    calendar.innerHTML = '';

    const dt = new Date();

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();


    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dayString = firstDayOfMonth.toLocaleDateString('en-uk', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    })

    const paddingDays = weekdays.indexOf(dayString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('pt-br', { month: "long" })} ${year}`
    
    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            daySquare.addEventListener('click', () => console.log('click'))
        } else {
            daySquare.classList.add('padding');
        }

        if (i === day + paddingDays && nav === 0) {
            daySquare.setAttribute('id', 'currentDay')
        }

        calendar.appendChild(daySquare);
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    })

    document.getElementById('backButton').addEventListener('click', () => {
        nav--;
        load();
    })
}

initButtons();
load();
