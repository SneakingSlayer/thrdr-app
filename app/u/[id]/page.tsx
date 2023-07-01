import {
  ErrorPage,
  LandingPage,
  ProfileDetails,
  ThreadForm,
  ThreadsSection,
} from "@/components";
import { getUserById } from "@/apiQueries";
import { redirect } from "next/navigation";
export default async function Home({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  // if (!user) return redirect("/404");
  return (
    <>
      <ProfileDetails {...user} />
      <ThreadForm userId={params.id} name={user?.name ?? ""} />
      <ThreadsSection userId={params.id} />
    </>
  );
}
