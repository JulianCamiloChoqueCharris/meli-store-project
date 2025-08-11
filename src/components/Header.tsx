import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 bg-[#ffe600] box-border">
      <div className="h-full max-w-7xl mx-auto px-4 flex gap-2 items-center">
        <Image
          src="/Images/webp/logo_large_plus@2x.webp"
          alt="Logo"
          width={150}
          height={40}
        />
        <div className="h-10 w-1 bg-[#303172]"></div>
        <h1 className="text-xl text-[#303172] font-bold">Cliente CS3</h1>
      </div>
    </header>
  );
}
