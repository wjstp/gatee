import React from 'react';
import DictionaryIcon from "@assets/Icon3D/dictionary.png"
import {useMemberStore} from "../../../store/useMemberStore";
const Header = () => {
  const {name} = useMemberStore()
  return (
    <div>
      <img className="book-imgSize" src={DictionaryIcon} alt=""/>
      <h1>{name}의 백과사전</h1>
    </div>
  );
};

export default Header;
