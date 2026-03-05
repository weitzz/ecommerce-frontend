import { getMe } from "@/actions/get-me";
import Header from "./header";

export default async function HeaderWrapper() {
    const me = await getMe();
    return (
        <Header
            isAuthenticated={me.success}
        />
    );
}
