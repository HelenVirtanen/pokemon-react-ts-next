import { NextRequest, NextResponse } from "next/server";
import prisma from "../../utils/connect";

export async function POST(req: NextRequest) {
  try {  

    const {userId, pokemon, action} = await req.json();

    // validate the action
    if (!["bookmark", "like"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    // find or create a new user 
    let user = await prisma.user.findUnique({
      where: {auth0Id: userId },
    }) 

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: userId,
          bookmarks: [],
          liked: []
        }
      })
    }

    // determine the action to take
    const fieldToUpdate = action === "bookmark" ? "bookmarks" : "liked";
    const currentItems = user[fieldToUpdate];

    // toggle Logic
    let updatedItems;
    if (currentItems.includes(pokemon)) {
      updatedItems = currentItems.filter((item) => item !== pokemon);
    } else {
      updatedItems = [...currentItems, pokemon];
    }

    // update the user
    await prisma.user.update({
      where: { auth0Id: userId },
      data: {
      [fieldToUpdate]: updatedItems,
      }
    })


    return NextResponse.json({
      toggleOff: currentItems.includes(pokemon),
      success: true,
      message: `Successfully ${action}ed ${pokemon}`,
    }); 
  } catch (error) {
    console.log("Error in linking of Bookmarking", error);

    return NextResponse.json(
      { message: "An error has occured while processing your request" },
      { status: 500 }
    );
  }
}
