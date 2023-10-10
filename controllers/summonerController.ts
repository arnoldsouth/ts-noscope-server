import axios from 'axios';
import { Request, Response } from 'express';
// const { encrypt, decrypt } = require('../middleware/crypto');

const platformURL = `https://na1.api.riotgames.com`;
const ddragonVersion = `13.19.1`;

interface SummonerResponse {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIcon: string;
  revisionDate: string;
  summonerLevel: number;
}

const getSummonerApi = (req: Request, res: Response) => {
  res.status(200).json({ 'api-route-summoner': 'good' });
};

const getSummonerProfile = async (
  req: Request,
  res: Response
): Promise<SummonerResponse> => {
  const { name } = req.params;
  const summonerName = name.replace(' ', '').toLowerCase();

  try {
    const response = await axios.get<SummonerResponse>(
      `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
    );
    return response.data;

    // const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${response.data.profileIconId}.png`;

    // const resData = {
    //   id: response.data.id,
    //   accountId: response.data.accountId,
    //   puuid: response.data.puuid,
    //   name: response.data.name,
    //   profileIcon: summonerIconUrl,
    //   revisionDate: response.data.revisionDate,
    //   summonerLevel: response.data.summonerLevel,
    //   error: false,
    // };

    // return res.json(resData);
  } catch (err: any) {
    throw new Error(err.response.status);
    // return res.json(err.response.status);
  }
};

export { getSummonerApi, getSummonerProfile };

// const getSummonerExtensive = async (req, res) => {
//   const { name } = req.params;
//   const summonerName = name.replace(' ', '').toLowerCase();
//   const leagueData = [];
//   // let idDecrypted = decrypt(id);

//   const response = await axios
//     .get(
//       `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
//     )
//     .catch((err) => res.json(err.status));

//   const leagueResponse = await axios.get(
//     `${platformURL}/lol/league/v4/entries/by-summoner/${response.data.id}?api_key=${process.env.RIOT_TOKEN}`
//   );
//   const leagueResponse = await axios.get(
//     `${platformURL}/lol/league/v4/entries/by-summoner/${idDecrypted}?api_key=${process.env.RIOT_TOKEN}`
//   );

//   leagueResponse?.data
//     .filter((league) => league?.queueType !== 'RANKED_TFT_PAIRS')
//     .forEach((league) => {
//       leagueData.push({
//         leagueId: league.leagueId,
//         type: league.queueType,
//         tier: league.tier,
//         rank: league.rank,
//         lp: league.leaguePoints,
//         wins: league.wins,
//         losses: league.losses,
//         hotStreak: league.hotStreak,
//       });
//     });

//   const summonerIconUrl = `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/profileicon/${response.data.profileIconId}.png`;

//   const resData = {
//     id: response.data.id,
//     accountId: response.data.accountId,
//     puuid: response.data.puuid,
//     name: response.data.name,
//     profileIcon: summonerIconUrl,
//     revisionDate: response.data.revisionDate,
//     summonerLevel: response.data.summonerLevel,

//     error: false,
//   };

//   return res.json(resData);
// };

// export default { getSummonerApi, getSummonerProfile };
