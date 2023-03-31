let nav = 0;
let clicked = null;

const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const modalBackDrop = document.getElementById('modalBackDrop');
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function openModal(date) {
    clicked = date;
    
    document.getElementById('date').value = clicked;
    
    newEventModal.style.display = 'block';    
    modalBackDrop.style.display = 'block';
}

function closeModal(date) {
    document.getElementById('date').innerHTML = clicked;
    
    newEventModal.style.display = 'none';    
    modalBackDrop.style.display = 'none';
}

async function load() {
    calendar.innerHTML = '';
    
    const dt = new Date();
    
    if (nav !== 0) {
        dt.setDate(1);
        dt.setMonth(new Date().getMonth() + nav);
    }
    
    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const dateString = firstDayOfMonth.toLocaleDateString('en-uk', {
        weekday: 'long',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
    }) // e.g 'wednesday, 1/3/2023'
    
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]); // -> e.g ['wednesday', '1/3/2023'][0] = 'wednesday' -> indexOf('wednesday') = 3 (3 padding days)
    
    document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('pt-br', { month: "long" })} ${year}`
    
    let events = await fetch('http://localhost:8080/getEvents', { method: 'GET' });
    events = await events.json();

    for (let i = 1; i <= paddingDays + daysInMonth; i++) {
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');
                
        const dayString = `${i - paddingDays}/${month + 1}/${year}`
        
        if(i > paddingDays) {
            daySquare.innerText = i - paddingDays;

            const eventForDay = events.find(e => e.day == dayString);
            if(eventForDay) {
                const eventDiv = document.createElement('div');
                eventDiv.classList.add('event');
                if(eventForDay.typeOfEvent === 'Reservado') {
                    daySquare.style.backgroundColor = 'grey';
                    eventDiv.style.backgroundColor = 'black';
                } else if(eventForDay.typeOfEvent === 'Interessado') {
                    daySquare.style.backgroundColor = 'yellow';
                    eventDiv.style.backgroundColor = 'orange';
                }
                eventDiv.innerHTML = eventForDay.typeOfEvent
                daySquare.appendChild(eventDiv);
            }
            
            daySquare.addEventListener('click', () => openModal(dayString));
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
    
    document.getElementById('cancelButton').addEventListener('click', closeModal)
}

initButtons();
load();
