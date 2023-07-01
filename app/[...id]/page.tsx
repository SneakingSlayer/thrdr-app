import {
  ErrorPage,
  ProfileDetails,
  ThreadForm,
  ThreadsSection,
} from "@/components";
import { getUserById } from "@/api";
import { redirect } from "next/navigation";
// params: { params: { id: string } }
export default async function Home({ params }: { params: { id: string } }) {
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
