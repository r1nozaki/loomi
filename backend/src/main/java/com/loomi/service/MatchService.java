package com.loomi.service;

import com.loomi.exception.ResourceNotFoundException;
import com.loomi.model.Profile;
import com.loomi.model.User;
import com.loomi.repository.LikeRepository;
import com.loomi.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MatchService {
    private static final Logger logger = LoggerFactory.getLogger(MatchService.class);

    private final LikeRepository likeRepository;
    private final ProfileRepository profileRepository;

    public MatchService(LikeRepository likeRepository, ProfileRepository profileRepository) {
        this.likeRepository = likeRepository;
        this.profileRepository = profileRepository;
    }

    public List<Profile> getMatchesFor(User user) {
        if (user == null || user.getId() == null) {
            throw new ResourceNotFoundException("User not authenticated");
        }

        logger.debug("Getting matches for user: {}", user.getId());

        Profile myProfile = profileRepository.findByUserId(user.getId())
                .orElseThrow(() -> {
                    logger.warn("Profile not found for user: {}", user.getId());
                    return new ResourceNotFoundException("Profile not found for current user");
                });

        List<com.loomi.model.Like> myLikes = likeRepository.findByFromProfileId(myProfile.getId());
        Set<Long> matchedProfileIds = new HashSet<>();
        List<Profile> matches = new ArrayList<>();

        for (com.loomi.model.Like like : myLikes) {
            Profile otherProfile = like.getToProfile();
            if (otherProfile == null || otherProfile.getId() == null) {
                continue;
            }

            if (matchedProfileIds.contains(otherProfile.getId())) {
                continue;
            }


            boolean isMutual = likeRepository.existsByFromProfileIdAndToProfileId(
                    otherProfile.getId(),
                    myProfile.getId()
            );

            if (isMutual) {
                matchedProfileIds.add(otherProfile.getId());
                matches.add(otherProfile);
            }
        }

        logger.info("Found {} matches for user: {}", matches.size(), user.getId());
        return matches;
    }
}





