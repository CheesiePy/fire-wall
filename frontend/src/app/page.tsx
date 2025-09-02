import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome to FireWall</h1>
      <p>Your one-stop solution for all firewall needs.</p>
      <Image src="/firewall_logo.png" alt="Firewall" width={500} height={300} />
    </div>
  );
}

