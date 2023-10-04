let indice = 0;

const handler = {
  set(target, property, value) {
    if (property === 'indice') {
      console.log(value);
    }
    target[property] = value;
    return true;
  }
};

const proxiedIndice = new Proxy({ indice }, handler);

document.getElementById('next').addEventListener('click', function() {
  moverCarrusel(1);
});

document.getElementById('prev').addEventListener('click', function() {
  moverCarrusel(-1);
});

function actualizarImagenActiva() {
  const imagenes = document.querySelectorAll('.carrusel .imagen');
  
  // Eliminar la clase 'activa' de todas las imágenes
  imagenes.forEach(imagen => imagen.classList.remove('activa'));

  // Agregar la clase 'activa' a la imagen del centro
  const imagenCentral = imagenes[proxiedIndice.indice + 7];
  if (imagenCentral) {
    imagenCentral.classList.add('activa');
  }
}

function desactivarTransicionImagenes() {
  const imagenes = document.querySelectorAll('.carrusel .imagen');
  imagenes.forEach(img => {
    img.style.transition = 'none';
  });
}

function activarTransicionImagenes() {
  const imagenes = document.querySelectorAll('.carrusel .imagen');
  imagenes.forEach(img => {
    img.style.transition = '';
  });
}

function moverCarrusel(dirección) {
  const carrusel = document.getElementById('carrusel');
  const imagenes = document.querySelectorAll('.carrusel .imagen');
  const totalImagenes = imagenes.length / 3;

  proxiedIndice.indice += dirección;

  // Si el índice llega al total de imágenes, prepárate para restablecer después de la transición
  if (proxiedIndice.indice >= totalImagenes) {
    proxiedIndice.indice = totalImagenes;
  } else if (proxiedIndice.indice <= -totalImagenes) {
    proxiedIndice.indice = -totalImagenes;
  }

  carrusel.style.transform = `translateX(-${1000+(200 * proxiedIndice.indice)}px)`;

  actualizarImagenActiva();
}



// Escuchar el final de la transición para restablecer el carrusel
document.getElementById('carrusel').addEventListener('transitionend', function() {
  const carrusel = document.getElementById('carrusel');
  const imagenes = document.querySelectorAll('.carrusel .imagen');
  const totalImagenes = imagenes.length / 3;

  if (proxiedIndice.indice === totalImagenes || indice === -totalImagenes) {
    setTimeout(() => {
    // Desactivar transiciones para que el restablecimiento sea instantáneo
    carrusel.style.transition = 'none';
    desactivarTransicionImagenes();
    
    proxiedIndice.indice = 0;
    carrusel.style.transform = `translateX(-${1000+(200 * indice)}px)`;

    // Forzar un reflow. Esto es necesario para que los cambios tomen efecto
    carrusel.offsetHeight;

    actualizarImagenActiva();

    // Reactivar transiciones
    carrusel.style.transition = 'transform 0.5s ease-in-out';
    setTimeout(() => {
    activarTransicionImagenes();
    },0)

  }, 500);
  }
});






