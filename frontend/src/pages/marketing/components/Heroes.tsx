import { FC } from "react";

interface HeroesProps {}

const Heroes: FC<HeroesProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl overflow-y-hidden">
      <div className="flex items-center">
        <div className="relative min-w-[200px] min-h-[200px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px] lg:w-[600px] lg:h-[600px]">
          <img className="object-contain dark:hidden" src="/words.png" alt="" />
          <img className="object-contain hidden dark:block" src="/words_dark.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
