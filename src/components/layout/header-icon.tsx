import Image from 'next/image';
type Props = {
    src: string
    alt: string
    width: number | `${number}`
    height: number | `${number}`
    selected?: boolean
    srcSelect?: string
}
function HeaderIcon({ src, alt, width, height, selected, srcSelect }: Props) {
    return (
        <div className={`size-12 border border-gray-200 rounded-sm flex justify-center items-center ${selected ? "bg-blue-600" : ""}`} >
            {!selected &&
                <Image src={src} alt={alt} width={width} height={height} />
            }
            {selected && srcSelect &&
                <Image src={srcSelect} alt={alt} width={width} height={height} />
            }
        </div>
    )
}

export default HeaderIcon