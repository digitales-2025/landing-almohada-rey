"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Formulario enviado:", formData);
    // Resetear el formulario
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section ref={ref} className="py-16 px-4 md:px-8 bg-gray-100">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-4">¿Alguna consulta?</h2>
          <p className="text-gray-600">
            Estamos aquí para responder todas sus preguntas y ayudarle a planificar su estancia perfecta.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <Input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <Button type="submit" className="w-full">
            Enviar mensaje
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
