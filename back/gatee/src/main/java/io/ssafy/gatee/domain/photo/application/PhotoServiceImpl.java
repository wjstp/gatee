package io.ssafy.gatee.domain.photo.application;

import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.photo.dao.PhotoRepository;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.reaction.dao.ReactionRepository;
import io.ssafy.gatee.domain.reaction.dto.response.ReactionMemberRes;
import io.ssafy.gatee.domain.reaction.entity.Reaction;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermission;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;

    private final MemberRepository memberRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    private final ReactionRepository reactionRepository;

    private final FileRepository fileRepository;

    // 사진 상세 조회
    @Override
    public PhotoDetailRes readPhotoDetail(Long photoId, UUID memberId) {
        Photo photo = photoRepository.getReferenceById(photoId);

        List<Reaction> reactionList = reactionRepository.findAllByPhoto(photo);

        List<ReactionMemberRes> reactionMemberResList = reactionList.stream()
                .map(ReactionMemberRes::toDto).toList();

        boolean isReaction = false;

        List<Boolean> booleans = reactionList.stream().map((Reaction reaction) -> memberId.equals(reaction.getMember().getId())).toList();

        if (booleans.contains(true)) {
            isReaction = true;
        }

        return PhotoDetailRes.builder()
                .photoId(photoId)
                .imageUrl(photo.getFile().getUrl())
                .reactionList(reactionMemberResList)
                .isReaction(isReaction)
                .build();
    }

    // 사진 등록
    @Override
    @Transactional
    public Long savePhoto(PhotoSaveReq photoSaveReq) {
        MemberFamily memberFamily = memberFamilyRepository.getReferenceById(photoSaveReq.memberFamilyId());

        File file = fileRepository.getReferenceById(photoSaveReq.fileId());

        Photo photo = Photo.builder()
                .memberFamily(memberFamily)
                .file(file)
                .build();

        photoRepository.save(photo);

        return photo.getId();
    }

    // 사진 삭제
    @Override
    @Transactional
    public void deletePhoto(Long memberFamilyId, Long photoId) throws DoNotHavePermission {
        Photo photo = photoRepository.getReferenceById(photoId);

        if (photo.getMemberFamily().getId().equals(memberFamilyId)) {
            photo.deleteData();
        } else {
            throw new DoNotHavePermission(DO_NOT_HAVE_REQUEST);
        }
    }

    // 사진 상호작용 생성
    @Override
    @Transactional
    public void savePhotoReaction(UUID memberId, Long photoId) {
        Photo photo = photoRepository.getReferenceById(photoId);

        Member member = memberRepository.getReferenceById(memberId);

        Reaction reaction = Reaction.builder()
                .photo(photo)
                .member(member)
                .build();

        reactionRepository.save(reaction);
    }

    // 사진 상호작용 삭제
    @Override
    @Transactional
    public void deletePhotoReaction(UUID memberId, Long photoId) {
        Photo photo = photoRepository.getReferenceById(photoId);

        Member member = memberRepository.getReferenceById(memberId);

        Reaction reaction = reactionRepository.findReactionByMemberAndPhoto(member, photo);

        reactionRepository.delete(reaction);
    }
}
