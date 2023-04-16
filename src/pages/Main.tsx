import { useSetPageTitle } from "@/hooks";
import MainPagePreview from "../components/MainPagePreview";
import Servers from "../components/servers";

export default function Main() {
  useSetPageTitle('SpectruM - Сервера Minecraft')

  return (
    <div>
      <MainPagePreview />
      <Servers />
    </div>
  )
}
