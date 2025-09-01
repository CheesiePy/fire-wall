import './MainView.css';

export default function MainView({children}: {children: React.ReactNode}) {
  return (
    <main className="main">
      {children}
    </main>
  );
}
