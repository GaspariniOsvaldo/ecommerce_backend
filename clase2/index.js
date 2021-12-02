class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        const fullName = `Tu nombre completo es: ${this.nombre} ${this.apellido}`;

        console.log(fullName);
    }

    addPet(petName) {
        let mascotas = this.mascotas;
        mascotas = [mascotas, petName];

        this.mascotas = mascotas;
        console.log(`Las mascotas son: ${mascotas}`);
    }

    countPets() {

        let count = 0;

        for (let i =  0; i < this.mascotas.length; i++) {
            count += 1;
        }

        console.log(`Hay ${count} mascotas`);
    }

    addBook(nameBook, authorBook) {
        this.libros = [this.libros, {nameBook, authorBook}];

        console.log(this.libros);
    }

    getBookNames(){
        for(let i =  0; i < this.libros.length; i++){
            console.log(this.libros[i].nameBook);
        }
    }
};

const p = new Usuario("Osvaldo", "Gasparini", {nameBook: "Viaje al centro de la tierra", authorBook: "asdfhj"}, "Gato");

p.getFullName();

p.addPet("Perro");

p.countPets();

p.addBook("La Dama Oscura", "Cristina Perez");

p.getBookNames();