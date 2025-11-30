// BURGER MENU
const burgerIcon = document.getElementById('burger-icon');
const burgerMenu = document.getElementById('burger-menu');
const burgerLine1 = document.getElementById('burger-line1');
const burgerLine2 = document.getElementById('burger-line2');
const burgerLine3 = document.getElementById('burger-line3');

// Функция для возврата иконки в исходное состояние
function resetBurgerIcon() {
    burgerLine2.style.opacity = '1';
    burgerLine1.style.transform = 'initial';
    burgerLine3.style.transform = 'initial';
}

// Обработчик клика на иконку бургер-меню
burgerIcon.addEventListener('click', () => {
    burgerMenu.classList.toggle('hidden');

    const isMenuHidden = burgerMenu.classList.contains('hidden');

    if (!isMenuHidden) {
        burgerLine2.style.opacity = '0';
        burgerLine1.style.transform = 'rotate(45deg) translate(10px, 3px)';
        burgerLine3.style.transform = 'rotate(-45deg) translate(10px, -3px)';
    } else {
        resetBurgerIcon();
    }
});

// Обработчик кликов по ссылкам внутри меню
const menuLinks = document.querySelectorAll('#burger-menu a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.add('hidden');
        resetBurgerIcon(); // Возвращаем иконку в исходное состояние
    });
});

// Обработчик клика вне меню
document.addEventListener('click', (event) => {
    if (
        !burgerMenu.contains(event.target) &&
        event.target !== burgerIcon &&
        !burgerIcon.contains(event.target)
    ) {
        burgerMenu.classList.add('hidden');
        resetBurgerIcon(); // Возвращаем иконку в исходное состояние
    }
});

// PASSENGER COUNTER
const counterText = document.querySelector('.passenger-number');
const counterButton = document.querySelectorAll('.passenger-button');
let counter = 1;

counterButton.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        if (index === 0 && counter > 1) {
            counter -= 1;
        } else if (index === 1 && counter < 12) {
            counter += 1;
        }
        counterText.textContent = counter;
    });
});

// DROPDOWN
const STATIONS = [
// Switzerland
    "Zermatt Bus Terminal",
    "Interlaken Ost Bus Station",
    "Grindelwald Bus Terminal",
    "Lauterbrunnen Bahnhof",
    "Lucerne Bahnhofquai",
    "Chamonix-Mont-Blanc Sud (France, near Swiss border)",
    "Geneva Bus Station",
    "Bern PostAuto Terminal",
    "Gstaad Bus Station",
    "St. Moritz Bahnhof PostAuto",
    "Verbier Village",
    "Davos Platz Postautohaltestelle",
    "Andermatt Gotthardpass",
    "Täsch Bahnhof (Shuttle to Zermatt)",
    "Flims Dorf Post",

// France
    "Chamonix Sud Bus Station",
    "Annecy Gare Routière",
    "Grenoble Gare Routière",
    "Nice Airport (Bus to Alps)",
    "Bourg-Saint-Maurice Gare Routière",
    "Morzine Gare Routière",
    "Les Gets Gare Routière",
    "Val d'Isère Centre",
    "Courchevel 1850",
    "Megève Place du Village",

// Italy
    "Aosta Autostazione",
    "Bolzano Autostazione",
    "Trento Autostazione",
    "Cortina d'Ampezzo Autostazione",
    "Bormio Bus Station",
    "Livigno Centro",
    "Merano Autostazione",
    "Sestriere Bus Stop",
    "Ortisei (St. Ulrich) Autostazione",
    "Canazei Piazza Marconi",

// Austria
    "Innsbruck Hauptbahnhof Bus Terminal",
    "Salzburg Süd Busbahnhof",
    "Mayrhofen Bahnhof",
    "Lech am Arlberg Postamt",
    "Kitzbühel Hahnenkammbahn",
    "Ischgl Seilbahn",
    "Zell am See Postplatz",
    "Bad Gastein Bahnhof",
    "St. Anton am Arlberg Bahnhof",
    "Sölden Postamt",

// Germany
    "Garmisch-Partenkirchen Bahnhof (Bus Station)",
    "Berchtesgaden Busbahnhof",
    "Oberstdorf Busbahnhof",
    "Füssen Bahnhof (Bus Station)",
    "Mittenwald Bahnhof (Bus Station)",

// Slovenia
    "Bled Bus Station",
    "Bohinj Jezero",
    "Kranjska Gora Avtobusna Postaja"
];

function setupAutocomplete(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    input.addEventListener('focus', (event) => {
        list.classList.remove('hidden');
        const value = event.target.value;
        renderStations(value);
    });

    input.addEventListener('blur', () => {
        list.classList.add('hidden');
    });

    input.addEventListener('keyup', (event) => {
        const value = event.target.value;
        renderStations(value);
    });

    function renderStations(value) {
        let filteredStations = [];
        if (value.trim().length === 0) { // Исправлено условие
            filteredStations = STATIONS;
        } else {
            filteredStations = STATIONS.filter(station =>
                station.toUpperCase().includes(value.toUpperCase().trim())
            );
        }

        const filteredListElements = filteredStations.map(station => {
            const li = document.createElement('li');
            li.innerText = station;
            return li;
        });
        list.innerHTML = '';

        if (filteredListElements.length < 1) {
            list.innerHTML = `<span class="not-found-span">Not found</span>`;
        } else {
            list.append(...filteredListElements);
        }
    }

    list.addEventListener('mousedown', (event) => {
        if (event.target.nodeName === 'LI') {
            input.value = event.target.innerText;
        }
    });
}

setupAutocomplete('departureInput', 'departureList');
setupAutocomplete('arrivalInput', 'arrivalList');

// FINDRIDEBUTTON
document.addEventListener('DOMContentLoaded', function () {
    const findRideBtn = document.getElementById('findRideButton');
    const departure = document.getElementById('departureInput');
    const arrival = document.getElementById('arrivalInput');
    const departDate = document.getElementById('departInput');
    const returnDate = document.getElementById('returnInput');
    const roundTrip = document.getElementById('roundTrip');
    const oneWay = document.getElementById('oneWay');

    oneWay.addEventListener('change', function () {
        if (oneWay.checked) {
            returnDate.value = '';
            returnDate.disabled = true;
        }
    });

    roundTrip.addEventListener('change', function () {
        if (roundTrip.checked) {
            returnDate.disabled = false;
        }
    });

    findRideBtn.addEventListener('click', function () {
        const departureValue = departure.value.trim();
        const arrivalValue = arrival.value.trim();
        const departDateValue = departDate.value;
        const returnDateValue = returnDate.value;
        const today = new Date().toISOString().split('T')[0];

        if (!roundTrip.checked && !oneWay.checked) {
            alert('Please select a trip type: Round Trip or One Way!');
            return;
        }
        if (!departureValue || !arrivalValue || !departDateValue) {
            alert('Please fill in all required fields: Departure, Arrival, and Depart Date!');
            return;
        }
        if (departureValue.toLowerCase() === arrivalValue.toLowerCase()) {
            alert('Departure and Arrival cannot be the same!');
            return;
        }
        if (departDateValue < today) {
            alert('Depart date cannot be in the past!');
            return;
        }
        if (roundTrip.checked) {
            if (!returnDateValue) {
                alert('Please select a Return date for Round Trip!');
                return;
            }
            if (returnDateValue < departDateValue) {
                alert('Return date cannot be earlier than Depart date!');
                return;
            }
        }
        window.location.href = 'bus-list.html';
    });
});
