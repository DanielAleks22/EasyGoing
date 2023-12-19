import {GOOGLE_PLACES_API_KEY } from '@env';

const BASE_URL = 'https://maps.googleapis.com/maps/api';
const BASE_URL_PHOTO = 'https://maps.googleapis.com/maps/api/place/photo?'
const BASE_URL_ROUTE = 'https://maps.googleapis.com/maps/api/directions/json?'
export const fetchPlacesNearby = async (latitude, longitude, type, range, minPrix, maxPrix, motCle) => {
    
    let endpoint = `${BASE_URL}/place/nearbysearch/json?location=${latitude},${longitude}&type=${type}`;
    
    if (minPrix !== undefined && maxPrix !== undefined) {
        endpoint += `&minprice=${minPrix}&maxprice=${maxPrix}`;
    }

    if (range != undefined && range <= 50000) {
        endpoint += `&radius=${range}`;
    }

    if (motCle) {
        endpoint += `&keyword=${encodeURIComponent(motCle)}`;
    }

    endpoint += `&key=${GOOGLE_PLACES_API_KEY}`;

    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data && data.results) {
        let resultats = [];
        
        data.results.forEach(element => {
            let photoUrl = '';
            if (element.photos && element.photos.length > 0) {
                photoUrl = composePhotoRefUrl(element.photos[0].photo_reference);
            }

            let resultat = {
                rating: element.rating || '',
                price_level: element.price_level || '',
                name: element.name || '',
                vicinity: element.vicinity || '',
                photoUrl: photoUrl
            };
            
            resultats.push(resultat);
        });

        return resultats;
    } else {
        console.log("Failed request to Google Api Services at (fetchPlacesNearby): " + endpoint);
        throw new Error(data.error_message || 'Unable to fetch places nearby.');
    }
}

export const fetchParksNearby = async (latitude, longitude, range) => {
    let endpoint = `${BASE_URL}/place/nearbysearch/json?location=${latitude},${longitude}&type=park`;
    
    if (range) {
        endpoint += `&radius=${range}`;
    }

    endpoint += `&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data && data.results) {

        let resultats = [];

        data.results.forEach(element => {
            let photoUrl = '';
            if (element.photos && element.photos.length > 0) {
                photoUrl = composePhotoRefUrl(element.photos[0].photo_reference);
            }

            let resultat = {
                rating: element.rating || '',
                name: element.name || '',
                vicinity: element.vicinity || '',
                photoUrl: photoUrl
            }; 

            resultats.push(resultat);
        })

        return resultats;
    } else {
        console.log("Failed request to Google Api Services at (fetchParksNearby) : " + endpoint);
        throw new Error(data.error_message || 'Unable to fetch places nearby.');
    }
}

export const fetchBarsNearby = async (latitude, longitude, range) => {
    let endpoint = `${BASE_URL}/place/nearbysearch/json?location=${latitude},${longitude}&type=bar`;
    
    if (range) {
        endpoint += `&radius=${range}`;
    }

    endpoint += `&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data && data.results) {
        let resultats = [];

        data.results.forEach(element => {
            let photoUrl = '';
            
            if (element.photos && element.photos.length > 0) {
                photoUrl = composePhotoRefUrl(element.photos[0].photo_reference);
            }

            let resultat = {
                rating: element.rating || '',
                name: element.name || '',
                vicinity: element.vicinity || '',
                photoUrl: photoUrl
            }; 

            resultats.push(resultat);
        })

        return resultats;
    } else {
        console.log("Failed request to Google Api Services at (fetchParksNearby) : " + endpoint);
        throw new Error(data.error_message || 'Unable to fetch places nearby.');
    }
}

export const fetchRoute = async (latitudeDestination, longitudeDestination, latitudeOrigine, longitudeOrigne, travelMode) => {
    const origine = `${latitudeOrigine},${longitudeOrigne}`;
    const destination = `${latitudeDestination},${longitudeDestination}`;
    const endpoint = `${BASE_URL_ROUTE}origin=${origine}&destination=${destination}&mode=${travelMode}&key=${encodeURIComponent(GOOGLE_PLACES_API_KEY)}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        if (travelMode === 'transit' && data.status === 'OK') {
            const transitDetails = data.routes[0].legs[0].steps
                .filter(step => step.travel_mode === 'TRANSIT')
                .map(step => {
                    const transitInfo = step.transit_details;
                    return {
                        transportType: transitInfo.line.vehicle.type, 
                        lineNumber: transitInfo.line.short_name,
                        departureStop: transitInfo.departure_stop.name,
                        arrivalStop: transitInfo.arrival_stop.name,
                        departureTime: transitInfo.departure_time.text,
                        arrivalTime: transitInfo.arrival_time.text 
                    };
                });

            return {
                ...data,
                transitDetails 
            };
        }

        return data;
    } catch (error) {
        console.error("Erreur dans fetchRoute, URL: " + endpoint +  "\n " + error);
        throw new Error("Soit chemin vide, soit erreur dans la requete dans fetchRoute");
    }
}

export const fetchParkingsNearby = async (latitude, longitude, range) => {
    let endpoint = `${BASE_URL}/place/nearbysearch/json?location=${latitude},${longitude}&type=parking`;
    
    if (range) {
        endpoint += `&radius=${range}`;
    }

    endpoint += `&key=${GOOGLE_PLACES_API_KEY}`;
    
    console.log(endpoint);

    const response = await fetch(endpoint);
    const data = await response.json();
    
    if (data && data.results) {
        let resultats = [];

        data.results.forEach(element => {
            let photoUrl = '';
            
            if (element.photos && element.photos.length > 0) {
                photoUrl = composePhotoRefUrl(element.photos[0].photo_reference);
            }

            let resultat = {
                rating: element.rating || '',
                name: element.name || '',
                vicinity: element.vicinity || '',
                photoUrl: photoUrl
            }; 

            resultats.push(resultat);
        })

        return resultats;
    } else {
        console.log("Failed request to Google Api Services at (fetchParksNearby) : " + endpoint);
        throw new Error(data.error_message || 'Unable to fetch places nearby.');
    }
}

function composePhotoRefUrl(photoRef){
    let url = `${BASE_URL_PHOTO}maxwidth=400&photo_reference=${photoRef}&key=${GOOGLE_PLACES_API_KEY}`;
    console.log(url);
    return url;
}