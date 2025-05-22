'use client';

interface PaginacionProps {
    totalPaginas: number;
    paginaActual: number;
    onPageChange: (pagina: number) => void;
}

export default function Paginacion({
    totalPaginas,
    paginaActual,
    onPageChange,
}: PaginacionProps) {
    if (totalPaginas <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-1 md:gap-2 my-6 md:my-8">
            <button
                onClick={() => onPageChange(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="p-1.5 md:p-2 text-gray-500 disabled:opacity-30"
            >
                &lt;
            </button>

            {Array.from({ length: totalPaginas }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === paginaActual;

                // En móvil, mostrar solo páginas cercanas a la actual
                const isMobileVisible =
                    pageNumber === 1 ||
                    pageNumber === totalPaginas ||
                    Math.abs(pageNumber - paginaActual) <= 1;

                if (!isMobileVisible && window.innerWidth < 640) {
                    if (
                        pageNumber === paginaActual - 2 ||
                        pageNumber === paginaActual + 2
                    ) {
                        return (
                            <span
                                key={`ellipsis-${pageNumber}`}
                                className="text-gray-400"
                            >
                                ...
                            </span>
                        );
                    }
                    return null;
                }

                return (
                    <button
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                        className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-serif text-lg md:text-xl ${
                            isActive
                                ? 'text-amber-700 font-medium border-b-2 border-amber-500'
                                : 'text-gray-500 hover:bg-primary/10 hover:text-primary rounded-full transition-colors'
                        }`}
                    >
                        {pageNumber < 10 ? `0${pageNumber}` : pageNumber}
                    </button>
                );
            })}

            <button
                onClick={() => onPageChange(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="p-1.5 md:p-2 text-gray-500 disabled:opacity-30"
            >
                &gt;
            </button>
        </div>
    );
}
