"use client";

type Props = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (p: number) => void;
};

export default function Pagination({
  page,
  limit,
  total,
  onPageChange,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <button
        className="px-3 h-10 rounded-xl border disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={page <= 1}
      >
        «
      </button>
      <button
        className="px-3 h-10 rounded-xl border disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Anterior
      </button>
      <span className="px-3 h-10 inline-flex items-center">
        Página {page} / {totalPages}
      </span>
      <button
        className="px-3 h-10 rounded-xl border disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
      >
        Siguiente
      </button>
      <button
        className="px-3 h-10 rounded-xl border disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={page >= totalPages}
      >
        »
      </button>
    </div>
  );
}
