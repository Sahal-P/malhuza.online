import Image from "@/components/common/Image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl overflow-y-hidden">
      <div className="flex items-center">
        <div className="relative min-w-[200px] min-h-[200px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] lg:w-[600px] lg:h-[600px]">
          {/* <img className="object-contain dark:hidden" src="/words.png" alt="" /> */}
          <Image blurhash="LZO|b2IU~qofIUj[t7ay-;ofM{ay" className="object-contain dark:hidden" src="/words.png" alt="words white" height={"100%"} width={"100%"} />
          <Image blurhash="L4Ci~;~q00of-;RjM{of00fQ?bWB" className="object-contain hidden dark:block" src="/words_dark.png" alt="words dark" height={"100%"} width={"100%"} />
          {/* <img className="object-contain hidden dark:block" src="/words_dark.png" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Heroes;
