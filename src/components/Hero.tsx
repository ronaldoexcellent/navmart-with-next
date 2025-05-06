export default function Hero() {
    return (
        <div className="text-center font-black text-4xl p-8 pb-0 mt-2 mx-auto w-1/2 leading-normal hidden sm:block">
            Navigate every store at your fingertips
            <div className="flex -mt-16 justify-center">
                {/* <Image
                    src="/heroline.png"
                    alt="Hero-Line"
                    width={135}
                    height={40}
                /> */}
                <svg width="130" height="100" xmlns="http://www.w3.org/2000/svg" className="rotate-[25deg]">
                    <path d="M10 100 C 150 0, 350 0, 490 100" stroke="green" fill="transparent" strokeWidth="5"/>
                </svg>

            </div>
        </div>
    );
}