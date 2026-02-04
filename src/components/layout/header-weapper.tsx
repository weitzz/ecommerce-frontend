import { getServerAuthToken } from "@/libs/server-cookies";
import Header from "./header";

export default async function HeaderWrapper() {
    const token = await getServerAuthToken();

    return <Header isAuthenticated={!!token} />;
}
