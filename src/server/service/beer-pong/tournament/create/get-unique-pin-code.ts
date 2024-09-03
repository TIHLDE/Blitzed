import { db } from "../../../../db";

export const getUniquePinCode = async () => {
  let tournamentExists = false;
  let pinCode = "";

  do {
    // Generate a random 4 digit pin code
    pinCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Check if the code is in use
    const existingTournament = await db.beerPongTournament.findFirst({
      where: {
        pinCode,
      },
      select: {
        id: true,
      },
    });

    tournamentExists = Boolean(existingTournament);
  } while (tournamentExists);

  return pinCode;
};
