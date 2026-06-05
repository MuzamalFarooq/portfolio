export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface)]">
      <div className="w-12 h-12 rounded-full border-2 border-accent border-t-transparent animate-spin" />
    </div>
  );
}
