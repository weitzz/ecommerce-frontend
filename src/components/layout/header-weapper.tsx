import { getServerAuthToken } from "@/libs/server-cookies";
import Header from "./header";

export default async function HeaderWrapper() {
    const token = await getServerAuthToken();

    console.log("TOKEN: ", token)

    return <Header isAuthenticated={!!token} />;
}
