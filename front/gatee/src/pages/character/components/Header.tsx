import React from 'react';
import DictionaryIcon from "@assets/images/icon3D/dictionary.png"


const Header = ({ name }: { name: string | undefined; }) => {
  return (
    <div className="character__header">
      <img className="character__header__bookIconSize" src={DictionaryIcon} alt=""/>
      <h1>{name}의 백과사전</h1>
    </div>
  );
};

export default Header;