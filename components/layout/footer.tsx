"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-6 text-center text-sm text-gray-500">
      <div className="container mx-auto">© {new Date().getFullYear()} MyApp. All rights reserved.</div>
    </footer>
  );
}
