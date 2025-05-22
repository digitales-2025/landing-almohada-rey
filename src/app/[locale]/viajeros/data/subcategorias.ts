import type { Subcategoria } from '@/app/[locale]/viajeros/types/turismo';

export const subcategorias: Subcategoria[] = [
    // Destinos Urbanos
    {
        id: 'monasterio_santa_catalina',
        categoriaId: 'urban_destinations',
        titulo: 'Monasterio de Santa Catalina',
        subtitulo: 'Joya arquitectónica colonial',
        descripcion:
            'El Monasterio de Santa Catalina es una ciudadela religiosa fundada en 1579, construida en sillar. Dentro de sus muros se puede apreciar calles, plazas y claustros que conservan su encanto original. Es uno de los recintos religiosos más importantes del Perú colonial.',
        imagenes: [
            {
                id: '01_Img_monasterio_santa_catalina',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'monasterio_santa_catalina',
                url: '/traveler/destiny/santa_catalina/01_Img_monasterio_santa_catalina.webp',
            },
            {
                id: '02_Img_monasterio_santa_catalina',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'monasterio_santa_catalina',
                url: '/traveler/destiny/santa_catalina/02_Img_monasterio_santa_catalina.webp',
            },
            {
                id: '03_Img_monasterio_santa_catalina',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'monasterio_santa_catalina',
                url: '/traveler/destiny/santa_catalina/03_Img_monasterio_santa_catalina.webp',
            },
        ],
    },
    {
        id: 'museo_santuarios_andinos',
        categoriaId: 'urban_destinations',
        titulo: 'Museo Arqueológico Santuarios Andinos',
        subtitulo: 'Hogar de la momia Juanita',
        descripcion:
            'El Museo Santuarios Andinos alberga a la momia Juanita, una niña inca sacrificada en el volcán Ampato. El museo exhibe los hallazgos de las expediciones a los volcanes de la región, mostrando ofrendas y artefactos incas en perfecto estado de conservación gracias al hielo.',
        imagenes: [
            {
                id: '01_Img_museo_santuarios_andinos',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'museo_santuarios_andinos',
                url: '/placeholder.svg?height=400&width=600&query=entrada de museo con arco colonial',
            },
            {
                id: '02_Img_museo_santuarios_andinos',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'museo_santuarios_andinos',
                url: '/placeholder.svg?height=400&width=600&query=vitrina con momia inca preservada',
            },
            {
                id: '03_Img_museo_santuarios_andinos',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'museo_santuarios_andinos',
                url: '/placeholder.svg?height=400&width=600&query=artefactos incas en exhibición de museo',
            },
        ],
    },
    {
        id: 'basilica_catedral',
        categoriaId: 'urban_destinations',
        titulo: 'Basílica Catedral de la ciudad de Arequipa',
        subtitulo: 'Joya arquitectónica neoclásica',
        descripcion:
            'Se puede apreciar su altar de mármol de carrara, el púlpito y un antiguo órgano. Uno de los primeros monumentos religiosos del siglo XVII en la ciudad. Se construyó en sillar (piedra de origen volcánico), de estilo neoclásico.',
        imagenes: [
            {
                id: '01_Img_basilica_catedral',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'basilica_catedral',
                url: '/arequipa-cathedral-sunset.png',
            },
            {
                id: '02_Img_basilica_catedral',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'basilica_catedral',
                url: '/catedral-altar-marmol.png',
            },
            {
                id: '03_Img_basilica_catedral',
                categoriaId: 'urban_destinations',
                subcategoriaId: 'basilica_catedral',
                url: '/carved-pulpit-colonial-cathedral.png',
            },
        ],
    },

    // Playas
    {
        id: 'mollendo_mejia_camana',
        categoriaId: 'beaches',
        titulo: 'Mollendo, Mejía y Camaná',
        subtitulo: 'Playas del litoral arequipeño',
        descripcion:
            'Las playas de Mollendo, Mejía y Camaná son los principales balnearios de Arequipa. Ofrecen hermosas costas con aguas cristalinas, perfectas para el descanso y deportes acuáticos. Durante el verano, son el destino preferido de los arequipeños y turistas.',
        imagenes: [
            {
                id: '01_Img_mollendo_mejia_camana',
                categoriaId: 'beaches',
                subcategoriaId: 'mollendo_mejia_camana',
                url: '/placeholder.svg?height=400&width=600&query=edificio amarillo sobre acantilado frente al mar',
            },
            {
                id: '02_Img_mollendo_mejia_camana',
                categoriaId: 'beaches',
                subcategoriaId: 'mollendo_mejia_camana',
                url: '/placeholder.svg?height=400&width=600&query=playa con arena dorada y mar azul',
            },
            {
                id: '03_Img_mollendo_mejia_camana',
                categoriaId: 'beaches',
                subcategoriaId: 'mollendo_mejia_camana',
                url: '/placeholder.svg?height=400&width=600&query=atardecer en playa con siluetas de palmeras',
            },
        ],
    },
    {
        id: 'puerto_inca',
        categoriaId: 'beaches',
        titulo: 'Puerto Inca',
        subtitulo: 'Playa histórica',
        descripcion:
            'Puerto Inca es una hermosa bahía que fue utilizada por los incas como puerto para transportar productos entre la costa y la sierra. Hoy es una playa tranquila rodeada de restos arqueológicos incas, ideal para quienes buscan combinar historia y naturaleza.',
        imagenes: [
            {
                id: '01_Img_puerto_inca',
                categoriaId: 'beaches',
                subcategoriaId: 'puerto_inca',
                url: '/placeholder.svg?height=400&width=600&query=bahía con aguas turquesas y acantilados',
            },
            {
                id: '02_Img_puerto_inca',
                categoriaId: 'beaches',
                subcategoriaId: 'puerto_inca',
                url: '/placeholder.svg?height=400&width=600&query=ruinas incas cerca de playa',
            },
            {
                id: '03_Img_puerto_inca',
                categoriaId: 'beaches',
                subcategoriaId: 'puerto_inca',
                url: '/placeholder.svg?height=400&width=600&query=vista aérea de bahía en forma de herradura',
            },
        ],
    },

    // Valle de Majes
    {
        id: 'petroglifos_toro_muerto',
        categoriaId: 'majes_valley',
        titulo: 'Petroglifos de Toro Muerto',
        subtitulo: 'Arte rupestre milenario',
        descripcion:
            'Toro Muerto es uno de los sitios de arte rupestre más grandes de Sudamérica, con más de 5,000 bloques de piedra volcánica grabados con figuras de animales, seres humanos y símbolos geométricos. Estas manifestaciones artísticas datan de entre 500 y 1,000 d.C.',
        imagenes: [
            {
                id: '01_Img_petroglifos_toro_muerto',
                categoriaId: 'majes_valley',
                subcategoriaId: 'petroglifos_toro_muerto',
                url: '/placeholder.svg?height=400&width=600&query=petroglifos en roca volcánica con figuras de animales',
            },
            {
                id: '02_Img_petroglifos_toro_muerto',
                categoriaId: 'majes_valley',
                subcategoriaId: 'petroglifos_toro_muerto',
                url: '/placeholder.svg?height=400&width=600&query=campo de rocas con grabados en desierto',
            },
            {
                id: '03_Img_petroglifos_toro_muerto',
                categoriaId: 'majes_valley',
                subcategoriaId: 'petroglifos_toro_muerto',
                url: '/placeholder.svg?height=400&width=600&query=detalle de petroglifo con figura humana',
            },
        ],
    },

    // Cañón del Colca
    {
        id: 'mirador_condor',
        categoriaId: 'colca_canyon',
        titulo: 'Mirador del Cóndor',
        subtitulo: 'Observación de cóndores andinos',
        descripcion:
            'La Cruz del Cóndor es un mirador natural desde donde se puede observar el vuelo majestuoso del cóndor andino. Este punto ofrece también una vista impresionante del Cañón del Colca, uno de los más profundos del mundo, con más de 4,160 metros de profundidad.',
        imagenes: [
            {
                id: '01_Img_mirador_condor',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'mirador_condor',
                url: '/placeholder.svg?height=400&width=600&query=cóndor volando sobre cañón profundo',
            },
            {
                id: '02_Img_mirador_condor',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'mirador_condor',
                url: '/placeholder.svg?height=400&width=600&query=vista panorámica del Cañón del Colca',
            },
            {
                id: '03_Img_mirador_condor',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'mirador_condor',
                url: '/placeholder.svg?height=400&width=600&query=mirador con turistas observando cóndores',
            },
        ],
    },
    {
        id: 'termas_calera',
        categoriaId: 'colca_canyon',
        titulo: 'Termas de La Calera',
        subtitulo: 'Aguas termales medicinales',
        descripcion:
            'Las aguas termales de La Calera, ubicadas en Chivay, tienen propiedades medicinales gracias a su alto contenido mineral. Con temperaturas entre 38°C y 40°C, estas piscinas naturales son perfectas para relajarse después de un día de caminata por el cañón.',
        imagenes: [
            {
                id: '01_Img_termas_calera',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'termas_calera',
                url: '/placeholder.svg?height=400&width=600&query=piscinas termales con vapor y montañas de fondo',
            },
            {
                id: '02_Img_termas_calera',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'termas_calera',
                url: '/placeholder.svg?height=400&width=600&query=personas relajándose en aguas termales',
            },
            {
                id: '03_Img_termas_calera',
                categoriaId: 'colca_canyon',
                subcategoriaId: 'termas_calera',
                url: '/placeholder.svg?height=400&width=600&query=instalaciones de spa termal en montañas',
            },
        ],
    },

    // Paisajes Cercanos
    {
        id: 'volcan_misti',
        categoriaId: 'nearby_landscapes',
        titulo: 'Volcán Misti',
        subtitulo: 'El guardián de Arequipa',
        descripcion:
            'El Misti es un volcán activo de 5,822 metros que domina el paisaje de Arequipa. Su forma cónica perfecta lo convierte en un símbolo de la ciudad. Para los más aventureros, es posible realizar ascensos hasta su cráter, una experiencia desafiante pero inolvidable.',
        imagenes: [
            {
                id: '01_Img_volcan_misti',
                categoriaId: 'nearby_landscapes',
                subcategoriaId: 'volcan_misti',
                url: '/placeholder.svg?height=400&width=600&query=volcán cónico con nieve en la cima',
            },
            {
                id: '02_Img_volcan_misti',
                categoriaId: 'nearby_landscapes',
                subcategoriaId: 'volcan_misti',
                url: '/placeholder.svg?height=400&width=600&query=ciudad de Arequipa con volcán Misti de fondo',
            },
            {
                id: '03_Img_volcan_misti',
                categoriaId: 'nearby_landscapes',
                subcategoriaId: 'volcan_misti',
                url: '/placeholder.svg?height=400&width=600&query=amanecer con silueta de volcán',
            },
        ],
    },

    // Gastronomía
    {
        id: 'rocoto_relleno',
        categoriaId: 'gastronomy',
        titulo: 'Rocoto Relleno',
        subtitulo: 'Plato emblemático arequipeño',
        descripcion:
            'El rocoto relleno es uno de los platos más representativos de Arequipa. Consiste en un rocoto (ají picante) relleno de carne molida, queso, aceitunas y especias, gratinado al horno. Se sirve tradicionalmente con pastel de papa, una deliciosa combinación de sabores intensos.',
        imagenes: [
            {
                id: '01_Img_rocoto_relleno',
                categoriaId: 'gastronomy',
                subcategoriaId: 'rocoto_relleno',
                url: '/placeholder.svg?height=400&width=600&query=rocoto relleno con queso gratinado',
            },
            {
                id: '02_Img_rocoto_relleno',
                categoriaId: 'gastronomy',
                subcategoriaId: 'rocoto_relleno',
                url: '/placeholder.svg?height=400&width=600&query=plato típico arequipeño con pastel de papa',
            },
            {
                id: '03_Img_rocoto_relleno',
                categoriaId: 'gastronomy',
                subcategoriaId: 'rocoto_relleno',
                url: '/placeholder.svg?height=400&width=600&query=chef preparando rocoto relleno tradicional',
            },
        ],
    },

    // Fiestas y Celebraciones
    {
        id: 'aniversario_arequipa',
        categoriaId: 'festivals_celebrations',
        titulo: 'Aniversario de la ciudad de Arequipa',
        subtitulo: 'Festividades de agosto',
        descripcion:
            'Cada 15 de agosto, Arequipa celebra su fundación española con un mes lleno de actividades culturales, gastronómicas y artísticas. El punto culminante es el corso de la amistad, un colorido desfile que recorre las principales calles de la ciudad con carros alegóricos y danzas tradicionales.',
        imagenes: [
            {
                id: '01_Img_aniversario_arequipa',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'aniversario_arequipa',
                url: '/placeholder.svg?height=400&width=600&query=desfile con trajes típicos coloridos',
            },
            {
                id: '02_Img_aniversario_arequipa',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'aniversario_arequipa',
                url: '/placeholder.svg?height=400&width=600&query=plaza de armas de Arequipa iluminada para festividades',
            },
            {
                id: '03_Img_aniversario_arequipa',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'aniversario_arequipa',
                url: '/placeholder.svg?height=400&width=600&query=fuegos artificiales sobre catedral de Arequipa',
            },
        ],
    },
    {
        id: 'wititi',
        categoriaId: 'festivals_celebrations',
        titulo: 'Danza del Wititi',
        subtitulo: 'Patrimonio Cultural de la Humanidad',
        descripcion:
            'El Wititi es una danza tradicional del Valle del Colca, declarada Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO. Esta danza de cortejo se caracteriza por sus coloridos trajes y movimientos que representan el ritual de apareamiento de las aves andinas.',
        imagenes: [
            {
                id: '01_Img_wititi',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'wititi',
                url: '/placeholder.svg?height=400&width=600&query=bailarines con trajes coloridos de wititi',
            },
            {
                id: '02_Img_wititi',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'wititi',
                url: '/placeholder.svg?height=400&width=600&query=danza tradicional en plaza de pueblo andino',
            },
            {
                id: '03_Img_wititi',
                categoriaId: 'festivals_celebrations',
                subcategoriaId: 'wititi',
                url: '/placeholder.svg?height=400&width=600&query=detalle de vestimenta tradicional del Colca',
            },
        ],
    },
];
