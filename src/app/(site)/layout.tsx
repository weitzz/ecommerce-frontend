import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import HeaderWrapper from "@/components/layout/header-weapper";
import { StoreHydration } from "@/providers/store-hydration";


export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <>
            <StoreHydration />
            <HeaderWrapper />
            <main className="w-full max-w-6xl mx-auto p-6">
                {children}
            </main>
            <Footer />
        </>

    );
}
