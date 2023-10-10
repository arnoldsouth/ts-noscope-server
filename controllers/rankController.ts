import axios from 'axios';
import { Request, Response } from 'express';

const platformURL = `https://na1.api.riotgames.com`;

const getRankApi = (req: Request, res: Response) => {
  res.status(200).json({ 'api-route-rank': 'good' });
};

const getCurrentRank = async (req: Request, res: Response) => {
  const { name } = req.params;
  const summonerName = name.replace(' ', '').toLowerCase();
  let id = '';

  try {
    const response = await axios.get(
      `${platformURL}/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.RIOT_TOKEN}`
    );
    id = response.data.id;
  } catch (err: any) {
    return res.json(err.response.status);
  }

  let summonerRank: Record<string, string> = {};

  try {
    const response = await axios.get(
      `${platformURL}/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.RIOT_TOKEN}`
    );
    const rankData = response.data;

    summonerRank['rank'] = response.data[0].rank;
    summonerRank['tier'] = response.data[0].tier;

    console.log({ summonerRank });
  } catch (err: any) {
    return res.json(err.response.status);
  }

  //   {
  //     tier: response.data.tier,
  //     rank: response.data.rank,
  //     leaguePoints: response.data.leaguePoints,
  //     wins: response.data.wins,
  //     losses: response.data.losses,
  //   };
  //   return res.json(summonerRank);

  console.log({ summonerRank });
  return res.json(summonerRank);
};

export { getRankApi, getCurrentRank };
