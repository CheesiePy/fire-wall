import Link from "next/link";
import Image from "next/image";
import "./NavBar.css";


const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/"><Image src="/firewall_logo.svg" alt="Logo" width={50} height={50} /></Link>
        </li>
        <li>
          <Link href="/overview">Overview</Link>
        </li>
        <li>
          <Link href="/kernel-modules">Kernel Modules</Link>
        </li>
        <li>
          <Link href="/firewall-rules">Firewall Rules</Link>
        </li>
        <li>
          <Link href="/api-interface">API Interface</Link>
        </li>
        <li>
          <Link href="/logs-and-tests">Logs and Tests</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>

        </li>
      </ul>
    </nav>
  );
};


export default NavBar;
