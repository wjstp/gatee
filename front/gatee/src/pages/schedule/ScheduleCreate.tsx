import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom"
import dayjs, { Dayjs } from 'dayjs';

import { TextField } from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateValidationError } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider, Theme, useTheme } from '@mui/material/styles';
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import calculateWeekday from "@utils/calculateWeekday";
import getUserInfo from "@utils/getUserInfo";
import doMissionApiFunc from "@utils/doMissionApiFunc";
import getColorCode from "@utils/getColorCode";
import { useFamilyStore } from "@store/useFamilyStore";
import { useModalStore } from "@store/useModalStore";
import { SCHEDULE_COLOR } from "@constants/index";
import { createScheduleApi } from "@api/schedule";
import { CreateScheduleReq } from "@type/index";
import { ScheduleType } from "@type/index";
import CustomSwitch from "@components/CustomSwitch";

import { BsTextParagraph } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";
import { PiShapes } from "react-icons/pi";
import { GoPerson } from "react-icons/go";


const ScheduleCreate = () => {
  dayjs.locale('ko');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { familyInfo, familyId} = useFamilyStore();

  const [title, setTitle] = useState<string>("");
  const [emoji, setEmoji] = useState<string>("orange")
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>(ScheduleType.GROUP)
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [memberIdList, setMemberIdList] = useState<string[]>([]);
  const allMember: string[] = familyInfo.map(member => member.memberId);

  const [state, setState] = React.useState({bottom: false});
  const { setShowModal } = useModalStore();
  type Anchor = 'top' | 'left' | 'bottom' | 'right';

  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isStartDateError, setIsStartDateError] = useState<boolean>(false);
  const [isEndDateError, setIsEndDateError] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<DateValidationError | null>(null);
  const [endDateError, setEndDateError] = useState<DateValidationError | null>(null);
  const [isCreatingSchedule, setIsCreatingSchedule] = useState<boolean>(false);
  const [isAllDayCheck, setIsAllDayCheck] = useState<boolean>(false);

  const outerTheme = useTheme();

  useEffect(() => {
    setStartDate(dayjs(searchParams.get("start")));
    setEndDate(dayjs(searchParams.get("end")));
    setStartTime(dayjs(`${searchParams.get("start")} 00:00:00`));
    setEndTime(dayjs(`${searchParams.get("end")} 23:59:59`));
    setMemberIdList(allMember);
  }, [searchParams]);

  // 일정 생성
  const createSchedule = () => {
    if (isButtonEnabled()) {
      setIsCreatingSchedule(true);
      setShowModal(true);

      const data: CreateScheduleReq = {
        familyId,
        category,
        title,
        emoji,
        content,
        startDate: `${startDate?.format("YYYY-MM-DD")}T${startTime?.format("HH:mm:ss")}`,
        endDate: `${endDate?.format("YYYY-MM-DD")}T${endTime?.format("HH:mm:ss")}`,
        memberIdList
      }

      createScheduleApi(
        data,
        (res) => {
          setIsCreatingSchedule(false);
          setShowModal(false);
          doMissionApiFunc("SCHEDULE", null);
          navigate('/schedule');
        },
        (err) => {
          setIsCreatingSchedule(false);
          setShowModal(false);
          console.error(err);
        }
      ).then().catch()
    }
  }

  // 제목 입력 핸들러
  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  // 상세 내용 입력 핸들러
  const handleSetContent = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

  // 카테고리 선택 핸들러
  const handleSetCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);

    if (event.target.value as string === ScheduleType.GROUP) {
      setMemberIdList(allMember);
    }
    else {
      setMemberIdList([]);
    }
  }

  // 시작 일자 입력 핸들러
  const handleSetStartDate = (newValue: Dayjs | null) => {
    if (dayjs(newValue).isValid()) {
      setStartDate(newValue);
    }
  }

  // 시작 일자 에러 메시지
  const errorMessageStartDate = React.useMemo(() => {
    switch (startDateError) {
      case 'maxDate':
      case 'minDate':
      case 'invalidDate': {
        setIsStartDateError(true);
        return '유효한 날짜를 입력해 주세요';
      }

      default: {
        setIsStartDateError(false);
        return '';
      }
    }
  }, [startDateError]);

  // 종료 일자 입력 핸들러
  const handleSetEndDate = (newValue: Dayjs | null) => {
    if (dayjs(newValue).isValid()) {
      setEndDate(newValue);
    }
  }

  // 종료 일자 에러 메시지
  const errorMessageEndDate = React.useMemo(() => {
    switch (endDateError) {
      case 'maxDate':
      case 'invalidDate': {
        setIsEndDateError(true);
        return '유효한 날짜를 입력해 주세요';
      }

      case 'minDate': {
        setIsEndDateError(true);
        setEndDate(startDate);
        return '';
      }

      default: {
        setIsEndDateError(false);
        return '';
      }
    }
  }, [endDateError]);

  // 시작 시간 입력 핸들러
  const handleSetStartTime = (newValue: Dayjs | null) => {
    if (dayjs(newValue).isValid()) {
      setStartTime(newValue)
    } else {
      setStartTime(dayjs(`${searchParams.get("start")}T00:00:00`))
    }
  }

  // 종료 시간 입력 핸들러
  const handleSetEndTime = (newValue: Dayjs | null) => {
    if (dayjs(newValue).isValid()) {
      setEndTime(newValue);

      // 종료 시간이 유효하지 않은 경우 기본 값으로 설정
    } else {
      setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`));
    }
  }

  // 종료 시간 유효성 확인
  useEffect(() => {
    // 종료 시간이 시작 시간보다 이전이라면 기본 값으로 설정
    if (dayjs(startDate)?.isSame(dayjs(endDate)) && dayjs(endTime)?.isBefore(dayjs(startTime))) {
      setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`));
    }
  }, [startDate, endDate, startTime, endTime, searchParams]);

  // 하루 종일 체크 핸들러
  const handleALlDayCheck = () => {
    setIsAllDayCheck(!isAllDayCheck);
    
    // 시간 초기화
    setStartTime(dayjs(`${searchParams.get("start")}T00:00:00`));
    setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`));
  }

  useEffect(() => {
    if (category === ScheduleType.EVENT) {
      setIsAllDayCheck(true);

      // 날짜 및 시간 초기화
      setEndDate(startDate);
      setStartTime(dayjs(`${searchParams.get("start")}T00:00:00`));
      setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`));
    } else {
      setIsAllDayCheck(false);
    }
  }, [category]);

  // 참여자 입력 핸들러
  const handleSetParticipants = (value: string) => {
    if (memberIdList.includes(value)) {
      // 이미 참여자인 경우 참여자 목록에서 제거
      setMemberIdList(memberIdList.filter((memberId) => memberId !== value))
    } else {
      // 아직 참여자가 아닌 경우 참여자 목록에 추가
      setMemberIdList([...memberIdList, value]);
    }
  }

  // 참여자 프로필 렌더링
  const renderProfile = (memberId: string) => {
    const userInfo = getUserInfo(familyInfo, memberId);
    return (
      <div className="create-schedule-participant__profile-item" key={memberId}
           onClick={() => handleSetParticipants(memberId)}>
        <div
          className={`create-schedule-participant__profile-image${memberIdList.includes(memberId) ? '--active' : ''}`}>
          <img src={userInfo?.profileImageUrl} alt={userInfo?.nickname}/>
        </div>
        <div className="create-schedule-participant__profile-nickname">
          {userInfo?.nickname}
        </div>
      </div>
    );
  }

  // 참여자 수 반환
  const getParticipantNumber = (): string => {
    if (memberIdList.length === familyInfo.length) {
      return "전원 참여"
    } else {
      return `${memberIdList.length}명 참여`
    }
  }

  // 일정 생성 버튼 활성화 여부 계산
  const isButtonEnabled = () => {
    return title && !isStartDateError && !isEndDateError && !isCreatingSchedule;
  };

  // 슬라이드 다운 해서 내리기 기능 가능
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (open === true) {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({...state, [anchor]: open});
      };

  // 설정 탭에서 완료 버튼 누를 때 팝업 내리기
  const handleFinishTab = (event: React.MouseEvent) => {
    toggleDrawer('bottom', false)(event);
  }

  // 토스트 객체
  const renderColorList = (anchor: Anchor) => (
    <Box
      sx={{
        width: 'auto'
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      style={{backgroundColor: "#7B7B7B"}}
    >
      {/* 토스트 팝업 되는 컴포넌트 넣기 */}
      <InputColorToast/>
    </Box>
  );

  // 색상 모달
  const InputColorToast = () => {
    return (
      <div className="create-schedule__input-color">
        <div className="create-schedule__input-color-list">
          {SCHEDULE_COLOR.map((item, index) => (
            <button
              key={index}
              className={`create-schedule__input-color-item${item.name === emoji ? '--active' : ''}`}
              style={{backgroundColor: getColorCode(item.name).code}}
              onClick={(event) => {
                handleFinishTab(event);
                setEmoji(item.name);
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // mui custom
  const customTheme = (outerTheme: Theme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode,
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': '#efefef',
              '--TextField-brandBorderHoverColor': '#FFC773',
              '--TextField-brandBorderFocusedColor': '#FFBE5C',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)',
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&::before': {
                borderBottom: '1px solid var(--TextField-brandBorderColor)',
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)',
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)',
              },
            },
          },
        },
      },
    });

  return (
    <div className="create-schedule">
      {/*로딩*/}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isCreatingSchedule}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className="create-schedule__input-container">
        <div className="create-schedule__title">
          새 일정 만들기
        </div>

        <ThemeProvider theme={customTheme(outerTheme)}>
          <div className="create-schedule-info">
            {/*일정 제목 입력*/}
            <TextField
              fullWidth
              value={title}
              onChange={handleSetTitle}
              placeholder="일정 제목을 입력해 주세요"
              error={isTitleError}
              multiline
              variant="standard"
              spellCheck={false}
              InputProps={{
                style: {padding: '24px 0'},
                inputProps: {maxLength: 20},
                startAdornment: (
                  <InputAdornment position="start">
                    {/*일정 색상 선택*/}
                    <button
                      className="create-schedule-info__input-color-button"
                      onClick={toggleDrawer("bottom", true)}
                      style={{backgroundColor: getColorCode(emoji).code}}
                    >
                    </button>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" style={{fontSize: '15px', marginRight: '5px'}}>
                    {title.length}/20
                  </InputAdornment>
                )
              }}
            />

            {/*일정 내용 입력*/}
            <TextField
              fullWidth
              value={content}
              onChange={handleSetContent}
              placeholder="설명 추가"
              multiline
              maxRows={5}
              variant="standard"
              spellCheck={false}
              InputProps={{
                style: {padding: '24px 0'},
                inputProps: {maxLength: 1000},
                startAdornment: (
                  <InputAdornment position="start">
                    <BsTextParagraph size={24}/>
                  </InputAdornment>
                )
              }}
            />
          </div>

          {/*일정 기간 선택*/}
          <div className="create-schedule-period">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className="create-schedule-period__input">
                <div className="create-schedule-period__icon">
                  <IoTimeOutline size={24}/>
                </div>

                {/*시작 일자*/}
                <DateField
                  value={startDate}
                  format={`YYYY. MM. DD. ${calculateWeekday(startDate)}요일`}
                  onChange={handleSetStartDate}
                  onError={(newError) => setStartDateError(newError)}
                  variant="standard"
                  className="create-schedule-period__input-date"
                  slotProps={{
                    textField: {
                      helperText: errorMessageStartDate,
                    },
                  }}
                  InputProps={{
                    style: {padding: '20px 0', width: '220px'},
                  }}
                  FormHelperTextProps={{
                    style: {textAlign: 'center'},
                  }}
                />

                <div style={{flex: "1", borderBottom: "1px solid #efefef"}}></div>

                {/*시작 시간*/}
                <TimeField
                  value={startTime}
                  disabled={isAllDayCheck}
                  format="HH:mm"
                  onChange={handleSetStartTime}
                  variant="standard"
                  className="create-schedule-period__input-time"
                  InputProps={{
                    style: {padding: '20px 0', width: '60px'},
                  }}
                />
              </div>

              <div className="create-schedule-period__input">
                {/*종료 일자*/}
                <DateField
                  value={endDate}
                  disabled={category === ScheduleType.EVENT}
                  format={`YYYY. MM. DD. ${calculateWeekday(endDate)}요일`}
                  onChange={handleSetEndDate}
                  minDate={dayjs(startDate)}
                  onError={(newError) => setEndDateError(newError)}
                  variant="standard"
                  className="create-schedule-period__input-date"
                  slotProps={{
                    textField: {
                      helperText: errorMessageEndDate,
                    },
                  }}
                  InputProps={{
                    style: {padding: '20px 0', width: '220px'},
                  }}
                  FormHelperTextProps={{
                    style: {textAlign: 'center'},
                  }}
                />

                <div style={{flex: "1", borderBottom: "1px solid #efefef"}}></div>

                {/*종료 시간*/}
                <TimeField
                  value={endTime}
                  disabled={isAllDayCheck}
                  format="HH:mm"
                  onChange={handleSetEndTime}
                  variant="standard"
                  className="create-schedule-period__input-time"
                  InputProps={{
                    style: {padding: '20px 0', width: '60px'},
                  }}
                />
              </div>
            </LocalizationProvider>
          </div>
        </ThemeProvider>

        <div className="create-schedule-all-day">
          <p>하루 종일</p>
          <CustomSwitch
            checked={isAllDayCheck}
            onChange={handleALlDayCheck}
            sx={{marginRight: "5px"}}
            disabled={category === ScheduleType.EVENT}
          />
        </div>

        {/*일정 카테고리*/}
        <div className="create-schedule-category">
          <div className="create-schedule__wrapper">
            <div className="create-schedule__icon">
              <PiShapes size={24}/>
            </div>
            <p>일정 종류</p>
          </div>

          {/*일정 카테고리 선택*/}
          <FormControl variant="standard">
            <Select
              value={category}
              onChange={handleSetCategory}
            >
              <MenuItem value={ScheduleType.GROUP}>단체 일정</MenuItem>
              <MenuItem value={ScheduleType.PERSONAL}>개인 일정</MenuItem>
              <MenuItem value={ScheduleType.EVENT}>이벤트</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/*참여하는 사람*/}
        {category === ScheduleType.GROUP && (
          <>
            <div className="create-schedule-participant-title">
              <div className="create-schedule__wrapper">
                <div className="create-schedule__icon">
                  <GoPerson size={24}/>
                </div>
                <p>참석자 선택</p>
              </div>
              <div className="create-schedule-participant__number">
                {getParticipantNumber()}
              </div>
            </div>

            {/*가족 프로필*/}
            <div className="create-schedule-participant__profile">
              {familyInfo.map((member) => (
                renderProfile(member.memberId)
              ))}
            </div>
          </>
        )}
      </div>

      {/*색상 선택 모달*/}
      <SwipeableDrawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}>
        {renderColorList("bottom")}
      </SwipeableDrawer>

      <div className="create-schedule__button-create">
        <button
          disabled={!isButtonEnabled()}
          onClick={createSchedule}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default ScheduleCreate;