import Link from "next/link";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <p>Logo</p>
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
          <Link href="/">some-icon</Link>
        </li>
      </ul>
    </nav>
  );
};


export default NavBar;
