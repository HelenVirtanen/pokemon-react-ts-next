import React from "react";
import { heartEmpty, bookmarkEmpty, heartFilled, bookmarkFilled, arrowAngleRight } from "../utils/icons";
import { useUser } from "@auth0/nextjs-auth0";
import { useGlobalContext } from "../context/globalContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { typeColor } from "../utils/colors";

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
            onClick={()=> {
              if(user?.sub) {
                setLiked((prev:boolean) => !prev);
                performAction(user?.sub, pokemon?.name, "like");
                console.log("LIKED");
              } else {
                router.push("/auth/login")
              }
            }}
          >
            {liked ? heartFilled : heartEmpty}
          </button>
          <button
            className={`p-2 w-10 h-10  bg-orange-100 text-xl flex items-center justify-center rounded-full border-2 border-gray-300
               ${
                 bookmarked
                   ? "text-[#fd4878] border-[#fd4878]"
                   : "text-gray-300 border-gray-300"
               }
              `}
              onClick={()=> {
              if(user?.sub) {
                setBookmarked((prev:boolean) => !prev);
                performAction(user?.sub, pokemon?.name, "bookmark");
              } else {
                router.push("/auth/login")
              }
            }}
          >
            {bookmarked ? bookmarkFilled : bookmarkEmpty}
          </button>
        </div>
        <button
          className={`p-2 w-10 h-10 bg-gray-100 text-xl text-gray-300 flex items-center justify-center rounded-full border-2 border-gray-300 hover:bg-[#2f70b7] hover:border-transparent hover:text-white transition-all duration-200 ease-in-out`}
          onClick={() => router.push(`/pokemons/${pokemon?.name}`)}
        >
          {arrowAngleRight}
        </button>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <Image
            src={
              pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
              pokemon?.sprites?.front_default
            }
            alt="Pokemon image"
            className="object-contain"
            width={200}
            height={200}
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="mb-2 flex gap-2">
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.height}m
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.weight}kg
            </p>
            <p className="text-xs uppercase font-semibold text-gray-500">
              {pokemon?.base_experience}XP
            </p>
          </div>
          <h2 className="text-2xl text-[#2f70b7] capitalize font-bold text-center">
            {pokemon?.name}
          </h2>
          <div className="flex justify-center gap-2">
            {pokemon?.types?.map((type: any, index: number) => (
              <p
                key={index}
                className="text-xs uppercase font-semibold text-black px-5 py-1 rounded-full"
                style={{ backgroundColor: typeColor[type?.type?.name] }}
              >
                {type.type.name}
              </p>
            ))}
          </div>
          <div>
            <p>{pokemon?.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
