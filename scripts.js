// Translation data
const translations = {
    en: {
        "main-title": "Converters for the Kir'ba Fantasy World",
        "unit-converter-title": "Unit Converter",
        "convert-button": "Convert",
        "currency-converter-title": "Currency Converter",
        "usd": "USD",
        "rub": "RUB",
        "tirians": "Tirians"
    },
    de: {
        "main-title": "Konverter fur die Fantasiewelt Kir'ba",
        "unit-converter-title": "Einheitenumrechner",
        "convert-button": "Umrechnen",
        "currency-converter-title": "Währungsumrechner",
        "usd": "USD",
        "rub": "RUB",
        "tirians": "Tirianer"
    },
    fr: {
        "main-title": "Convertisseurs pour l'univers fantastique de Kir'ba",
        "unit-converter-title": "Convertisseur d'unités",
        "convert-button": "Convertir",
        "currency-converter-title": "Convertisseur de devises",
        "usd": "USD",
        "rub": "RUB",
        "tirians": "Tirians"
    },
    ru: {
        "main-title": "Конверторы для фэнтези мира Кир'ба",
        "unit-converter-title": "Конвертер Величин",
        "convert-button": "Преобразовать",
        "currency-converter-title": "Конвертер Валют",
        "usd": "USD",
        "rub": "RUB",
        "tirians": "Тирианы"
    }
};

function translatePage(language) {
    document.querySelectorAll("[data-lang]").forEach(elem => {
        const key = elem.getAttribute("data-lang");
        elem.innerText = translations[language][key];
    });
}

// Unit Converter
function convertUnits() {
    const value = parseFloat(document.getElementById('unit-value').value);
    const fromUnit = document.getElementById('unit-from').value;
    const toUnit = document.getElementById('unit-to').value;

    const linearUnits = {
        "ашита": 0.305,
        "пэс": 0.914,
        "милья": 1609
    };

    const areaUnits = {
        "квадратная ашита": 0.093,
        "квадратный пэс": 0.836,
        "акр": 4047
    };

    const volumeUnits = {
        "пинта": 0.473,
        "кварта": 0.946,
        "галлон": 3.785
    };

    const weightUnits = {
        "унция": 28.35,
        "фунт": 0.454,
        "тонна": 907
    };

    let result;
    try {
        if (fromUnit in linearUnits && toUnit in linearUnits) {
            result = value * (linearUnits[toUnit] / linearUnits[fromUnit]);
        } else if (fromUnit in areaUnits && toUnit in areaUnits) {
            result = value * (areaUnits[toUnit] / areaUnits[fromUnit]);
        } else if (fromUnit in volumeUnits && toUnit in volumeUnits) {
            result = value * (volumeUnits[toUnit] / volumeUnits[fromUnit]);
        } else if (fromUnit in weightUnits && toUnit in weightUnits) {
            result = value * (weightUnits[toUnit] / weightUnits[fromUnit]);
        } else {
            throw new Error("Invalid units");
        }
        document.getElementById('unit-result').innerText = `${value} ${fromUnit} равно ${result.toFixed(3)} ${toUnit}`;
    } catch (error) {
        document.getElementById('unit-result').innerText = `Ошибка: ${error.message}`;
    }
}

// Currency Converter
function convertCurrency() {
    const value = parseFloat(document.getElementById('currency-value').value);
    const fromCurrency = document.getElementById('currency-from').value;
    const toCurrency = document.getElementById('currency-to').value;

    const exchangeRates = {
        usd: {
            tirians: 1 / 56,
            rub: 76
        },
        rub: {
            tirians: 1 / (56 / 76),
            usd: 1 / 76
        },
        tirians: {
            usd: 56,
            rub: 56 / 76
        }
    };

    let result;
    try {
        if (fromCurrency === toCurrency) {
            result = value;
        } else if (exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]) {
            result = value * exchangeRates[fromCurrency][toCurrency];
        } else {
            throw new Error("Invalid currency");
        }
        document.getElementById('currency-result').innerText = `${value} ${fromCurrency.toUpperCase()} равно ${result.toFixed(2)} ${toCurrency.toUpperCase()}`;
    } catch (error) {
        document.getElementById('currency-result').innerText = `Ошибка: ${error.message}`;
    }
}