import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import Header from '../../components/Header.js';
import { Avatar, Card } from 'antd';
import MatchDetail from '../../components/MatchDetail.js';

const { Meta } = Card;

const profile = () => {
  const router = useRouter();
  const { name } = router.query;
  const [userData, setUserData] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [isMatchLoading, setIsMatchLoading] = useState(false);

  const iconUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${userData.profileIconId}.jpg`;
  const getMatchList = (puuid) => {
    axios
      .get(`http://localhost:5000/match/getMatch/${puuid}`)
      .then((res) => {
        setData(res.data, puuid);
        setIsMatchLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setData = (res, id) => {
    let data = [];
    let matchList = [];
    data = res;

    for (const item of data) {
      let partItem = item.participants;
      for (const i of partItem) {
        if (i.puuid == id) {
          const unitItem = i.units;
          let cardList = new Object();
          let unitArr = [];

          for (const j of unitItem) {
            unitArr.push(j.character_id);
          }

          cardList.rank = i.placement;
          cardList.unit = unitArr;
          matchList.push(cardList);
        }
      }
    }

    setMatchData(matchList);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/getUser/${name}`)
      .then((res) => {
        setUserData(res.data);
        setIsUserLoading(true);
        getMatchList(res.data.puuid);
      })
      .catch((err) => {
        alert('존재하지 않는 소환사명입니다');
        router.back();
        console.log(err);
      });
  }, [name]);

  return (
    <Header>
      <div style={{ marginLeft: 100 }}>
        <Card style={{ width: 300, marginTop: 16 }} loading={!isUserLoading}>
          <Meta
            avatar={<Avatar src={iconUrl} />}
            title={userData.name}
            description={'lv.' + userData.summonerLevel}
          />
        </Card>
        {!isMatchLoading ? (
          <>
            <h5>Loading...</h5>
          </>
        ) : (
          <>
            {matchData.map((item) => (
              <MatchDetail rank={item.rank} unit={item.unit} />
            ))}
          </>
        )}
      </div>
    </Header>
  );
};

export default profile;
