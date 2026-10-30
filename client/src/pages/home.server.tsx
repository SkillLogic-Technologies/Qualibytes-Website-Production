/**
 * Server/prerender-only entry for the home page. Used exclusively by
 * scripts/prerender.tsx in place of client/src/pages/home.tsx's default
 * export, which wraps the same HomeBody in React.lazy()+Suspense for
 * browser code-splitting — lazy() can't be rendered by the synchronous
 * renderToString() the prerender script uses. This renders the exact same
 * markup with both heavy sections statically imported instead.
 */
import SuccessStories from "@/components/success-stories";
import IndustriesPieSection from "@/components/industries-pie-section";
import { HomeBody } from "./home";

export default function HomeServer() {
  return (
    <HomeBody
      IndustriesPieSection={IndustriesPieSection}
      SuccessStories={SuccessStories}
      showAdvisorPopup={false}
      onCloseAdvisorPopup={() => {}}
    />
  );
}
