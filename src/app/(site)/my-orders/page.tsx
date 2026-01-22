import { getServerAuthToken } from "@/libs/server-cookies";
import { redirect } from "next/navigation";

export default async function Page() {
    const token = await getServerAuthToken();

    if (!token) {
        redirect("/login");
    }

    return <div>My Orders Page</div>;

}
