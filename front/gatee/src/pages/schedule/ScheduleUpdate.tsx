import React, {useEffect, useState} from 'react';
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {createTheme, Theme, ThemeProvider, useTheme} from "@mui/material/styles";
import {TextField} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import getColorCode from "@utils/getColorCode";
import {BsTextParagraph} from "react-icons/bs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {IoTimeOutline} from "react-icons/io5";
import {DateField} from "@mui/x-date-pickers/DateField";
import calculateWeekday from "@utils/calculateWeekday";
import {TimeField} from "@mui/x-date-pickers/TimeField";
import {ScheduleType} from "@type/index";
import dayjs, {Dayjs} from "dayjs";
import CustomSwitch from "@components/CustomSwitch";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {outlinedInputClasses} from "@mui/material/OutlinedInput";
import {useModalStore} from "@store/useModalStore";
import {DateValidationError} from "@mui/x-date-pickers";
import Box from "@mui/material/Box";
import {SCHEDULE_COLOR} from "@constants/index";
import {updateScheduleApi} from "@api/schedule";
import {useFamilyStore} from "@store/useFamilyStore";


const ScheduleUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const {familyId} = useFamilyStore();
  const [title, setTitle] = useState<string | null>("");
  const [emoji, setEmoji] = useState<string | null>("orange");
  const [content, setContent] = useState<string | null>("");
  const [category, setCategory] = useState<string | null>(ScheduleType.GROUP);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAllDayCheck, setIsAllDayCheck] = useState<boolean>(false);
  const outerTheme = useTheme();
  const [state, setState] = React.useState({bottom: false});
  const {setShowModal} = useModalStore();
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const [isTitleError, setIsTitleError] = useState<boolean>(false);
  const [isStartDateError, setIsStartDateError] = useState<boolean>(false);
  const [isEndDateError, setIsEndDateError] = useState<boolean>(false);
  const [startDateError, setStartDateError] = useState<DateValidationError | null>(null);
  const [endDateError, setEndDateError] = useState<DateValidationError | null>(null);
  const scheduleId = Number(location.pathname.match(/\/schedule\/(\d+)\/update/)?.[1]);

  useEffect(() => {
    setStartDate(dayjs(searchParams.get("start")));
    setEndDate(dayjs(searchParams.get("end")));
    setStartTime(dayjs(searchParams.get("start")));
    setEndTime(dayjs(searchParams.get("end")));
    setTitle(searchParams.get("title"));
    setContent(searchParams.get("content"));
    setEmoji(searchParams.get("emoji"));
    setCategory(searchParams.get("category"));
  }, [searchParams]);

  // 일정 수정
  const updateSchedule = () => {
    if (isButtonEnabled()) {
      if (scheduleId && familyId && title && category !== null && emoji !== null) {
        setIsLoading(true);
        const data = {
          familyId,
          category,
          title,
          emoji,
          content,
          startDate: `${startDate?.format("YYYY-MM-DD")}T${isAllDayCheck? "00:00:00" : startTime?.format("HH:mm:ss")}`,
          endDate: `${endDate?.format("YYYY-MM-DD")}T${isAllDayCheck? "23:59:59" : endTime?.format("HH:mm:ss")}`,
        }
        updateScheduleApi(
          {
            scheduleId: Number(scheduleId),
            data,
          },
          (res) => {
            setIsLoading(false);
            navigate(`/schedule/${scheduleId}`);
          },
          (err) => {
            setIsLoading(false);
            console.error(err);
          }
        ).then().catch()
      }
    }
  }

  // 제목 입력 핸들러
  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  // 상세 내용 입력 핸들러
  const handleSetContent = (event: React.ChangeEvent<HTMLInputElement>) => setContent(event.target.value);

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
  }

  // 슬라이드 다운 해서 내리기 기능 가능
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (open === true) {
          setShowModal(true)
        } else {
          setShowModal(false)
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
    toggleDrawer('bottom', false)(event)
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

  // 일정 생성 버튼 활성화 여부 계산
  const isButtonEnabled = () => {
    return title && !isStartDateError && !isEndDateError && !isLoading;
  };

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
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={isLoading}
        onClick={() => setIsLoading(false)}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      <div className="create-schedule__input-container">
        <div className="create-schedule__title">
          일정 수정하기
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
                      style={{backgroundColor: getColorCode(`${emoji ? emoji : "orange"}`).code}}
                    >
                    </button>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" style={{fontSize: '15px', marginRight: '5px'}}>
                    {title ? title.length : 0}/20
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
                  disabled={isAllDayCheck || category === ScheduleType.EVENT}
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
                  disabled={isAllDayCheck || category === ScheduleType.EVENT}
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
          onClick={updateSchedule}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default ScheduleUpdate;