// assets/data_manager.js

const CARD_DATA_KEY = 'mObywatelCardData';

// Default data to ensure the structure exists and to provide initial values if none are stored
const defaultCardData = {
    name: 'JAN',
    surname: 'KOWALSKI',
    nationality: 'POLSKIE',
    birthday: '24.01.2007',
    pesel: '07212402957',
    seriesAndNumber: 'LGZB 76872',
    expiryDate: '24.01.2030',
    givenDate: '24.01.2025',
    fathersName: 'JERZY',
    mothersName: 'BARBARA',
    familyName: 'NSJS',
    sex: 'MĘŻCZYZNA',
    fathersFamilyName: 'BSBS',
    mothersFamilyName: 'BSBS',
    birthPlace: 'WADOWICE',
    countryOfBirth: 'POLSKA',
    address: 'UL. BSBS<br>34-130 WADOWICE', // HTML line breaks stored as <br>
    registrationDate: '21.06.2012',
    profileImageBase64: '' // Will store image as base64 data URL
};

function getCardData() {
    const storedData = localStorage.getItem(CARD_DATA_KEY);
    if (storedData) {
        // Merge with defaults to ensure all keys are present if new fields are added later
        return { ...defaultCardData, ...JSON.parse(storedData) };
    }
    // If no data is stored, save and return the default data
    localStorage.setItem(CARD_DATA_KEY, JSON.stringify(defaultCardData));
    return defaultCardData;
}

function saveCardData(data) {
    if (typeof data.address === 'string') {
        // Ensure consistent line breaks for address if it's edited as a textarea
        data.address = data.address.replace(/\n/g, '<br>');
    }
    localStorage.setItem(CARD_DATA_KEY, JSON.stringify(data));
    console.log('Card data saved:', data);
}

// Example of how to initialize or update a specific field if needed directly
// function updateSpecificField(fieldName, value) {
//     const currentData = getCardData();
//     currentData[fieldName] = value;
//     saveCardData(currentData);
// }