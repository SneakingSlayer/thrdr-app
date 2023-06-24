import { ProfileDetails, ThreadForm, ThreadsSection } from "@/components";
import { getUserById } from "@/queries";

export default async function Home(params: { params: { id: string } }) {
  const user = await getUserById(params.params.id);
  if (!user) return <h1>ERROR 404</h1>;
  return (
    <>
      <ProfileDetails {...user} />
      <ThreadForm userId={params.params.id} name={user?.name ?? ""} />
      <ThreadsSection userId={params.params.id} />
    </>
  );
}
