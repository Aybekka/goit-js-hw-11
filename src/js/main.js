import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const loader = document.querySelector('.loader');

const API_KEY = '54968565-2cd96adb4d5f069c81d213fb9'; 

let lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const searchTerm = event.currentTarget.elements.searchQuery.value.trim();
    
    if (searchTerm === "") {
        return iziToast.warning({ title: 'Warning!', message: 'Please enter a search term!' });
    }

    
    gallery.innerHTML = "";
    showLoader();

    fetchImages(searchTerm);
});

function fetchImages(query) {
    const searchParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    });

    fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if (!response.ok) throw new Error(response.status);
            return response.json();
        })
        .then(data => {
            if (data.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight'
                });
                return;
            }
            renderGallery(data.hits);
        })
        .catch(error => {
            iziToast.error({ title: 'Hata', message: 'Sunucuya bağlanırken bir sorun oluştu.' });
            console.log("Hata:", error);
        })
        .finally(() => {
            
            hideLoader();
        });
}

function renderGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        
        return `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
                <p class="info-item"><b>Likes</b>${likes}</p>
                <p class="info-item"><b>Views</b>${views}</p>
                <p class="info-item"><b>Comments</b>${comments}</p>
                <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
        </li>`;
    }).join("");
    
    gallery.innerHTML = markup;
    
    
    lightbox.refresh();
}

function showLoader() {
    if(loader) loader.style.display = "block";
}

function hideLoader() {
    if(loader) loader.style.display = "none";
}