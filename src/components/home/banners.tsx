"use client"
import { Banner } from "@/types/banner"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Props = {
    list: Banner[]
}

let bannerTimer: NodeJS.Timeout

export const Banners = ({ list }: Props) => {
    const [currentImg, setCurrentImg] = useState(0)

    const nextImg = () => {
        setCurrentImg(currentImg => {
            if (currentImg + 1 >= list.length) {
                return 0
            } else {
                return currentImg + 1
            }
        })
    }

    const handleBannerClick = (index: number) => {
        setCurrentImg(index)
        clearInterval(bannerTimer)
        bannerTimer = setInterval(nextImg, 3000)
    }

    useEffect(() => {
        bannerTimer = setInterval(nextImg, 3000)
        return () => clearInterval(bannerTimer)
    }, [])
    return (
        <section>
            <div className="relative aspect-[3/1]">
                {list.map((banner, index) => (
                    <Link
                        key={index}
                        href={banner.linkUrl}
                        className="transition-all absolute inset-0"
                        style={{ opacity: currentImg === index ? 1 : 0 }}
                    >
                        <Image
                            src={banner.imageUrl}
                            alt=""
                            width={1200}
                            height={400}
                            className="rounded-b-sm"
                        />
                    </Link>
                ))}
            </div>
            <div className="mt-4 flex justify-center gap-4">
                {list.map((banner, index) => (
                    <div key={index}
                        className="size-4 bg-blue-600 rounded-full cursor-pointer"
                        style={{ opacity: currentImg === index ? 1 : 0.3 }}
                        onClick={() => handleBannerClick(index)}>

                    </div>
                ))}
            </div>
        </section>
    )
}
