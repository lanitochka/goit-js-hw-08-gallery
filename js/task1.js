import images from "./gallery-items.js";
// console.log(images);



// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.



// ++++++++++++++++

const ulRef = document.querySelector('.gallery');

const createImage = image => {

  const liRef = document.createElement('li');
  liRef.classList.add('gallery__item');

  const aRef = document.createElement('a');
  aRef.classList.add('gallery__link');
  aRef.setAttribute('href', `${image.original}`);

  liRef.appendChild(aRef);
  

  const imgRef = document.createElement('img');
  imgRef.classList.add('gallery__image');
  imgRef.setAttribute('src', `${image.preview}`);
  imgRef.setAttribute('data-source', `${image.original}`);
  imgRef.setAttribute('alt', `${image.description}`); 

  aRef.appendChild(imgRef);

  return liRef;

}


const galleryList = images.map(image => createImage(image));
ulRef.append(...galleryList);


// ++++++++++++++++ через insertAdjacentHTML


// images.map(image => {
//   const ulRef = document.querySelector('.gallery');
//   ulRef.insertAdjacentHTML('afterbegin',
//     `<li>
//     <a href="${image.original}" class="gallery__link">
//     <img src="${image.preview}" alt="${image.description}" class="gallery__image" data-source ="${image.original}"></a>
//     </li>`);
// })


// ++++++++++++++++

const imageClick = document.querySelector('.js-gallery');
imageClick.addEventListener('click', onImageClick);

const openModalBtn = document.querySelector('.lightbox');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');


const modalImage = document.querySelector('.lightbox__image');
const backdropRef = document.querySelector('.lightbox__overlay');

backdropRef.addEventListener('click', onBackdropClick);





function onImageClick(e) {

  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {              
      console.log('Мимо кнопки, выходим');
      return;
  }

  modalImage.src = e.target.dataset.source

  onOpenModalBtn();

}


// открытие модалки

function onOpenModalBtn() {
    openModalBtn.classList.add('is-open'); 
}

// закрытие модалки

closeModalBtn.addEventListener('click', onCloseModalBtn);

function onCloseModalBtn() {
  openModalBtn.classList.remove('is-open');
  modalImage.src = '';
}

 // кликнули на фон

function onBackdropClick(e) {

    if (e.target === e.currentTarget) {
    onCloseModalBtn();
  }
} 

// Нажали Escape

document.addEventListener('keydown', e => {

    if (e.code === 'Escape') {
    onCloseModalBtn();
    }
})
