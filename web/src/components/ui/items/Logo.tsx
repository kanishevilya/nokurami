import Image from "next/image";

export function Logo({
  width = 40,
  height = 40,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <div className="inline-flex">
      <Image
        src="/images/logo-white.svg"
        alt="logo"
        width={width}
        height={height}
        className="dark:block hidden"
      />
      <Image
        src="/images/logo-primary.svg"
        alt="logo"
        width={width}
        height={height}
        className="dark:hidden block"
      />
    </div>
  );
}
