const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded  = 0;
let totalImages = 0;
let photosArray = [];

// API 
let count = 5;
const apiKey = 'ZTltXRlCQNpaU8Cbeavu7xNYNKCmfX4k3Sryj9vPpeY';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check whether the images are loaded or not
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded  === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// Function To Set Attributes

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Displaying Photos

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images',totalImages);
    photosArray.forEach((photo) => {
        // For <a> tag linking to unsplash

        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });
        // For <img> tag

        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            target: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener For Finished Loading
        img.addEventListener('load', imageLoaded);

        // Putting both <a> and <img> tag and then loading the imagecontainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// Async Function

async function getPictures() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // Loads error here
    }
}


// Infinite Scrolling

window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPictures();
    }
});

getPictures();