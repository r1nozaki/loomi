package com.loomi.service;

import com.loomi.dto.LikeDto;
import com.loomi.exception.ResourceNotFoundException;
import com.loomi.model.Like;
import com.loomi.model.Profile;
import com.loomi.model.User;
import com.loomi.repository.LikeRepository;
import com.loomi.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeService {
    private static final Logger logger = LoggerFactory.getLogger(LikeService.class);

    private final LikeRepository likeRepository;
    private final ProfileRepository profileRepository;

    public LikeService(LikeRepository likeRepository, ProfileRepository profileRepository) {
        this.likeRepository = likeRepository;
        this.profileRepository = profileRepository;
    }

    @Transactional
    public LikeDto like(User user, Long toProfileId) {
        if (user == null || user.getId() == null) {
            throw new ResourceNotFoundException("User not authenticated");
        }

        logger.info("User {} attempting to like profile {}", user.getId(), toProfileId);

        Profile fromProfile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> {
                    logger.warn("Profile not found for user: {}", user.getId());
                    return new ResourceNotFoundException("Profile not found for current user");
                });

        Profile toProfile = profileRepository.findById(toProfileId)
                .orElseThrow(() -> {
                    logger.warn("Target profile not found: {}", toProfileId);
                    return new ResourceNotFoundException("Target profile not found");
                });

        if (fromProfile.getId().equals(toProfileId)) {
            logger.warn("User {} attempted to like their own profile", user.getId());
            throw new IllegalArgumentException("Cannot like your own profile");
        }


        if (likeRepository.existsByFromProfileIdAndToProfileId(fromProfile.getId(), toProfile.getId())) {
            logger.debug("User {} already liked profile {}", user.getId(), toProfileId);
            return buildResponse(false, toProfile);
        }


        Like like = Like.builder()
                .fromProfile(fromProfile)
                .toProfile(toProfile)
                .build();

        likeRepository.save(like);
        logger.info("Like saved: {} -> {}", fromProfile.getId(), toProfileId);


        boolean isMatch = likeRepository.existsByFromProfileIdAndToProfileId(toProfile.getId(), fromProfile.getId());
        if (isMatch) {
            logger.info("Match found: {} <-> {}", fromProfile.getId(), toProfileId);
        }

        return buildResponse(isMatch, toProfile);
    }

    private LikeDto buildResponse(boolean isMatch, Profile targetProfile) {
        LikeDto dto = new LikeDto();
        dto.setToProfileId(targetProfile.getId());

        if (isMatch) {
            dto.setStatus("MATCHED");
            dto.setMatchProfileId(targetProfile.getId());
            dto.setMatchProfileName(targetProfile.getName());
            dto.setTelegram(targetProfile.getTelegram());
        } else {
            dto.setStatus("LIKED");
        }

        return dto;
    }
}





