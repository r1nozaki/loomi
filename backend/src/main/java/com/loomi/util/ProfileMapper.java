package com.loomi.util;

import com.loomi.dto.ProfileDto;
import com.loomi.model.Profile;

public class ProfileMapper {

    public static ProfileDto toDto(Profile profile) {
        if (profile == null) {
            return null;
        }

        ProfileDto dto = new ProfileDto();
        dto.setId(profile.getId());
        dto.setName(profile.getName());
        dto.setAge(profile.getAge());
        dto.setBio(profile.getBio());
        dto.setImageUrl(profile.getImageUrl());
        dto.setTelegram(profile.getTelegram());
        dto.setLocation(profile.getLocation());
        dto.setEducation(profile.getEducation());
        dto.setInterests(profile.getInterests());
        dto.setGenderInterests(profile.getGenderInterests());
        dto.setRelationships(profile.getRelationships());
        dto.setPhotos(profile.getPhotos());
        if (profile.getUser() != null) {
            dto.setUserId(profile.getUser().getId());
            dto.setEmail(profile.getUser().getEmail());
        }
        return dto;
    }

    public static Profile toEntity(ProfileDto dto) {
        if (dto == null) {
            return null;
        }

        return Profile.builder()
                .id(dto.getId())
                .name(dto.getName())
                .age(dto.getAge())
                .bio(dto.getBio())
                .imageUrl(dto.getImageUrl())
                .telegram(dto.getTelegram())
                .location(dto.getLocation())
                .education(dto.getEducation())
                .interests(dto.getInterests() != null ? dto.getInterests() : new java.util.ArrayList<>())
                .genderInterests(dto.getGenderInterests() != null ? dto.getGenderInterests() : new java.util.ArrayList<>())
                .relationships(dto.getRelationships())
                .photos(dto.getPhotos() != null ? dto.getPhotos() : new java.util.ArrayList<>())
                .build();
    }
}





