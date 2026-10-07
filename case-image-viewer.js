const caseImages = document.querySelectorAll('.inv-artifacts img, .ss-page-exact img, .topology-case img');

if (caseImages.length) {
  const viewer = document.createElement('dialog');
  viewer.className = 'case-image-viewer';
  viewer.setAttribute('aria-label', 'Image viewer');
  viewer.innerHTML = '<header class="case-image-viewer__bar"><p class="case-image-viewer__caption"></p><div class="case-image-viewer__controls"><button type="button" data-zoom-out aria-label="Zoom out" title="Zoom out">−</button><output aria-live="polite">100%</output><button type="button" data-zoom-in aria-label="Zoom in" title="Zoom in">+</button><button type="button" data-zoom-fit>Fit</button><button type="button" data-zoom-actual>1:1</button><button type="button" data-zoom-close aria-label="Close image viewer" title="Close">×</button></div></header><div class="case-image-viewer__stage"><img alt="" /></div>';
  document.body.append(viewer);

  const sourceImage = viewer.querySelector('.case-image-viewer__stage img');
  const caption = viewer.querySelector('.case-image-viewer__caption');
  const zoomOutput = viewer.querySelector('output');
  const stage = viewer.querySelector('.case-image-viewer__stage');
  let zoom = 1;
  let fitZoomLimit = 8;

  function applyZoom(nextZoom) {
    zoom = Math.max(0.5, Math.min(8, nextZoom));
    sourceImage.style.width = `${Math.round(sourceImage.naturalWidth * zoom)}px`;
    zoomOutput.value = `${Math.round(zoom * 100)}%`;
    zoomOutput.textContent = zoomOutput.value;
  }

  function fitToView() {
    if (!sourceImage.naturalWidth || !sourceImage.naturalHeight) return;
    const widthFit = (stage.clientWidth - 40) / sourceImage.naturalWidth;
    const heightFit = (stage.clientHeight - 40) / sourceImage.naturalHeight;
    applyZoom(Math.min(fitZoomLimit, widthFit, heightFit));
    stage.scrollTo(0, 0);
  }

  function openImage(image) {
    fitZoomLimit = Number(image.dataset.viewerFitMax) || 8;
    sourceImage.src = image.currentSrc || image.src;
    sourceImage.alt = image.alt;
    caption.textContent = image.alt || 'Case study image';
    viewer.showModal();
    sourceImage.onload = () => {
      const widthFit = (stage.clientWidth - 40) / sourceImage.naturalWidth;
      applyZoom(Math.min(fitZoomLimit, Math.max(0.5, widthFit)));
      stage.scrollTo(0, 0);
    };
    if (sourceImage.complete && sourceImage.naturalWidth) sourceImage.onload();
  }

  caseImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open full-size image: ${image.alt}`);
    const trigger = document.createElement('button');
    trigger.className = 'case-image-viewer__trigger';
    trigger.type = 'button';
    trigger.textContent = 'View full size ↗';
    trigger.setAttribute('aria-label', `View full size: ${image.alt}`);
    trigger.addEventListener('click', () => openImage(image));
    const figure = image.closest('figure');
    const captionNode = figure?.querySelector('figcaption');
    if (captionNode) captionNode.insertAdjacentElement('beforebegin', trigger);
    else image.insertAdjacentElement('afterend', trigger);
    image.addEventListener('click', () => openImage(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openImage(image);
      }
    });
  });

  viewer.querySelector('[data-zoom-in]').addEventListener('click', () => applyZoom(zoom + 0.5));
  viewer.querySelector('[data-zoom-out]').addEventListener('click', () => applyZoom(zoom - 0.5));
  viewer.querySelector('[data-zoom-fit]').addEventListener('click', fitToView);
  viewer.querySelector('[data-zoom-actual]').addEventListener('click', () => applyZoom(1));
  viewer.querySelector('[data-zoom-close]').addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });
}
