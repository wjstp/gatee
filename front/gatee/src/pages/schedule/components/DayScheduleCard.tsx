import React from 'react';
import { NavLink } from "react-router-dom";
import { ScheduleListRes, ScheduleType } from '@type/index';
import getColorCode from "@utils/getColorCode";
import { VscCommentDiscussion } from "react-icons/vsc";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";

type DayScheduleProps = {
  schedule: ScheduleListRes;
};

const Group = (props: DayScheduleProps) => {
  const { schedule } = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-item"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji).code}`}}></div>

      <div className="day-toast__group">
        {schedule.title}
      </div>

      {/*기록 수*/}
      <div className="day-toast__record">
        <VscCommentDiscussion size={15} />
        {schedule.scheduleRecordCount}
      </div>

      {/*참여자 리스트*/}
      <AvatarGroup max={6} className="day-toast__group__participate">
        { schedule.participateMembers.map((participateMember: {profileImageUrl: string; nickname: string}, index: number) => {
          return <Avatar src={participateMember.profileImageUrl} alt={participateMember.nickname} key={index}/>;
        }) }
      </AvatarGroup >
    </NavLink>
  );
};

const Personal = (props: DayScheduleProps) => {
  const {schedule} = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-item"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji).code}`}}></div>

      <div className="day-toast__personal">
        {/*참여자 프로필*/}
        <div className="day-toast__personal__profile">
          <img src={schedule.participateMembers[0].profileImageUrl} alt="profile"/>
        </div>
        {schedule.title}
      </div>

      {/*기록 수*/}
      <div className="day-toast__record">
        <VscCommentDiscussion size={15} />
        {schedule.scheduleRecordCount}
      </div>
    </NavLink>
  );
};

const Event = (props: DayScheduleProps) => {
  const {schedule} = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-item"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji).code}`}}></div>

      <div className="day-toast__event">
        <p
          style={{
            textDecoration: "underline",
            textDecorationColor: `${getColorCode(schedule.emoji).code}`,
            textDecorationStyle: "wavy"
          }}
        >{schedule.title}</p>
        <div className="day-toast__event__icon">
          <img src={getColorCode(schedule.emoji).image} alt="ic_calendar"/>
        </div>
      </div>

      {/*기록 수*/}
      <div className="day-toast__record">
        <VscCommentDiscussion size={15}/>
        {schedule.scheduleRecordCount}
      </div>
    </NavLink>
  );
};

const DayScheduleCard = (props: DayScheduleProps) => {
  const {schedule} = props;

  switch (schedule.category) {
    case ScheduleType.GROUP:
      return <Group schedule={schedule}/>;
    case ScheduleType.PERSONAL:
      return <Personal schedule={schedule} />;
    case ScheduleType.EVENT:
      return <Event schedule={schedule} />;
    default:
      return null;
  }
};

export default DayScheduleCard;