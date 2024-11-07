export default function Avatar({ src }: { src: string }) {
  return (
    <div className="w-16 h-16 overflow-hidden rounded-full">
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
