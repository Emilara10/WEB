var cont = 1;
var contImg = 1;

function traduce(){
    parrafo=document.getElementById("p2");
    if (cont % 2 === 0){
        parrafo.innerHTML="Beyond offering a recreational experience, our primary mission is to provide a safe and stimulating environment for our feline residents. Each cat has access to private rest areas and specialized care, ensuring that interactions with humans are always voluntary and harmonious. By visiting us, you are not only enjoying specialty coffee but also directly contributing to the cats care and supporting responsible adoption processes within our community.";

    }
    else{
        parrafo.innerHTML="Más allá de ofrecer una experiencia recreativa, nuestra misión principal es brindar un entorno seguro y estimulante para nuestros residentes felinos. Cada gato tiene acceso a áreas de descanso privadas y atención especializada, garantizando que las interacciones con los humanos sean siempre voluntarias y armoniosas. Al visitarnos, no solo estarás disfrutando de un café de especialidad, sino que también estarás contribuyendo directamente al cuidado de los gatos y apoyando los procesos de adopción responsable dentro de nuestra comunidad.";
    }
    
    parrafo=document.getElementById("p1");
    if (cont % 2 === 0){
        parrafo.innerHTML="A cat café is an innovative concept that blends the cozy atmosphere of a traditional coffee shop with the warmth of a feline sanctuary. In these spaces, visitors can enjoy a selection of craft beverages and pastries while interacting with cats that, in most cases, come from local shelters and are looking for a forever home. It is the perfect retreat for animal lovers seeking a moment of peace amidst the urban routine, always promoting respect and animal welfare.";

    }
    else{
        parrafo.innerHTML="Un cat café es un concepto innovador que combina la atmósfera acogedora de una cafetería tradicional con la calidez de un santuario felino. En estos espacios, los visitantes pueden disfrutar de una selección de bebidas artesanales y repostería mientras interactúan con gatos que, en la mayoría de los casos, provienen de refugios locales y buscan un hogar definitivo. Es el refugio perfecto para los amantes de los animales que buscan un momento de paz en medio de la rutina urbana, promoviendo siempre el respeto y el bienestar animal.";
    }

      parrafo=document.getElementById("p3");
    if (cont % 2 === 0){
        parrafo.innerHTML="What is a CatCafe?";
    }
    else{
        parrafo.innerHTML="¿Qué es un CatCafe?";
    }

      parrafo=document.getElementById("p4");
    if (cont % 2 === 0){
        parrafo.innerHTML="Our mission";

    }
    else{
        parrafo.innerHTML="Nuestra mission";
    }
    cont ++;
}

function cambiaImagen(){
    imagen = document.getElementById("i1");
    if (contImg % 2 === 0){
        imagen.src = "https://upload.wikimedia.org/wikipedia/commons/4/48/Catsrepublic.jpg";
    }
    else{
        imagen.src = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Roo_Female_Somali_in_Cat_Caf%C3%A9_Tokyo.jpg";
    }
    contImg ++;
}

function cambiaImagen2(){
    imagen = document.getElementById("i2");
    if (contImg % 2 === 0){
        imagen.src = "https://images.squarespace-cdn.com/content/v1/59014ed8db29d637250fa476/1511209786687-MFCDOJJ9Z2GPN3WWRC8R/IMG_7411.JPG";
    }
    else{
        imagen.src = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Charming_Cat_Cafe%2C_Vista_Ridge%2C_Lewisville.jpg";
    }
    contImg ++;
}

function generarNombreRandom() {
    var nombresGatos = [
        "Michi", "Luna", "Simba", "Pelusa", "Oliver", 
        "Garfield", "Nala", "Salem", "Milo", "Coco", 
        "Chispa", "Cookie", "Pantufla", "Benito", "Dobby"
    ];
    var indice = Math.floor(Math.random() * nombresGatos.length);
    var nombreElegido = nombresGatos[indice];
    document.getElementById("nombreGato").innerHTML = "Suggested name: <strong>" + nombreElegido + "</strong>";
}