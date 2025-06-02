'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import CarruselDestinos from '@/app/[locale]/viajeros/components/carrusel-destinos';
import CategoriaSelector from '@/app/[locale]/viajeros/components/categoria-selector';
import LugarTuristico from '@/app/[locale]/viajeros/components/lugar-turistico';
import ModalDetalle from '@/app/[locale]/viajeros/components/modal-detalle';
import Paginacion from '@/app/[locale]/viajeros/components/paginacion';
import TopDiez from '@/app/[locale]/viajeros/components/top-diez';
import { categorias } from '@/app/[locale]/viajeros/data/categorias';
import { subcategorias } from '@/app/[locale]/viajeros/data/subcategorias';
import { topItems } from '@/app/[locale]/viajeros/data/top-items';
import type { Subcategoria } from '@/app/[locale]/viajeros/types/turismo';

export default function TurismoPage() {
    const tHeader = useTranslations('Header');
    /* const tPlaces = useTranslations('TouristPlaces'); */

    // Estado para la categoría seleccionada - iniciar con "todos"
    const [categoriaActiva, setCategoriaActiva] = useState('todos');

    // Estado para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [lugarSeleccionado, setLugarSeleccionado] =
        useState<Subcategoria | null>(null);
    const [imagenInicialIndex, setImagenInicialIndex] = useState(0);

    // Estado para la paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const lugaresPerPage = 6;

    // Estado para el lugar destacado del Top 10
    const [lugarDestacadoId, setLugarDestacadoId] = useState<string | null>(
        null
    );

    // Referencia para hacer scroll al lugar destacado
    const lugaresContainerRef = useRef<HTMLDivElement>(null);
    const tituloSeccionRef = useRef<HTMLHeadingElement>(null);

    // Filtrar lugares por categoría seleccionada o mostrar todos
    const lugaresFiltrados =
        categoriaActiva === 'todos'
            ? subcategorias
            : subcategorias.filter(
                  lugar => lugar.categoriaId === categoriaActiva
              );

    // Reordenar lugares para mostrar el destacado primero si existe
    const lugaresOrdenados = [...lugaresFiltrados].sort((a, b) => {
        if (a.id === lugarDestacadoId) return -1;
        if (b.id === lugarDestacadoId) return 1;
        return 0;
    });

    // Calcular total de páginas
    const totalPaginas = Math.ceil(lugaresOrdenados.length / lugaresPerPage);

    // Obtener lugares para la página actual
    const lugaresActuales = lugaresOrdenados.slice(
        (paginaActual - 1) * lugaresPerPage,
        paginaActual * lugaresPerPage
    );

    // Seleccionar destinos destacados para el carrusel (uno de cada categoría)
    const destinosDestacados = categorias
        .filter(cat => cat.id !== 'todos')
        .map(cat => {
            const destino = subcategorias.find(
                sub => sub.categoriaId === cat.id
            );
            return destino;
        })
        .filter((destino): destino is Subcategoria => destino !== undefined)
        .slice(0, 5); // Limitar a 5 destinos destacados

    // Resetear la página al cambiar de categoría
    useEffect(() => {
        setPaginaActual(1);
    }, [categoriaActiva]);

    // Manejar clic en imagen para abrir modal
    const handleImageClick = (lugar: Subcategoria, imagenIndex: number) => {
        setLugarSeleccionado(lugar);
        setImagenInicialIndex(imagenIndex);
        setModalOpen(true);
    };

    // Cerrar modal
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // Cambiar página
    const handlePageChange = (pagina: number) => {
        setPaginaActual(pagina);
        // Scroll al inicio de la sección
        window.scrollTo({
            top: document.getElementById('lugares-turisticos')?.offsetTop || 0,
            behavior: 'smooth',
        });
    };

    // Manejar clic en elemento del Top 10 o del Carrusel
    const handleDestinoClick = (
        categoriaId: string,
        subcategoriaId: string
    ) => {
        // Cambiar a la categoría correspondiente
        setCategoriaActiva(categoriaId);

        // Establecer el lugar destacado
        setLugarDestacadoId(subcategoriaId);

        // Asegurarse de que estamos en la página 1 para ver el elemento destacado
        setPaginaActual(1);

        // Hacer scroll con mejor posicionamiento
        setTimeout(() => {
            // Usar el título de la sección como punto de referencia para el scroll
            if (tituloSeccionRef.current) {
                // Calcular la posición para el scroll
                const yOffset = -80; // Offset negativo para posicionar más abajo
                const y =
                    tituloSeccionRef.current.getBoundingClientRect().top +
                    window.pageYOffset +
                    yOffset;

                // Hacer scroll a la posición calculada
                window.scrollTo({
                    top: y,
                    behavior: 'smooth',
                });
            }
        }, 100);
    };

    // Efecto para limpiar el destacado después de un tiempo
    useEffect(() => {
        if (lugarDestacadoId) {
            const timer = setTimeout(() => {
                setLugarDestacadoId(null);
            }, 8000); // Aumentar a 8 segundos para dar más tiempo para ver el destacado

            return () => clearTimeout(timer);
        }
    }, [lugarDestacadoId]);

    return (
        <main className="container mx-auto px-4 py-8">
            {/* Carrusel de destinos destacados */}
            <CarruselDestinos
                destinos={destinosDestacados}
                onDestinoClick={handleDestinoClick}
            />
            {/* Selector de categorías */}
            <CategoriaSelector
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                onCategoriaChange={setCategoriaActiva}
            />

            {/* Contenido principal dividido en dos secciones */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {/* Sección de lugares turísticos (2/3 del ancho en escritorio, segundo en móvil/tablet) */}
                <div
                    className="lg:col-span-2 order-2 lg:order-1"
                    id="lugares-turisticos"
                    ref={lugaresContainerRef}
                >
                    {/* Título de la sección para mejor scroll */}
                    <h2
                        ref={tituloSeccionRef}
                        className="text-2xl font-serif text-foreground mb-6 sr-only"
                    >
                        Destinos Turísticos
                    </h2>

                    {/* Título principal */}
                    <div className="mb-6 md:mb-8">
                        <span className="text-xs md:text-sm font-light tracking-wider text-primary uppercase">
                            {tHeader('travelers')}
                        </span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-secondary dark:text-secondary-foreground mt-2">
                            {tHeader('tourist_information')}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {lugaresActuales.map(lugar => (
                            <LugarTuristico
                                key={lugar.id}
                                lugar={lugar}
                                onImageClick={handleImageClick}
                                isHighlighted={lugar.id === lugarDestacadoId}
                            />
                        ))}
                    </div>

                    {/* Paginación */}
                    <Paginacion
                        totalPaginas={totalPaginas}
                        paginaActual={paginaActual}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* Sección de Top 10 (1/3 del ancho en escritorio, primero en móvil/tablet) */}
                <div className="order-1 lg:order-2 mb-8 lg:mb-0">
                    <TopDiez
                        items={topItems}
                        onItemClick={handleDestinoClick}
                    />
                </div>
            </div>

            {/* Modal de detalle */}
            <ModalDetalle
                isOpen={modalOpen}
                onClose={handleCloseModal}
                lugar={lugarSeleccionado}
                initialImageIndex={imagenInicialIndex}
            />
        </main>
    );
}
