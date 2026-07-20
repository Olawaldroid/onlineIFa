import { permanentRedirect } from "next/navigation";

export default function MuseumPage() {
  permanentRedirect("/tradition#objects");
}
