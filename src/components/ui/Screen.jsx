// Shell común de todas las páginas: layout + el único fondo de la app.
// Ocupa toda la altura del shell (h-dvh en App): la app nunca scrollea, el
// scroll vive dentro de cada página. Cada página pasa su py / justify /
// overflow por className:
// dejarlos acá chocaría entre utilidades de Tailwind.
//
// `tint` es la capa reactiva (rojo/verde según cómo viene la partida). Sin
// tinte queda transparente, así el fondo se ve igual en todas las páginas.
export default function Screen({ className = '', tint = '', children }) {
  return (
    <div className={`flex flex-col items-center w-full max-w-sm mx-auto h-full relative ${className}`}>
      <div className="absolute inset-0 bg-black -z-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] -z-10"></div>
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent -z-10 pointer-events-none blur-xl"></div>
      <div className={`absolute inset-0 -z-10 pointer-events-none transition-all duration-1000 ${tint || 'opacity-0'}`}></div>

      {children}
    </div>
  );
}
