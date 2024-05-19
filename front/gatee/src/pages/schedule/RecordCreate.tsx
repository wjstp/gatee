import React, {useEffect, useRef, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useFamilyStore} from "@store/useFamilyStore";
import {createRecordApi} from "@api/schedule";
import {imageResizer} from "@utils/imageResizer";
import {uploadFileApi} from "@api/file";
import TextField from '@mui/material/TextField';
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {IoCloseOutline} from "react-icons/io5";
import {useModalStore} from "@store/useModalStore";


const RecordCreate = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {familyId} = useFamilyStore();
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [fileIdList, setFileIdList] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {setShowModal} = useModalStore();

  // id를 number 타입으로 변환
  useEffect(() => {
    if (id) {
      setScheduleId(parseInt(id, 10));
    }
  }, [id]);

  // 카메라 버튼 클릭 핸들러
  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 일정 후기 작성
  // 파일 업로드
  const handleCreateRecordClick = async () => {
    setIsLoading(true);
    setShowModal(true);

    if (files.length === 0) {
      // 파일이 선택되지 않은 경우 바로 createRecordApi 호출
      createRecord();
      return;
    }

    const uploadedFileIds: (number | null)[] = await Promise.all(files.map(async (file: File) => {
      try {
        // 이미지 리사이저
        const resizedFile: File = (await imageResizer(file, 1000, 1000)) as File;
        // FormData 객체 생성
        const formData = new FormData();
        formData.append("fileType", "MESSAGE");
        formData.append('file', resizedFile);

        // 파일 업로드
        const response = await new Promise<number>((resolve, reject) => {
          uploadFileApi(
            formData,
            (res) => {
              resolve(res.data.fileId);
            },
            (err) => {
              reject(err);
            }
          );
        });

        return response;
      } catch (error) {
        console.error(error);
        return null;
      }
    }));

    // 유효한 fileId만 필터링하여 상태 업데이트
    const validFileIds: number[] = uploadedFileIds.filter((id: number | null): id is number => id !== null);
    setFileIdList(validFileIds);

  };

  // 파일 업로드가 완료되면 createRecordApi 호출
  useEffect(() => {
    if (fileIdList.length > 0) {
      createRecord();
    }
  }, [fileIdList]);

  // 일정 후기 작성
  const createRecord = async () => {
    if (scheduleId && familyId) {
      try {
        createRecordApi(
          {
            scheduleId,
            data: {
              familyId,
              content,
              fileIdList
            }
          },
          (res) => {
            setIsLoading(false);
            setShowModal(false);
            navigate(`/schedule/${scheduleId}`);
          },
          (err) => {
            setIsLoading(false);
            setShowModal(false);
            console.log(err);
          }
        );
      } catch (err) {
        setIsLoading(false);
        setShowModal(false);
        console.error(err);
      }
    }
  };

  // 파일 선택 핸들러
  const handleSetFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  // 미리보기 이미지 삭제 핸들러
  const handlePreviewImageDeleteClick = (index: number) => {
    if (files) {
      const newFiles = [...files];
      newFiles.splice(index, 1);
      setFiles(newFiles);
    }
  }

  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFFFF",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFFFF",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#FFFFFF",
      }
    }
  };

  return (
    <div className="create-record">
      {/*로딩*/}
      <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={isLoading}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>

      <div className="create-record__title">
        {/*사진 입력*/}
        <div className="create-record__photo-button" onClick={handleCameraClick}>
          <MdOutlineAddPhotoAlternate size={22}/>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleSetFile}
            multiple
          />
        </div>

        {/*제목*/}
        <p>추억 기록하기</p>

        {/*저장*/}
        <div className="create-record__create-button">
          <button onClick={handleCreateRecordClick}>
            저장
          </button>
        </div>
      </div>

      {/*내용 작성*/}
      <div className="create-record__content">
        <TextField
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="일정에 대한 이야기를 나눠 보세요"
          multiline
          fullWidth
          autoFocus
          minRows={5}
          maxRows={10}
          spellCheck={false}
          sx={muiFocusCustom}
          InputProps={{inputProps: {maxLength: 200}}}
        />
        <div className="create-record__content__length">
          {`${content.length}/200`}
        </div>
      </div>

      {/*사진 미리보기*/}
      <div className="create-record__previews">
        {files.map((file, index) => (
          <div className="create-record__preview">
            <img key={index} src={URL.createObjectURL(file)} alt={`preview-${index}`}/>

            {/*삭제 버튼*/}
            <button className="chat-input__preview__button" onClick={() => handlePreviewImageDeleteClick(index)}>
              <IoCloseOutline size={20}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordCreate;
