import React from "react";
import { heartEmpty, bookmarkEmpty, arrowAngleRight } from "../utils/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useGlobalContext } from "../context/globalContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: any;
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  const { user } = useUser();
  const { performAction, userDetails } = useGlobalContext();
  const router = useRouter();

  const isLiked = userDetails?.liked?.includes(pokemon?.name);
  const isBookmarked = userDetails?.bookmarks?.includes(pokemon?.name);

  const [liked, setLiked] = React.useState(isLiked);
  const [bookmarked, setBookmarked] = React.useState(isBookmarked);

  return (
    <div className="relative p-4 bg-white rounded-xl shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 bg-white rounded-tl-xl rounded-tr-xl">
          <button
            className={`p-2 w-10 h-10 bg-purple-100 text-xl flex items-center justify-center rounded-full border-2 border-gray-300
               ${
                 liked
                   ? "text-[#fd4878] border-[#fd4878]"
                   : "text-gray-300 border-gray-300"
               }
              `}
          >
            {heartEmpty}
          </button>
          <button
            className={`p-2 w-10 h-10  bg-orange-100 text-xl flex items-center justify-center rounded-full border-2 border-gray-300
               ${
                 bookmarked
                   ? "text-[#fd4878] border-[#fd4878]"
                   : "text-gray-300 border-gray-300"
               }
              `}
          >
            {bookmarkEmpty}
          </button>
        </div>
        <button
          className={`p-2 w-10 h-10 bg-gray-100 text-xl text-gray-300 flex items-center justify-center rounded-full border-2 border-gray-300 hover:bg-[#2f70b7] hover:border-transparent hover:text-white transition-all duration-200 ease-in-out`}
          onClick={() => router.push(`/pokemon/${pokemon?.name}`)}
        >
          {arrowAngleRight}
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex-1>">
          <Image
            src={pokemon?.sprites?.other?.["official-artwork"]?.front_default}
            alt="Pokemon image"
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
