import { getServerAuthToken } from "@/libs/server-cookies";

type UserSession = {
    email: string;
};

export const getServerUser = async (): Promise<UserSession | null> => {
    const token = await getServerAuthToken();
    if (!token) return null;

    const res = await fetch(`${process.env.API_URL}/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
};
