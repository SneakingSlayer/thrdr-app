import {
  ErrorPage,
  LandingPage,
  ProfileDetails,
  ThreadForm,
  ThreadsSection,
} from "@/components";
import { getUserById } from "@/apiQueries";
import { notFound } from "next/navigation";
export default async function Home({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);
  if (!user) notFound();
  return (
    <>
      <ProfileDetails {...user} />
      <ThreadForm userId={params.id} name={user?.name ?? ""} />
      <ThreadsSection userId={params.id} />
    </>
  );
}
