import TopBar from "./TopBar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <div className="absolute top-0 left-0 w-full z-50">
      <TopBar />
      <Navbar />
    </div>
  );
}