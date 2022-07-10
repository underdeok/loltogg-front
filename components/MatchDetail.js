import React from 'react';
import { Avatar, Divider, Tooltip } from 'antd';

const championImage = (url) => {
  return (
    <Avatar
      src={`https://raw.communitydragon.org/latest/game/assets/characters/tft7_${url}/hud/tft7_${url}_square.tft_set7.png`}
    />
  );
};

const MatchDetail = (props) => {
  const rank = props.rank;
  let units = [];
  units = props.unit;
  return (
    <>
      <div>{rank}등</div>
      <Avatar.Group>
        {units.map((item, index) => {
          let lowerItem = item.toLowerCase();
          return (
            <Avatar
              src={`https://raw.communitydragon.org/latest/game/assets/characters/${lowerItem}/hud/${lowerItem}_square.tft_set7.png`}
              size="large"
              shape="square"
              gap="4"
              style={{ marginLeft: '5px' }}
              key={index}
            />
          );
        })}
      </Avatar.Group>
    </>
  );
};

export default MatchDetail;
