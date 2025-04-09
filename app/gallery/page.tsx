import ContactForm from "./components/contact-form";
import GalleryHero from "./components/gallery-hero";
import GallerySection from "./components/gallery-section";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      {/* Aquí iría tu componente de cabecera/header que mencionas que ya tienes */}

      <main>
        <GalleryHero title="GALERÍA" imageUrl="/gallery/img1.jpg" />

        <GallerySection
          title="El hotel en fotos"
          description="Descubra nuestros espacios diseñados para su comodidad y disfrute durante su estancia."
          images={[
            {
              src: "/images/gallery/lobby-1.jpg",
              alt: "Recepción del hotel",
              width: 600,
              height: 400,
            },
            {
              src: "/images/gallery/lobby-2.jpg",
              alt: "Área de recepción",
              width: 300,
              height: 200,
            },
          ]}
        />

        <GallerySection
          title="Nuestra Terraza"
          description="Un espacio único con vistas panorámicas para relajarse y disfrutar."
          images={[
            {
              src: "/images/gallery/terraza-1.jpg",
              alt: "Terraza con sillas rojas",
              width: 600,
              height: 400,
            },
            {
              src: "/images/gallery/terraza-2.jpg",
              alt: "Vista desde la terraza",
              width: 300,
              height: 200,
            },
            {
              src: "/images/gallery/terraza-3.jpg",
              alt: "Área de descanso en terraza",
              width: 300,
              height: 200,
            },
          ]}
          rightAligned
        />

        <GallerySection
          title="Descanso & Confort"
          description="Habitaciones diseñadas para garantizar su descanso y bienestar."
          images={[
            {
              src: "/images/gallery/habitacion-1.jpg",
              alt: "Habitación con cama matrimonial",
              width: 600,
              height: 400,
            },
            {
              src: "/images/gallery/habitacion-2.jpg",
              alt: "Baño de habitación",
              width: 300,
              height: 200,
            },
          ]}
        />

        <GallerySection
          title="Recepción"
          description="Nuestro personal le dará la bienvenida en un ambiente cálido y acogedor."
          images={[
            {
              src: "/images/gallery/recepcion.jpg",
              alt: "Área de recepción principal",
              width: 800,
              height: 400,
            },
          ]}
          fullWidth
        />

        <GallerySection
          title="Ubicación Ideal"
          description="Estratégicamente ubicados para facilitar su acceso a los principales puntos de interés."
          images={[
            {
              src: "/images/gallery/exterior-1.jpg",
              alt: "Fachada del hotel de noche",
              width: 400,
              height: 600,
            },
            {
              src: "/images/gallery/exterior-2.jpg",
              alt: "Entrada principal",
              width: 300,
              height: 200,
            },
            {
              src: "/images/gallery/exterior-3.jpg",
              alt: "Vista lateral del edificio",
              width: 300,
              height: 200,
            },
          ]}
          rightAligned
        />

        <GallerySection
          title="Espacios para Disfrutar"
          description="Áreas comunes diseñadas para su comodidad y entretenimiento."
          images={[
            {
              src: "/images/gallery/comedor.jpg",
              alt: "Área de comedor",
              width: 600,
              height: 400,
            },
          ]}
        />

        <ContactForm />
      </main>
    </div>
  );
}
