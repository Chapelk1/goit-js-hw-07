import { galleryItems } from './gallery-items.js';
// Change code below this line

const refs = {
    listEl: document.querySelector(".gallery"),   
} 
refs.listEl.insertAdjacentHTML("beforeend", createAllImgItemList(galleryItems));
refs.listEl.addEventListener("click", createModalImg);

function createModalImg(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const originalSizeImg = event.target.dataset.source;
  const modalImg = basicLightbox.create(
    `
        <img width="1400" height="900" src="${originalSizeImg}">
        `,
    { onShow: createTargetModalClick, onClose: removeTargetModalClick }
  );

  modalImg.show();

  function createTargetModalClick() {
    window.addEventListener("keyup", onTargetModalClick);
  }
  function removeTargetModalClick() {
    window.removeEventListener("keyup", onTargetModalClick);
  }
  function onTargetModalClick(e) {
    console.log(e.code);
    if (e.code === "Escape") {
        modalImg.close();
        
    }
  }
}

function createAllImgItemList(gallery) {
return gallery
  .map(({ preview, original, description }) => {
    return `
        <li class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </li>
        `;
  })
  .join("");
}

















