// Tipos para las categorías, subcategorías e imágenes
export type Categoria = {
    id: string;
    titulo: string;
};

export type Subcategoria = {
    id: string;
    categoriaId: string;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    imagenes: Imagen[];
};

export type Imagen = {
    id: string;
    categoriaId: string;
    subcategoriaId: string;
    url: string;
};

// Modificar el tipo TopItem para incluir la categoría y subcategoría
export type TopItem = {
    id: number;
    titulo: string;
    subtitulo: string;
    categoriaId: string;
    subcategoriaId: string;
    imagen: string;
};

/* export type TopItem = {
    id: number;
    titulo: string;
    subtitulo: string;
    categoriaId: string;
    subcategoriaId: string;
    imagen: string;
};
 */
