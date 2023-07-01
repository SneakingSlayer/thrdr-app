import {
  ErrorPage,
  LandingPage,
  ProfileDetails,
  ThreadForm,
  ThreadsSection,
} from "@/components";
import { getUserById } from "@/api";
export default async function Home({ params }: { params: { id: string } }) {
  if (!params.id) return <LandingPage />;
  const user = await getUserById(params.id);
  if (!user) return <ErrorPage />;
  return (
    <>
      <ProfileDetails {...user} />
      <ThreadForm userId={params.id} name={user?.name ?? ""} />
      <ThreadsSection userId={params.id} />
    </>
  );
}
