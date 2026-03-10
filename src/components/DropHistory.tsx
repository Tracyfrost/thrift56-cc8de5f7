import { Link } from "react-router-dom";
import { getArchivedPieces, statusConfig } from "@/data/artPieces";

const DropHistory = () => {
  const archived = getArchivedPieces();
  if (archived.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE ARCHIVE</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Past Drops</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {archived.map((piece) => (
            <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-sm border border-border">
                <img
                  src={piece.afterImage}
                  alt={piece.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className={`absolute top-2 right-2 px-2 py-0.5 text-[9px] font-heading uppercase tracking-widest rounded-sm ${statusConfig[piece.status].badgeClass}`}>
                  {statusConfig[piece.status].label}
                </span>
              </div>
              <p className="font-heading text-sm font-bold mt-2 group-hover:text-rust transition-colors">
                {piece.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropHistory;
