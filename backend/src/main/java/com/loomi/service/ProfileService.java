package com.loomi.service;

import com.loomi.dto.ProfileDto;
import com.loomi.exception.ResourceNotFoundException;
import com.loomi.model.Profile;
import com.loomi.model.User;
import com.loomi.repository.LikeRepository;
import com.loomi.repository.ProfileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private static final Logger logger = LoggerFactory.getLogger(ProfileService.class);

    private final ProfileRepository profileRepository;
    private final LikeRepository likeRepository;

    public ProfileService(ProfileRepository profileRepository, LikeRepository likeRepository) {
        this.profileRepository = profileRepository;
        this.likeRepository = likeRepository;
    }

    public Profile getByUser(User user) {
        if (user == null || user.getId() == null) {
            return null;
        }
        return profileRepository.findByUserId(user.getId())
                .orElse(null);
    }

    @Transactional
    public Profile saveOrUpdate(Profile profile) {
        if (profile == null) {
            throw new IllegalArgumentException("Profile cannot be null");
        }
        
        if (profile.getUser() == null || profile.getUser().getId() == null) {
            throw new IllegalArgumentException("Profile must have a valid user");
        }
        
        logger.debug("Saving profile for user: {}", profile.getUser().getId());
        
        Profile existing = profileRepository.findByUserId(profile.getUser().getId()).orElse(null);
        
        if (existing != null) {

            if (profile.getName() != null && !profile.getName().trim().isEmpty()) {
                existing.setName(profile.getName().trim());
            }

            if (profile.getAge() != null) {
                existing.setAge(profile.getAge());
            }
            if (profile.getBio() != null) {
                existing.setBio(profile.getBio().trim());
            }
            if (profile.getImageUrl() != null) {
                existing.setImageUrl(profile.getImageUrl());
            }
            if (profile.getTelegram() != null) {
                existing.setTelegram(profile.getTelegram().trim());
            }
            if (profile.getLocation() != null) {
                existing.setLocation(profile.getLocation().trim());
            }
            if (profile.getEducation() != null) {
                existing.setEducation(profile.getEducation().trim());
            }
            if (profile.getRelationships() != null) {
                existing.setRelationships(profile.getRelationships().trim());
            }
            
            if (profile.getInterests() != null && !profile.getInterests().isEmpty()) {
                existing.setInterests(profile.getInterests());
            }
            if (profile.getGenderInterests() != null && !profile.getGenderInterests().isEmpty()) {
                existing.setGenderInterests(profile.getGenderInterests());
            }
            if (profile.getPhotos() != null && !profile.getPhotos().isEmpty()) {
                existing.setPhotos(profile.getPhotos());
            }
            
            Profile saved = profileRepository.save(existing);
            logger.info("Profile updated: {}", saved.getId());
            return saved;
        } else {

            if (profile.getName() == null || profile.getName().trim().isEmpty()) {
                throw new IllegalArgumentException("Profile name is required");
            }
            if (profile.getAge() == null || profile.getAge() < 18) {
                throw new IllegalArgumentException("Profile age must be at least 18");
            }
            
            Profile saved = profileRepository.save(profile);
            logger.info("Profile created: {}", saved.getId());
            return saved;
        }
    }

    public Profile getById(Long id) {
        return profileRepository.findById(id)
                .orElseThrow(() -> {
                    logger.warn("Profile not found: {}", id);
                    return new ResourceNotFoundException("Profile not found");
                });
    }

    public List<Profile> getRecommendationsFor(Profile baseProfile, int limit) {
        if (baseProfile == null || baseProfile.getInterests() == null || baseProfile.getInterests().isEmpty()) {
            logger.debug("No recommendations: profile has no interests");
            return new ArrayList<>();
        }

        logger.debug("Getting recommendations for profile: {} with limit: {}", baseProfile.getId(), limit);

        Set<String> baseInterests = new HashSet<>(baseProfile.getInterests());

        Set<Long> matchedProfileIds = getMatchedProfileIds(baseProfile);
        

        List<Profile> allProfiles = profileRepository.findAll();

        List<Profile> recommendations = allProfiles.stream()
                .filter(p -> p != null && p.getId() != null && !p.getId().equals(baseProfile.getId()))
                .filter(p -> !matchedProfileIds.contains(p.getId()))
                .filter(p -> p.getInterests() != null && !p.getInterests().isEmpty())
                .map(p -> {
                    int score = calculateInterestScore(baseInterests, p.getInterests());
                    return new ProfileScore(p, score);
                })
                .filter(ps -> ps.score > 0)
                .sorted((a, b) -> Integer.compare(b.score, a.score))
                .limit(limit)
                .map(ps -> ps.profile)
                .collect(Collectors.toList());

        logger.info("Found {} recommendations for profile: {} (excluding {} matches)", 
                recommendations.size(), baseProfile.getId(), matchedProfileIds.size());
        return recommendations;
    }

    private Set<Long> getMatchedProfileIds(Profile baseProfile) {
        Set<Long> matchedIds = new HashSet<>();
        try {

            List<com.loomi.model.Like> myLikes = likeRepository.findByFromProfileId(baseProfile.getId());
            
            for (com.loomi.model.Like like : myLikes) {
                Profile otherProfile = like.getToProfile();
                if (otherProfile == null || otherProfile.getId() == null) {
                    continue;
                }
                

                boolean isMutual = likeRepository.existsByFromProfileIdAndToProfileId(
                        otherProfile.getId(),
                        baseProfile.getId()
                );
                
                if (isMutual) {
                    matchedIds.add(otherProfile.getId());
                }
            }
        } catch (Exception e) {
            logger.warn("Error getting matched profile IDs: {}", e.getMessage());
        }
        return matchedIds;
    }

    private int calculateInterestScore(Set<String> baseInterests, List<String> otherInterests) {
        if (otherInterests == null || otherInterests.isEmpty()) {
            return 0;
        }
        return (int) otherInterests.stream()
                .filter(baseInterests::contains)
                .count();
    }

    private static class ProfileScore {
        final Profile profile;
        final int score;

        ProfileScore(Profile profile, int score) {
            this.profile = profile;
            this.score = score;
        }
    }
}





