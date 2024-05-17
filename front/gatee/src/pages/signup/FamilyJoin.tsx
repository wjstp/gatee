import React, {useState, useRef, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { useFamilyStore } from "@store/useFamilyStore";
import { getMyDataApi, getFamilyDataApi } from "@api/member";
import base64 from "base-64";

const SignupFamilyJoin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { setFamilyCode, setFamilyId, setStringImage, setFamilyName } = useFamilyStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // 권한에 따라 redirect
  useEffect(() => {
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      }
    }
  }, []);

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 8) {
      setCode(value);
      setErrorMessage("");
    }
  }

  // 입력하기 버튼 클릭 처리
  const goToFamilyJoinCheck = (): void => {
    // 입력값이 8글자의 대문자 영어와 숫자로 구성되어 있는지 확인
    if (code.length !== 8 || !/^[a-zA-Z0-9]*$/.test(code)) {
      setErrorMessage('8글자의 영어와 숫자만 입력해주세요.');
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return; // 함수 실행 중단
    } else {
      getFamilyData();
    }
  };

  // 가족 코드로 가족 조회하기
  const getFamilyData = () => {
    getFamilyDataApi(
      {
        familyCode: code
      },
      (res: AxiosResponse<any>) => {
        console.log(res);
        setFamilyCode(code);
        setFamilyId(res.data.familyId);
        setFamilyName(res.data.familyName);
        setStringImage(res.data.familyImageUrl);
        navigate("/signup/family-join/check")
      },
      (err: AxiosError<any>) => {
        console.log(err);
        alert("코드를 다시 확인해 보세요!")
      }
    ).then().catch();
  }

  // 가족 생성 버튼 클릭 처리
  const goToFamilySet = (): void => {
    navigate("/signup/family-set");
  }

  return (
    <div className="signup-family-join slide-in">

      {/*제목*/}
      <div className="signup-family-join__title">
        <span className="title__part--01">
          초대 코드를 입력
        </span>
        <span className="title__part--02">
            해 주세요
        </span>
      </div>

      {/*코드 입력 박스*/}
      <div className="signup-family-join__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          placeholder="예) a43eg5Fc"
          value={code}
          onChange={handleInputChange}
          spellCheck={false}
        />
      </div>
      <div className="signup-family-set__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          "　"
        )}
      </div>

      {/*입력하기 버튼*/}
      <div className="signup-family-join__btn">
        <button
          className="btn-input"
          onClick={goToFamilyJoinCheck}
          disabled={!code}
        >
            <span className="btn-input__text">
              입력하기
            </span>
        </button>
      </div>

      {/*가족 생성*/}
      <div className="signup-family-join__create">
        <button
          className="btn-create"
          onClick={goToFamilySet}
        >
          <span className="btn-create__text">
            초대 코드를 받지 못했나요?
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupFamilyJoin;