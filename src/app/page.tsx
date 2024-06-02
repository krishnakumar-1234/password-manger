import Image from "next/image";
import Footer from "./components/footer";
import Header from "./components/header";
import Userspass from "./userspass/page"
export default function Home() {
  return (
  <>
    <Header />
    <Userspass />
    <Footer />
    </>
  );
}
