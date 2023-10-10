import axios from 'axios';
import { Request, Response } from 'express';
import { getSummonerProfile } from './summonerController';

const regionURL = `https://americas.api.riotgames.com`;
const platformURL = `https://na1.api.riotgames.com`;

// interface SummonerResponse {
//   id: string;
//   accountId: string;
//   puuid: string;
//   name: string;
//   profileIcon: string;
//   revisionDate: string;
//   summonerLevel: number;
// }

const getMatchApi = (req: Request, res: Response) => {
  res.status(200).json({ 'api-route-match': 'good' });
};

const getMatchHistory = async (req: Request, res: Response) => {
  const { name, count } = req.params;
  let puuid = '';
  let matchIds: string[] = [];

  const summonerName = name.replace(' ', '').toLowerCase();

  try {
    const summonerProfile = await getSummonerProfile(req, res);
    puuid = summonerProfile.puuid;
    // const summonerByName = await axios.get(
    //   `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
    // );
    // puuid = summonerByName.data.puuid;
  } catch (err: any) {
    return res.json(err.response.status);
  }

  try {
    const response = await axios.get(
      `${regionURL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}&api_key=${process.env.RIOT_TOKEN}`
    );
    matchIds = response.data;
    console.log(matchIds);
  } catch (err: any) {
    return res.json(err.response.status);
  }

  let matchDataArray: string[] = [];
  for (let i = 0; i < matchIds.length; i++) {
    const gameId = matchIds[i];
    try {
      const response = await axios.get(
        `${regionURL}/lol/match/v5/matches/${gameId}?api_key=${process.env.RIOT_TOKEN}`
      );

      matchDataArray.push(response.data);
    } catch (err: any) {
      return res.json(err.response.status);
    }

    return res.json(matchDataArray);
  }
};

export { getMatchApi, getMatchHistory };
